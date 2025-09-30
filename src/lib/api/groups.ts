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
  };
}

export interface GroupPost {
  id: string;
  group_id: string;
  author_id: string;
  title: string;
  content: string;
  post_type: 'discussion' | 'announcement' | 'resource' | 'question' | 'poll';
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
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
        creator:created_by(id, display_name, avatar, role)
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
        creator:created_by(id, display_name, avatar, role),
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
        creator:created_by(id, display_name, avatar, role),
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
        creator:created_by(id, display_name, avatar, role),
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
        user:user_id(id, display_name, avatar, role)
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
      const { data, error } = await supabase
        .from('group_members')
        .insert({
          group_id: groupId,
          user_id: user.id,
          role: 'member',
          status: 'active',
        })
        .select(
          `
          *,
          user:user_id(id, display_name, avatar, role)
        `
        )
        .single();

      if (error) {
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
        inviter:invited_by(id, display_name, avatar, role)
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
        author:author_id(id, display_name, avatar, role),
        comment_count:group_post_comments(count)
      `
      )
      .eq('group_id', groupId)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (filters?.post_type) {
      query = query.eq('post_type', filters.post_type);
    }

    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`
      );
    }

    if (filters?.pinned !== undefined) {
      query = query.eq('is_pinned', filters.pinned);
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
        ...postData,
        group_id: groupId,
        author_id: user.id,
      })
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role)
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
        author:author_id(id, display_name, avatar, role)
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
        author:author_id(id, display_name, avatar, role)
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
        author:author_id(id, display_name, avatar, role)
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
          creator:created_by(id, display_name, avatar, role),
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
        inviter:invited_by(id, display_name, avatar, role)
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
