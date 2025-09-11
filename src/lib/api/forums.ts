import { supabase } from '@/lib/supabase';

export interface ForumCategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
  parent_category_id?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  thread_count?: number;
  reply_count?: number;
  last_activity?: string;
  parent_category?: ForumCategory;
  subcategories?: ForumCategory[];
}

export interface ForumThread {
  id: string;
  category_id: string;
  author_id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  is_locked: boolean;
  is_announcement: boolean;
  tags?: string[];
  view_count: number;
  reply_count: number;
  last_reply_at?: string;
  last_reply_by?: string;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    university?: string;
  };
  category?: ForumCategory;
  last_reply_author?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
}

export interface ForumReply {
  id: string;
  thread_id: string;
  author_id: string;
  content: string;
  parent_reply_id?: string;
  is_solution: boolean;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    university?: string;
  };
  replies?: ForumReply[];
}

// Forum Categories Functions
export const getForumCategories = async (): Promise<{
  data: ForumCategory[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('forum_categories')
      .select(
        `
        *,
        thread_count:forum_threads(count),
        reply_count:forum_threads(forum_replies(count)),
        last_activity:forum_threads(max(last_reply_at))
      `
      )
      .eq('is_active', true)
      .is('parent_category_id', null)
      .order('sort_order', { ascending: true });

    if (error) {
      return { data: null, error: error.message };
    }

    // Get subcategories for each parent category
    const categoriesWithSubs = await Promise.all(
      data.map(async (category) => {
        const { data: subcategories } = await supabase
          .from('forum_categories')
          .select(
            `
            *,
            thread_count:forum_threads(count),
            reply_count:forum_threads(forum_replies(count)),
            last_activity:forum_threads(max(last_reply_at))
          `
          )
          .eq('parent_category_id', category.id)
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        return {
          ...category,
          subcategories: subcategories || [],
        };
      })
    );

    return { data: categoriesWithSubs, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch forum categories' };
  }
};

export const getForumCategory = async (
  categoryId: string
): Promise<{ data: ForumCategory | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('forum_categories')
      .select(
        `
        *,
        thread_count:forum_threads(count),
        reply_count:forum_threads(forum_replies(count)),
        last_activity:forum_threads(max(last_reply_at))
      `
      )
      .eq('id', categoryId)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch forum category' };
  }
};

// Forum Threads Functions
export const getForumThreads = async (
  categoryId?: string,
  filters?: {
    search?: string;
    tags?: string[];
    pinned?: boolean;
    announcement?: boolean;
    author_id?: string;
  },
  pagination?: {
    page: number;
    limit: number;
  }
): Promise<{
  data: ForumThread[] | null;
  error: string | null;
  count?: number;
}> => {
  try {
    let query = supabase.from('forum_threads').select(
      `
        *,
        author:author_id(id, display_name, avatar, role, university),
        category:category_id(*),
        last_reply_author:last_reply_by(id, display_name, avatar, role)
      `,
      { count: 'exact' }
    );

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`
      );
    }

    if (filters?.tags && filters.tags.length > 0) {
      query = query.overlaps('tags', filters.tags);
    }

    if (filters?.pinned !== undefined) {
      query = query.eq('is_pinned', filters.pinned);
    }

    if (filters?.announcement !== undefined) {
      query = query.eq('is_announcement', filters.announcement);
    }

    if (filters?.author_id) {
      query = query.eq('author_id', filters.author_id);
    }

    // Order by pinned first, then by last reply or creation date
    query = query
      .order('is_pinned', { ascending: false })
      .order('is_announcement', { ascending: false })
      .order('last_reply_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (pagination) {
      const from = (pagination.page - 1) * pagination.limit;
      const to = from + pagination.limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      return { data: null, error: error.message, count: 0 };
    }

    return { data, error: null, count: count || 0 };
  } catch (error) {
    return { data: null, error: 'Failed to fetch forum threads', count: 0 };
  }
};

export const getForumThread = async (
  threadId: string
): Promise<{ data: ForumThread | null; error: string | null }> => {
  try {
    // Increment view count
    await supabase.rpc('increment_thread_views', { thread_id: threadId });

    const { data, error } = await supabase
      .from('forum_threads')
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, university),
        category:category_id(*),
        last_reply_author:last_reply_by(id, display_name, avatar, role)
      `
      )
      .eq('id', threadId)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch forum thread' };
  }
};

export const createForumThread = async (
  categoryId: string,
  threadData: {
    title: string;
    content: string;
    tags?: string[];
    is_announcement?: boolean;
  }
): Promise<{ data: ForumThread | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('forum_threads')
      .insert({
        category_id: categoryId,
        author_id: user.id,
        ...threadData,
      })
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, university),
        category:category_id(*)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create thread' };
  }
};

export const updateForumThread = async (
  threadId: string,
  updates: {
    title?: string;
    content?: string;
    tags?: string[];
    is_pinned?: boolean;
    is_locked?: boolean;
    is_announcement?: boolean;
  }
): Promise<{ data: ForumThread | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('forum_threads')
      .update(updates)
      .eq('id', threadId)
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, university),
        category:category_id(*)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update thread' };
  }
};

export const deleteForumThread = async (
  threadId: string
): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('forum_threads')
      .delete()
      .eq('id', threadId);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to delete thread' };
  }
};

// Forum Replies Functions
export const getForumReplies = async (
  threadId: string,
  pagination?: {
    page: number;
    limit: number;
  }
): Promise<{
  data: ForumReply[] | null;
  error: string | null;
  count?: number;
}> => {
  try {
    let query = supabase
      .from('forum_replies')
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, university),
        replies:parent_reply_id(*, author:author_id(id, display_name, avatar, role, university))
      `,
        { count: 'exact' }
      )
      .eq('thread_id', threadId)
      .is('parent_reply_id', null)
      .order('created_at', { ascending: true });

    if (pagination) {
      const from = (pagination.page - 1) * pagination.limit;
      const to = from + pagination.limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      return { data: null, error: error.message, count: 0 };
    }

    return { data, error: null, count: count || 0 };
  } catch (error) {
    return { data: null, error: 'Failed to fetch forum replies', count: 0 };
  }
};

export const createForumReply = async (
  threadId: string,
  content: string,
  parentReplyId?: string
): Promise<{ data: ForumReply | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('forum_replies')
      .insert({
        thread_id: threadId,
        author_id: user.id,
        content,
        parent_reply_id: parentReplyId,
      })
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, university)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create reply' };
  }
};

export const updateForumReply = async (
  replyId: string,
  content: string
): Promise<{ data: ForumReply | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .update({ content })
      .eq('id', replyId)
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, university)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update reply' };
  }
};

export const deleteForumReply = async (
  replyId: string
): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('forum_replies')
      .delete()
      .eq('id', replyId);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to delete reply' };
  }
};

export const markReplyAsSolution = async (
  replyId: string
): Promise<{ error: string | null }> => {
  try {
    // First, unmark any existing solutions in the same thread
    const { data: reply } = await supabase
      .from('forum_replies')
      .select('thread_id')
      .eq('id', replyId)
      .single();

    if (reply) {
      await supabase
        .from('forum_replies')
        .update({ is_solution: false })
        .eq('thread_id', reply.thread_id);

      // Mark the selected reply as solution
      const { error } = await supabase
        .from('forum_replies')
        .update({ is_solution: true })
        .eq('id', replyId);

      if (error) {
        return { error: error.message };
      }
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to mark reply as solution' };
  }
};

// Search Functions
export const searchForumContent = async (
  searchTerm: string,
  filters?: {
    category_id?: string;
    author_id?: string;
    tags?: string[];
    date_from?: string;
    date_to?: string;
  },
  pagination?: {
    page: number;
    limit: number;
  }
): Promise<{
  data: { threads: ForumThread[]; replies: ForumReply[] } | null;
  error: string | null;
}> => {
  try {
    const searchPattern = `%${searchTerm}%`;

    // Search threads
    let threadQuery = supabase
      .from('forum_threads')
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, university),
        category:category_id(*)
      `
      )
      .or(`title.ilike.${searchPattern},content.ilike.${searchPattern}`);

    if (filters?.category_id) {
      threadQuery = threadQuery.eq('category_id', filters.category_id);
    }

    if (filters?.author_id) {
      threadQuery = threadQuery.eq('author_id', filters.author_id);
    }

    if (filters?.tags && filters.tags.length > 0) {
      threadQuery = threadQuery.overlaps('tags', filters.tags);
    }

    if (filters?.date_from) {
      threadQuery = threadQuery.gte('created_at', filters.date_from);
    }

    if (filters?.date_to) {
      threadQuery = threadQuery.lte('created_at', filters.date_to);
    }

    if (pagination) {
      const from = (pagination.page - 1) * pagination.limit;
      const to = from + pagination.limit - 1;
      threadQuery = threadQuery.range(from, to);
    }

    const { data: threads, error: threadError } = await threadQuery;

    if (threadError) {
      return { data: null, error: threadError.message };
    }

    // Search replies
    let replyQuery = supabase
      .from('forum_replies')
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, university),
        thread:thread_id(id, title, category:category_id(*))
      `
      )
      .ilike('content', searchPattern);

    if (filters?.author_id) {
      replyQuery = replyQuery.eq('author_id', filters.author_id);
    }

    if (filters?.date_from) {
      replyQuery = replyQuery.gte('created_at', filters.date_from);
    }

    if (filters?.date_to) {
      replyQuery = replyQuery.lte('created_at', filters.date_to);
    }

    if (pagination) {
      const from = (pagination.page - 1) * pagination.limit;
      const to = from + pagination.limit - 1;
      replyQuery = replyQuery.range(from, to);
    }

    const { data: replies, error: replyError } = await replyQuery;

    if (replyError) {
      return { data: null, error: replyError.message };
    }

    return {
      data: {
        threads: threads || [],
        replies: replies || [],
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error: 'Failed to search forum content' };
  }
};

// User's Forum Activity
export const getUserForumActivity = async (
  userId?: string
): Promise<{
  data: {
    threads: ForumThread[];
    replies: ForumReply[];
  } | null;
  error: string | null;
}> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const targetUserId = userId || user?.id;

    if (!targetUserId) {
      return { data: null, error: 'User not authenticated' };
    }

    // Get user's threads
    const { data: threads, error: threadError } = await supabase
      .from('forum_threads')
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, university),
        category:category_id(*)
      `
      )
      .eq('author_id', targetUserId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (threadError) {
      return { data: null, error: threadError.message };
    }

    // Get user's replies
    const { data: replies, error: replyError } = await supabase
      .from('forum_replies')
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, university),
        thread:thread_id(id, title, category:category_id(*))
      `
      )
      .eq('author_id', targetUserId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (replyError) {
      return { data: null, error: replyError.message };
    }

    return {
      data: {
        threads: threads || [],
        replies: replies || [],
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error: 'Failed to fetch user forum activity' };
  }
};
