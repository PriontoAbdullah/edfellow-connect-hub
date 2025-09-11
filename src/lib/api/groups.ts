import { supabase } from '@/lib/supabase';

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
  invited_by?: string;
  user?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    university?: string;
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
  is_locked: boolean;
  tags?: string[];
  attachments?: any;
  created_at: string;
  updated_at: string;
  comment_count?: number;
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
  parent_comment_id?: string;
  is_solution: boolean;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
  replies?: GroupPostComment[];
}

export interface GroupInvitation {
  id: string;
  group_id: string;
  invited_user_id: string;
  invited_by: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  expires_at: string;
  created_at: string;
  group?: Group;
  invited_user?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
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
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  group?: Group;
  user?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    university?: string;
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
  max_members?: number;
  is_private?: boolean;
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
        max_members: groupData.max_members || 50,
        is_private: groupData.is_private || false,
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
  subject_area?: string;
  is_private?: boolean;
  search?: string;
}): Promise<{ data: Group[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('groups')
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role),
        member_count:group_members(count)
      `
      )
      .eq('is_private', false);

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.university) {
      query = query.eq('university', filters.university);
    }

    if (filters?.subject_area) {
      query = query.eq('subject_area', filters.subject_area);
    }

    if (filters?.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      );
    }

    const { data, error } = await query.order('created_at', {
      ascending: false,
    });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
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
        member_count:group_members(count)
      `
      )
      .eq('id', groupId)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch group' };
  }
};

export const updateGroup = async (
  groupId: string,
  updates: Partial<Group>
): Promise<{ data: Group | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('groups')
      .update(updates)
      .eq('id', groupId)
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role),
        member_count:group_members(count)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update group' };
  }
};

export const deleteGroup = async (
  groupId: string
): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.from('groups').delete().eq('id', groupId);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to delete group' };
  }
};

// Group Membership Functions
export const getGroupMembers = async (
  groupId: string
): Promise<{ data: GroupMember[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('group_members')
      .select(
        `
        *,
        user:user_id(id, display_name, avatar, role, university)
      `
      )
      .eq('group_id', groupId)
      .eq('status', 'active')
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
  groupId: string,
  message?: string
): Promise<{ data: GroupJoinRequest | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    // Check if group is private
    const { data: group } = await supabase
      .from('groups')
      .select('is_private')
      .eq('id', groupId)
      .single();

    if (group?.is_private) {
      // Create join request for private groups
      const { data, error } = await supabase
        .from('group_join_requests')
        .insert({
          group_id: groupId,
          user_id: user.id,
          message,
        })
        .select(
          `
          *,
          group:group_id(*),
          user:user_id(id, display_name, avatar, role, university)
        `
        )
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } else {
      // Direct join for public groups
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
          user:user_id(id, display_name, avatar, role, university)
        `
        )
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as any, error: null };
    }
  } catch (error) {
    return { data: null, error: 'Failed to join group' };
  }
};

export const leaveGroup = async (
  groupId: string
): Promise<{ error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const { error } = await supabase
      .from('group_members')
      .update({ status: 'left' })
      .eq('group_id', groupId)
      .eq('user_id', user.id);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to leave group' };
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
        message,
      })
      .select(
        `
        *,
        group:group_id(*),
        invited_user:invited_user_id(id, display_name, avatar, role),
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
  status: 'accepted' | 'declined'
): Promise<{ error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    // Update invitation status
    const { error: updateError } = await supabase
      .from('group_invitations')
      .update({ status })
      .eq('id', invitationId)
      .eq('invited_user_id', user.id);

    if (updateError) {
      return { error: updateError.message };
    }

    // If accepted, add user to group
    if (status === 'accepted') {
      const { data: invitation } = await supabase
        .from('group_invitations')
        .select('group_id')
        .eq('id', invitationId)
        .single();

      if (invitation) {
        const { error: joinError } = await supabase
          .from('group_members')
          .insert({
            group_id: invitation.group_id,
            user_id: user.id,
            role: 'member',
            status: 'active',
            invited_by: user.id,
          });

        if (joinError) {
          return { error: joinError.message };
        }
      }
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to respond to invitation' };
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
    post_type?:
      | 'discussion'
      | 'announcement'
      | 'resource'
      | 'question'
      | 'poll';
    tags?: string[];
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
        group_id: groupId,
        author_id: user.id,
        ...postData,
        post_type: postData.post_type || 'discussion',
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

export const getGroupPostComments = async (
  postId: string
): Promise<{ data: GroupPostComment[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('group_post_comments')
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role),
        replies:parent_comment_id(*, author:author_id(id, display_name, avatar, role))
      `
      )
      .eq('post_id', postId)
      .is('parent_comment_id', null)
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
  content: string,
  parentCommentId?: string
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
        post_id: postId,
        author_id: user.id,
        content,
        parent_comment_id: parentCommentId,
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
          member_count:group_members(count)
        )
      `
      )
      .eq('user_id', targetUserId)
      .eq('status', 'active');

    if (error) {
      return { data: null, error: error.message };
    }

    const groups = data?.map((item) => item.group).filter(Boolean) || [];
    return { data: groups, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch user groups' };
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
