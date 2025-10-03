import { supabase } from '@/lib/supabase';

// Types
export interface Group {
  id: string;
  name: string;
  description?: string;
  category: 'study' | 'research' | 'professional' | 'social' | 'academic';
  subject_area?: string;
  university?: string;
  department?: string;
  level?:
    | 'undergraduate'
    | 'graduate'
    | 'phd'
    | 'postdoc'
    | 'faculty'
    | 'mixed';
  max_members: number;
  is_private: boolean;
  is_verified: boolean;
  cover_image?: string;
  rules?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  member_count?: number;
  creator?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    country?: string;
  };
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'member';
  status: 'active' | 'pending' | 'banned' | 'left';
  joined_at: string;
  user?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    country?: string;
  };
}

export interface GroupPost {
  id: string;
  group_id: string;
  author_id: string;
  title: string;
  content: string;
  post_type: 'discussion' | 'announcement' | 'resource' | 'question' | 'poll';
  is_pinned?: boolean;
  attachments?: string[];
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    country?: string;
  };
}

export interface GroupPostComment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    country?: string;
  };
}

export interface GroupInvitation {
  id: string;
  group_id: string;
  invited_user_id: string;
  invited_by: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  expires_at: string;
  created_at: string;
  group?: Group;
  inviter?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    country?: string;
  };
}

export interface GroupJoinRequest {
  id: string;
  group_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  created_at: string;
  group?: Group;
  user?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    country?: string;
  };
}

// Group Management Functions
export const createGroup = async (groupData: {
  name: string;
  description?: string;
  category: 'study' | 'research' | 'professional' | 'social' | 'academic';
  subject_area?: string;
  university?: string;
  department?: string;
  level?:
    | 'undergraduate'
    | 'graduate'
    | 'phd'
    | 'postdoc'
    | 'faculty'
    | 'mixed';
  max_members: number;
  is_private: boolean;
  rules?: string;
}): Promise<{ data: Group | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('groups')
      .insert({
        ...groupData,
        created_by: user.id,
      })
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role, country)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    // Add creator as admin member
    await supabase.from('group_members').insert({
      group_id: data.id,
      user_id: user.id,
      role: 'admin',
      status: 'active',
    });

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create group' };
  }
};

export const getGroups = async (filters?: {
  category?: string;
  university?: string;
  search?: string;
  limit?: number;
}): Promise<{ data: Group[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('groups')
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role, country),
        group_members(count)
      `
      )
      .eq('is_verified', true)
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.university) {
      query = query.eq('university', filters.university);
    }

    if (filters?.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,subject_area.ilike.%${filters.search}%`
      );
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    // Transform the data to extract member_count from group_members
    const transformedData = data?.map((group) => ({
      ...group,
      member_count: group.group_members?.[0]?.count || 0,
    }));

    return { data: transformedData || null, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch groups' };
  }
};

export const getGroup = async (
  groupId: string
): Promise<{ data: Group | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('groups')
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role, country),
        group_members(count)
      `
      )
      .eq('id', groupId)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    // Transform the data to extract member_count from group_members
    const transformedData = data
      ? {
          ...data,
          member_count: data.group_members?.[0]?.count || 0,
        }
      : null;

    return { data: transformedData, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch group' };
  }
};

export const updateGroup = async (
  groupId: string,
  groupData: Partial<{
    name: string;
    description: string;
    category: string;
    subject_area: string;
    university: string;
    department: string;
    level: string;
    max_members: number;
    is_private: boolean;
    rules: string;
  }>
): Promise<{ data: Group | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('groups')
      .update(groupData)
      .eq('id', groupId)
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role, country),
        group_members(count)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    // Transform the data to extract member_count from group_members
    const transformedData = data
      ? {
          ...data,
          member_count: data.group_members?.[0]?.count || 0,
        }
      : null;

    return { data: transformedData, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update group' };
  }
};

export const deleteGroup = async (
  groupId: string
): Promise<{ data: null; error: string | null }> => {
  try {
    const { error } = await supabase.from('groups').delete().eq('id', groupId);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to delete group' };
  }
};

// Member Management Functions
export const getGroupMembers = async (
  groupId: string
): Promise<{ data: GroupMember[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('group_members')
      .select(
        `
        *,
        user:user_id(id, display_name, avatar, role, country)
      `
      )
      .eq('group_id', groupId)
      .eq('status', 'active')
      .order('role', { ascending: false })
      .order('joined_at', { ascending: true });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch group members' };
  }
};

export const checkUserMembership = async (
  groupId: string,
  userId: string
): Promise<{ data: GroupMember | null; error: string | null }> => {
  try {
    console.log(
      `[checkUserMembership] Checking membership for user ${userId} in group ${groupId}`
    );

    const { data, error } = await supabase
      .from('group_members')
      .select(
        `
        *,
        user:user_id(id, display_name, avatar, role, country)
      `
      )
      .eq('group_id', groupId)
      .eq('user_id', userId);

    if (error) {
      console.error('[checkUserMembership] Error:', error);
      return { data: null, error: error.message };
    }

    console.log(`[checkUserMembership] Query result:`, data);

    if (data && data.length > 0) {
      console.log(`[checkUserMembership] Found membership:`, data[0]);
      return { data: data[0], error: null };
    } else {
      console.log(`[checkUserMembership] No membership found`);
      return { data: null, error: null };
    }
  } catch (error) {
    console.error('[checkUserMembership] Exception:', error);
    return { data: null, error: 'Failed to check membership' };
  }
};

export const joinGroup = async (
  groupId: string
): Promise<{ data: GroupMember | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    console.log(
      `[joinGroup] User ${user.id} attempting to join group ${groupId}`
    );

    // Check if user is already a member
    const { data: existingMembers, error: memberCheckError } = await supabase
      .from('group_members')
      .select('id, status')
      .eq('group_id', groupId)
      .eq('user_id', user.id);

    if (memberCheckError) {
      return { data: null, error: memberCheckError.message };
    }

    if (existingMembers && existingMembers.length > 0) {
      const existingMember = existingMembers[0];
      console.log(
        `[joinGroup] User ${user.id} already has membership with status: ${existingMember.status}`
      );
      if (existingMember.status === 'active') {
        return { data: null, error: 'You are already a member of this group' };
      } else if (existingMember.status === 'pending') {
        return {
          data: null,
          error: 'You already have a pending request to join this group',
        };
      } else if (existingMember.status === 'banned') {
        return {
          data: null,
          error: 'You have been banned from this group',
        };
      }
    } else {
      console.log(
        `[joinGroup] User ${user.id} is not a member of group ${groupId}`
      );
    }

    // Check if group exists and is public
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('is_private')
      .eq('id', groupId)
      .single();

    if (groupError) {
      return { data: null, error: 'Group not found' };
    }

    if (group.is_private) {
      // Check if user already has a pending join request
      const { data: existingRequests, error: requestCheckError } =
        await supabase
          .from('group_join_requests')
          .select('id, status')
          .eq('group_id', groupId)
          .eq('user_id', user.id);

      if (requestCheckError) {
        return { data: null, error: requestCheckError.message };
      }

      if (existingRequests && existingRequests.length > 0) {
        const existingRequest = existingRequests[0];
        if (existingRequest.status === 'pending') {
          return {
            data: null,
            error: 'You already have a pending request to join this group',
          };
        } else if (existingRequest.status === 'approved') {
          return {
            data: null,
            error: 'Your join request has already been approved',
          };
        } else if (existingRequest.status === 'rejected') {
          return {
            data: null,
            error:
              'Your previous join request was rejected. Please contact the group admin.',
          };
        }
      }

      // For private groups, create a join request
      const { data, error } = await supabase
        .from('group_join_requests')
        .insert({
          group_id: groupId,
          user_id: user.id,
          status: 'pending',
        })
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: null, error: 'Join request sent' };
    } else {
      // For public groups, add directly as member
      // Use upsert to handle potential race conditions
      const { data, error } = await supabase
        .from('group_members')
        .upsert(
          {
            group_id: groupId,
            user_id: user.id,
            role: 'member',
            status: 'active',
          },
          {
            onConflict: 'group_id,user_id',
            ignoreDuplicates: false,
          }
        )
        .select(
          `
          *,
          user:user_id(id, display_name, avatar, role, country)
        `
        )
        .single();

      if (error) {
        // If it's a duplicate key error, check if user is already a member
        if (error.code === '23505') {
          const { data: memberCheck } = await supabase
            .from('group_members')
            .select('status')
            .eq('group_id', groupId)
            .eq('user_id', user.id)
            .single();

          if (memberCheck?.status === 'active') {
            return {
              data: null,
              error: 'You are already a member of this group',
            };
          } else {
            return { data: null, error: 'Unable to join group at this time' };
          }
        }
        return { data: null, error: error.message };
      }

      return { data, error: null };
    }
  } catch (error) {
    return { data: null, error: 'Failed to join group' };
  }
};

export const leaveGroup = async (
  groupId: string
): Promise<{ data: null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { error } = await supabase
      .from('group_members')
      .update({ status: 'left' })
      .eq('group_id', groupId)
      .eq('user_id', user.id);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to leave group' };
  }
};

export const inviteToGroup = async (
  groupId: string,
  userId: string,
  message?: string
): Promise<{ data: GroupInvitation | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('group_invitations')
      .insert({
        group_id: groupId,
        invited_user_id: userId,
        invited_by: user.id,
        status: 'pending',
        expires_at: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(), // 7 days
      })
      .select(
        `
        *,
        group:group_id(*),
        inviter:invited_by(id, display_name, avatar, role, country)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to send invitation' };
  }
};

export const respondToInvitation = async (
  invitationId: string,
  response: 'accepted' | 'declined'
): Promise<{ data: null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    // Update invitation status
    const { error: invitationError } = await supabase
      .from('group_invitations')
      .update({ status: response })
      .eq('id', invitationId)
      .eq('invited_user_id', user.id);

    if (invitationError) {
      return { data: null, error: invitationError.message };
    }

    if (response === 'accepted') {
      // Get invitation details
      const { data: invitation, error: fetchError } = await supabase
        .from('group_invitations')
        .select('group_id')
        .eq('id', invitationId)
        .single();

      if (fetchError) {
        return { data: null, error: fetchError.message };
      }

      // Add user to group
      const { error: memberError } = await supabase
        .from('group_members')
        .insert({
          group_id: invitation.group_id,
          user_id: user.id,
          role: 'member',
          status: 'active',
        });

      if (memberError) {
        return { data: null, error: memberError.message };
      }
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to respond to invitation' };
  }
};

// Group Posts Functions
export const getGroupPosts = async (
  groupId: string,
  filters?: {
    post_type?: string;
    search?: string;
    pinned?: boolean;
  }
): Promise<{ data: GroupPost[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('group_posts')
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, country)
      `
      )
      .eq('group_id', groupId)
      .order('created_at', { ascending: false });

    if (filters?.post_type) {
      query = query.eq('post_type', filters.post_type);
    }

    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch group posts' };
  }
};

export const createGroupPost = async (
  groupId: string,
  postData: {
    title: string;
    content: string;
    post_type: 'discussion' | 'announcement' | 'resource' | 'question' | 'poll';
    attachments?: string[];
  }
): Promise<{ data: GroupPost | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('group_posts')
      .insert({
        title: postData.title,
        content: postData.content,
        post_type: postData.post_type,
        attachments: postData.attachments || null,
        group_id: groupId,
        author_id: user.id,
      })
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, country)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create post' };
  }
};

export const updateGroupPost = async (
  postId: string,
  postData: Partial<{
    title: string;
    content: string;
    post_type: string;
  }>
): Promise<{ data: GroupPost | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('group_posts')
      .update(postData)
      .eq('id', postId)
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, country)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update post' };
  }
};

export const deleteGroupPost = async (
  postId: string
): Promise<{ data: null; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('group_posts')
      .delete()
      .eq('id', postId);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to delete post' };
  }
};

export const pinGroupPost = async (
  postId: string
): Promise<{ data: null; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('group_posts')
      .update({ is_pinned: true })
      .eq('id', postId);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to pin post' };
  }
};

export const unpinGroupPost = async (
  postId: string
): Promise<{ data: null; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('group_posts')
      .update({ is_pinned: false })
      .eq('id', postId);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to unpin post' };
  }
};

export const getGroupPostComments = async (
  postId: string
): Promise<{ data: GroupPostComment[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('group_post_comments')
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, country)
      `
      )
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch comments' };
  }
};

export const getGroupPostCommentCount = async (
  postId: string
): Promise<{ data: number; error: string | null }> => {
  try {
    const { count, error } = await supabase
      .from('group_post_comments')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId);

    if (error) {
      return { data: 0, error: error.message };
    }

    return { data: count || 0, error: null };
  } catch (error) {
    return { data: 0, error: 'Failed to fetch comment count' };
  }
};

export const getGroupPostsWithCommentCounts = async (
  groupId: string,
  filters?: {
    post_type?: string;
    search?: string;
    pinned?: boolean;
  }
): Promise<{
  data: (GroupPost & { comment_count: number })[] | null;
  error: string | null;
}> => {
  try {
    // First get the posts
    const { data: posts, error: postsError } = await getGroupPosts(
      groupId,
      filters
    );

    if (postsError) {
      return { data: null, error: postsError };
    }

    if (!posts) {
      return { data: [], error: null };
    }

    // Get comment counts for each post
    const postsWithCounts = await Promise.all(
      posts.map(async (post) => {
        const { data: commentCount } = await getGroupPostCommentCount(post.id);
        return {
          ...post,
          comment_count: commentCount,
        };
      })
    );

    return { data: postsWithCounts, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch posts with comment counts' };
  }
};

export const createGroupPostComment = async (
  postId: string,
  commentData: {
    content: string;
  }
): Promise<{ data: GroupPostComment | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('group_post_comments')
      .insert({
        ...commentData,
        post_id: postId,
        author_id: user.id,
      })
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, country)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create comment' };
  }
};

// User's Groups Functions
export const getUserGroups = async (
  userId?: string
): Promise<{ data: Group[] | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const targetUserId = userId || user?.id;

    if (!targetUserId) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('group_members')
      .select(
        `
        group:group_id(
          *,
          creator:created_by(id, display_name, avatar, role, country),
          group_members(count)
        )
      `
      )
      .eq('user_id', targetUserId)
      .eq('status', 'active');

    if (error) {
      return { data: null, error: error.message };
    }

    const groups =
      (data
        ?.map((item) => {
          const group = item.group;
          return group
            ? {
                ...group,
                member_count: group.group_members?.[0]?.count || 0,
              }
            : null;
        })
        .filter(Boolean) as unknown as Group[]) || [];
    return { data: groups, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch user groups' };
  }
};

// Additional helper functions
export const getGroupById = async (
  groupId: string
): Promise<{ data: Group | null; error: string | null }> => {
  return getGroup(groupId);
};

export const removeGroupMember = async (
  groupId: string,
  userId: string
): Promise<{ data: null; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('group_members')
      .update({ status: 'left' })
      .eq('group_id', groupId)
      .eq('user_id', userId);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to remove member' };
  }
};

export const promoteGroupMember = async (
  groupId: string,
  userId: string
): Promise<{ data: null; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('group_members')
      .update({ role: 'moderator' })
      .eq('group_id', groupId)
      .eq('user_id', userId);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to promote member' };
  }
};

export const demoteGroupMember = async (
  groupId: string,
  userId: string
): Promise<{ data: null; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('group_members')
      .update({ role: 'member' })
      .eq('group_id', groupId)
      .eq('user_id', userId);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to demote member' };
  }
};

export const getUserInvitations = async (): Promise<{
  data: GroupInvitation[] | null;
  error: string | null;
}> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('group_invitations')
      .select(
        `
        *,
        group:group_id(*),
        inviter:invited_by(id, display_name, avatar, role, country)
      `
      )
      .eq('invited_user_id', user.id)
      .eq('status', 'pending')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch invitations' };
  }
};

// Group Post Likes and Reactions
export const likeGroupPost = async (
  postId: string
): Promise<{ data: null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('group_post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single();

    if (existingLike) {
      // Unlike the post
      const { error } = await supabase
        .from('group_post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id);

      if (error) {
        return { data: null, error: error.message };
      }
    } else {
      // Like the post
      const { error } = await supabase.from('group_post_likes').insert({
        post_id: postId,
        user_id: user.id,
      });

      if (error) {
        return { data: null, error: error.message };
      }
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to like/unlike post' };
  }
};

export const getGroupPostLikes = async (
  postId: string
): Promise<{ data: any[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('group_post_likes')
      .select(
        `
        *,
        user:user_id(id, display_name, avatar, role, country)
      `
      )
      .eq('post_id', postId);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch post likes' };
  }
};

export const checkUserLikedPost = async (
  postId: string,
  userId?: string
): Promise<{ data: boolean; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const targetUserId = userId || user?.id;

    if (!targetUserId) {
      return { data: false, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('group_post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', targetUserId)
      .single();

    if (error && error.code !== 'PGRST116') {
      return { data: false, error: error.message };
    }

    return { data: !!data, error: null };
  } catch (error) {
    return { data: false, error: 'Failed to check like status' };
  }
};

// Group Activities
export const getGroupActivities = async (
  groupId: string,
  limit: number = 20
): Promise<{ data: any[] | null; error: string | null }> => {
  try {
    // Get recent posts
    const { data: posts, error: postsError } = await supabase
      .from('group_posts')
      .select(
        `
        id,
        title,
        post_type,
        created_at,
        author:author_id(id, display_name, avatar, role, country)
      `
      )
      .eq('group_id', groupId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (postsError) {
      return { data: null, error: postsError.message };
    }

    // Get recent member joins
    const { data: members, error: membersError } = await supabase
      .from('group_members')
      .select(
        `
        id,
        joined_at,
        user:user_id(id, display_name, avatar, role, country)
      `
      )
      .eq('group_id', groupId)
      .eq('status', 'active')
      .order('joined_at', { ascending: false })
      .limit(limit);

    if (membersError) {
      return { data: null, error: membersError.message };
    }

    // Combine and sort activities
    const activities = [
      ...(posts || []).map((post) => ({
        id: post.id,
        type: 'post',
        action: 'created',
        data: post,
        created_at: post.created_at,
      })),
      ...(members || []).map((member) => ({
        id: member.id,
        type: 'member',
        action: 'joined',
        data: member,
        created_at: member.joined_at,
      })),
    ].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return { data: activities.slice(0, limit), error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch group activities' };
  }
};

// Group Events
export const getGroupEvents = async (
  groupId: string
): Promise<{ data: any[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('group_events')
      .select(
        `
        *,
        created_by:created_by(id, display_name, avatar, role, country)
      `
      )
      .eq('group_id', groupId)
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch group events' };
  }
};

// Group Resources
export const getGroupResources = async (
  groupId: string
): Promise<{ data: any[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('group_resources')
      .select(
        `
        *,
        uploaded_by:uploaded_by(id, display_name, avatar, role, country)
      `
      )
      .eq('group_id', groupId)
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch group resources' };
  }
};

// Group Polls
export const getGroupPolls = async (
  groupId: string
): Promise<{ data: any[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('group_polls')
      .select(
        `
        *,
        created_by:created_by(id, display_name, avatar, role, country),
        poll_options(*),
        poll_votes(*)
      `
      )
      .eq('group_id', groupId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch group polls' };
  }
};

export const voteOnPoll = async (
  pollId: string,
  optionId: string
): Promise<{ data: null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    // Check if user already voted
    const { data: existingVote } = await supabase
      .from('group_poll_votes')
      .select('id')
      .eq('poll_id', pollId)
      .eq('user_id', user.id)
      .single();

    if (existingVote) {
      return { data: null, error: 'You have already voted on this poll' };
    }

    // Add vote
    const { error } = await supabase.from('group_poll_votes').insert({
      poll_id: pollId,
      option_id: optionId,
      user_id: user.id,
    });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to vote on poll' };
  }
};
