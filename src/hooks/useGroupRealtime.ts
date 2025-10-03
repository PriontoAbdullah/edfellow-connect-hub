import { useState, useEffect, useRef } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { GroupPost, GroupPostComment } from '@/lib/api/groups';

export interface GroupRealtimePost extends GroupPost {
  likes_count?: number;
  comments_count?: number;
}

export interface GroupRealtimeComment extends GroupPostComment {
  likes_count?: number;
}

export interface GroupActivity {
  id: string;
  type: 'post' | 'comment' | 'like' | 'member_join' | 'member_leave';
  action: string;
  data: any;
  created_at: string;
  user?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
}

export const useGroupRealtime = (groupId: string) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<GroupRealtimePost[]>([]);
  const [activities, setActivities] = useState<GroupActivity[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!user || !groupId) {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
      setIsConnected(false);
      return;
    }

    const setupGroupChannel = () => {
      const channel = supabase
        .channel(`group:${groupId}`)
        // Subscribe to new posts
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'group_posts',
            filter: `group_id=eq.${groupId}`,
          },
          async (payload) => {
            const newPost = payload.new as GroupRealtimePost;

            // Fetch author information
            try {
              const { data: authorData } = await supabase
                .from('users')
                .select('id, display_name, avatar, role')
                .eq('id', newPost.author_id)
                .single();

              const postWithAuthor = {
                ...newPost,
                author: authorData,
                likes_count: 0,
                comments_count: 0,
              };

              setPosts((prev) => [postWithAuthor, ...prev]);

              // Add to activities
              setActivities((prev) => [
                {
                  id: `post-${newPost.id}`,
                  type: 'post',
                  action: 'created',
                  data: postWithAuthor,
                  created_at: newPost.created_at,
                  user: authorData,
                },
                ...prev,
              ]);
            } catch (error) {
              console.error('Error fetching author data:', error);
            }
          }
        )
        // Subscribe to post updates
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'group_posts',
            filter: `group_id=eq.${groupId}`,
          },
          (payload) => {
            const updatedPost = payload.new as GroupRealtimePost;
            setPosts((prev) =>
              prev.map((post) =>
                post.id === updatedPost.id ? { ...post, ...updatedPost } : post
              )
            );
          }
        )
        // Subscribe to new comments
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'group_post_comments',
          },
          async (payload) => {
            const newComment = payload.new as GroupRealtimeComment;

            // Check if this comment is for a post in this group
            const { data: postData } = await supabase
              .from('group_posts')
              .select('group_id')
              .eq('id', newComment.post_id)
              .single();

            if (postData?.group_id === groupId) {
              // Fetch author information
              try {
                const { data: authorData } = await supabase
                  .from('users')
                  .select('id, display_name, avatar, role')
                  .eq('id', newComment.author_id)
                  .single();

                const commentWithAuthor = {
                  ...newComment,
                  author: authorData,
                  likes_count: 0,
                };

                // Update post comments count
                setPosts((prev) =>
                  prev.map((post) =>
                    post.id === newComment.post_id
                      ? {
                          ...post,
                          comments_count: (post.comments_count || 0) + 1,
                        }
                      : post
                  )
                );

                // Add to activities
                setActivities((prev) => [
                  {
                    id: `comment-${newComment.id}`,
                    type: 'comment',
                    action: 'created',
                    data: commentWithAuthor,
                    created_at: newComment.created_at,
                    user: authorData,
                  },
                  ...prev,
                ]);
              } catch (error) {
                console.error('Error fetching comment author data:', error);
              }
            }
          }
        )
        // Subscribe to post likes
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'group_post_likes',
          },
          async (payload) => {
            const newLike = payload.new as any;

            // Check if this like is for a post in this group
            const { data: postData } = await supabase
              .from('group_posts')
              .select('group_id')
              .eq('id', newLike.post_id)
              .single();

            if (postData?.group_id === groupId) {
              // Fetch user information
              try {
                const { data: userData } = await supabase
                  .from('users')
                  .select('id, display_name, avatar, role')
                  .eq('id', newLike.user_id)
                  .single();

                // Update post likes count
                setPosts((prev) =>
                  prev.map((post) =>
                    post.id === newLike.post_id
                      ? { ...post, likes_count: (post.likes_count || 0) + 1 }
                      : post
                  )
                );

                // Add to activities
                setActivities((prev) => [
                  {
                    id: `like-${newLike.id}`,
                    type: 'like',
                    action: 'liked',
                    data: { post_id: newLike.post_id, user: userData },
                    created_at: newLike.created_at,
                    user: userData,
                  },
                  ...prev,
                ]);
              } catch (error) {
                console.error('Error fetching like user data:', error);
              }
            }
          }
        )
        // Subscribe to member joins
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'group_members',
            filter: `group_id=eq.${groupId}`,
          },
          async (payload) => {
            const newMember = payload.new as any;

            // Fetch user information
            try {
              const { data: userData } = await supabase
                .from('users')
                .select('id, display_name, avatar, role')
                .eq('id', newMember.user_id)
                .single();

              // Add to activities
              setActivities((prev) => [
                {
                  id: `member-${newMember.id}`,
                  type: 'member_join',
                  action: 'joined',
                  data: newMember,
                  created_at: newMember.joined_at,
                  user: userData,
                },
                ...prev,
              ]);
            } catch (error) {
              console.error('Error fetching member data:', error);
            }
          }
        )
        // Subscribe to member leaves
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'group_members',
            filter: `group_id=eq.${groupId}`,
          },
          async (payload) => {
            const updatedMember = payload.new as any;

            // Check if status changed to 'left'
            if (updatedMember.status === 'left') {
              // Fetch user information
              try {
                const { data: userData } = await supabase
                  .from('users')
                  .select('id, display_name, avatar, role')
                  .eq('id', updatedMember.user_id)
                  .single();

                // Add to activities
                setActivities((prev) => [
                  {
                    id: `member-leave-${updatedMember.id}`,
                    type: 'member_leave',
                    action: 'left',
                    data: updatedMember,
                    created_at: new Date().toISOString(),
                    user: userData,
                  },
                  ...prev,
                ]);
              } catch (error) {
                console.error('Error fetching member data:', error);
              }
            }
          }
        )
        .subscribe((status) => {
          setIsConnected(status === 'SUBSCRIBED');
        });

      channelRef.current = channel;
    };

    setupGroupChannel();

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
      setIsConnected(false);
    };
  }, [user, groupId]);

  return {
    posts,
    activities,
    isConnected,
    setPosts,
    setActivities,
  };
};

// Hook for specific post real-time updates
export const usePostRealtime = (postId: string) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<GroupRealtimeComment[]>([]);
  const [likesCount, setLikesCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!user || !postId) {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
      return;
    }

    const setupPostChannel = () => {
      const channel = supabase
        .channel(`post:${postId}`)
        // Subscribe to new comments
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'group_post_comments',
            filter: `post_id=eq.${postId}`,
          },
          async (payload) => {
            const newComment = payload.new as GroupRealtimeComment;

            // Fetch author information
            try {
              const { data: authorData } = await supabase
                .from('users')
                .select('id, display_name, avatar, role')
                .eq('id', newComment.author_id)
                .single();

              const commentWithAuthor = {
                ...newComment,
                author: authorData,
                likes_count: 0,
              };

              setComments((prev) => [...prev, commentWithAuthor]);
            } catch (error) {
              console.error('Error fetching comment author data:', error);
            }
          }
        )
        // Subscribe to comment updates
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'group_post_comments',
            filter: `post_id=eq.${postId}`,
          },
          (payload) => {
            const updatedComment = payload.new as GroupRealtimeComment;
            setComments((prev) =>
              prev.map((comment) =>
                comment.id === updatedComment.id
                  ? { ...comment, ...updatedComment }
                  : comment
              )
            );
          }
        )
        // Subscribe to likes
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'group_post_likes',
            filter: `post_id=eq.${postId}`,
          },
          (payload) => {
            const newLike = payload.new as any;
            setLikesCount((prev) => prev + 1);

            if (newLike.user_id === user.id) {
              setUserLiked(true);
            }
          }
        )
        // Subscribe to unlikes
        .on(
          'postgres_changes',
          {
            event: 'DELETE',
            schema: 'public',
            table: 'group_post_likes',
            filter: `post_id=eq.${postId}`,
          },
          (payload) => {
            const deletedLike = payload.old as any;
            setLikesCount((prev) => Math.max(0, prev - 1));

            if (deletedLike.user_id === user.id) {
              setUserLiked(false);
            }
          }
        )
        .subscribe();

      channelRef.current = channel;
    };

    setupPostChannel();

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, [user, postId]);

  return {
    comments,
    likesCount,
    userLiked,
    setComments,
    setLikesCount,
    setUserLiked,
  };
};
