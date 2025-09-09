-- Feed System Database Schema
-- This file contains all the tables and relationships needed for the feed post system

-- =============================================
-- POSTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  post_type TEXT NOT NULL DEFAULT 'text' CHECK (post_type IN ('text', 'media', 'article', 'event', 'poll')),
  media_urls TEXT[] DEFAULT '{}',
  article_data JSONB, -- For article posts with title, content, etc.
  event_data JSONB, -- For event posts with date, location, etc.
  poll_data JSONB, -- For poll posts with options, votes, etc.
  tags TEXT[] DEFAULT '{}',
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'connections', 'private')),
  is_pinned BOOLEAN DEFAULT FALSE,
  is_highlighted BOOLEAN DEFAULT FALSE,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- COMMENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE, -- For nested comments
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  like_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- POST LIKES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id) -- Prevent duplicate likes
);

-- =============================================
-- COMMENT LIKES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(comment_id, user_id) -- Prevent duplicate likes
);

-- =============================================
-- POST SHARES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.post_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  shared_content TEXT, -- Optional comment when sharing
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- POST VIEWS TABLE (for analytics)
-- =============================================
CREATE TABLE IF NOT EXISTS public.post_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL, -- NULL for anonymous views
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SAVED POSTS TABLE (bookmarks)
-- =============================================
CREATE TABLE IF NOT EXISTS public.saved_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id) -- Prevent duplicate saves
);

-- =============================================
-- POST REPORTS TABLE (for moderation)
-- =============================================
CREATE TABLE IF NOT EXISTS public.post_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  reporter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES public.users(id)
);

-- =============================================
-- MEDIA FILES TABLE (for tracking uploaded files)
-- =============================================
CREATE TABLE IF NOT EXISTS public.media_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  uploaded_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.posts(id) ON DELETE SET NULL,
  comment_id UUID REFERENCES public.comments(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Posts indexes
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_post_type ON public.posts(post_type);
CREATE INDEX IF NOT EXISTS idx_posts_visibility ON public.posts(visibility);
CREATE INDEX IF NOT EXISTS idx_posts_is_pinned ON public.posts(is_pinned);
CREATE INDEX IF NOT EXISTS idx_posts_deleted_at ON public.posts(deleted_at);

-- Comments indexes
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON public.comments(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_comment_id ON public.comments(parent_comment_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments(created_at DESC);

-- Likes indexes
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON public.post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON public.post_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_comment_likes_comment_id ON public.comment_likes(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_likes_user_id ON public.comment_likes(user_id);

-- Shares indexes
CREATE INDEX IF NOT EXISTS idx_post_shares_post_id ON public.post_shares(post_id);
CREATE INDEX IF NOT EXISTS idx_post_shares_user_id ON public.post_shares(user_id);

-- Views indexes
CREATE INDEX IF NOT EXISTS idx_post_views_post_id ON public.post_views(post_id);
CREATE INDEX IF NOT EXISTS idx_post_views_user_id ON public.post_views(user_id);
CREATE INDEX IF NOT EXISTS idx_post_views_created_at ON public.post_views(created_at);

-- Saved posts indexes
CREATE INDEX IF NOT EXISTS idx_saved_posts_user_id ON public.saved_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_posts_post_id ON public.saved_posts(post_id);

-- Media files indexes
CREATE INDEX IF NOT EXISTS idx_media_files_uploaded_by ON public.media_files(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_media_files_post_id ON public.media_files(post_id);
CREATE INDEX IF NOT EXISTS idx_media_files_comment_id ON public.media_files(comment_id);

-- =============================================
-- TRIGGERS FOR AUTOMATIC COUNTER UPDATES
-- =============================================

-- Function to update post counters
CREATE OR REPLACE FUNCTION update_post_counters()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF TG_TABLE_NAME = 'post_likes' THEN
      UPDATE public.posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_TABLE_NAME = 'post_shares' THEN
      UPDATE public.posts SET share_count = share_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_TABLE_NAME = 'comments' THEN
      UPDATE public.posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_TABLE_NAME = 'post_views' THEN
      UPDATE public.posts SET view_count = view_count + 1 WHERE id = NEW.post_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF TG_TABLE_NAME = 'post_likes' THEN
      UPDATE public.posts SET like_count = like_count - 1 WHERE id = OLD.post_id;
    ELSIF TG_TABLE_NAME = 'post_shares' THEN
      UPDATE public.posts SET share_count = share_count - 1 WHERE id = OLD.post_id;
    ELSIF TG_TABLE_NAME = 'comments' THEN
      UPDATE public.posts SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Function to update comment counters
CREATE OR REPLACE FUNCTION update_comment_counters()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF TG_TABLE_NAME = 'comment_likes' THEN
      UPDATE public.comments SET like_count = like_count + 1 WHERE id = NEW.comment_id;
    ELSIF TG_TABLE_NAME = 'comments' AND NEW.parent_comment_id IS NOT NULL THEN
      UPDATE public.comments SET reply_count = reply_count + 1 WHERE id = NEW.parent_comment_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF TG_TABLE_NAME = 'comment_likes' THEN
      UPDATE public.comments SET like_count = like_count - 1 WHERE id = OLD.comment_id;
    ELSIF TG_TABLE_NAME = 'comments' AND OLD.parent_comment_id IS NOT NULL THEN
      UPDATE public.comments SET reply_count = reply_count - 1 WHERE id = OLD.parent_comment_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS trigger_update_post_counters ON public.post_likes;
CREATE TRIGGER trigger_update_post_counters
  AFTER INSERT OR DELETE ON public.post_likes
  FOR EACH ROW EXECUTE FUNCTION update_post_counters();

DROP TRIGGER IF EXISTS trigger_update_post_share_counters ON public.post_shares;
CREATE TRIGGER trigger_update_post_share_counters
  AFTER INSERT ON public.post_shares
  FOR EACH ROW EXECUTE FUNCTION update_post_counters();

DROP TRIGGER IF EXISTS trigger_update_post_comment_counters ON public.comments;
CREATE TRIGGER trigger_update_post_comment_counters
  AFTER INSERT OR DELETE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION update_post_counters();

DROP TRIGGER IF EXISTS trigger_update_post_view_counters ON public.post_views;
CREATE TRIGGER trigger_update_post_view_counters
  AFTER INSERT ON public.post_views
  FOR EACH ROW EXECUTE FUNCTION update_post_counters();

DROP TRIGGER IF EXISTS trigger_update_comment_counters ON public.comment_likes;
CREATE TRIGGER trigger_update_comment_counters
  AFTER INSERT OR DELETE ON public.comment_likes
  FOR EACH ROW EXECUTE FUNCTION update_comment_counters();

DROP TRIGGER IF EXISTS trigger_update_comment_reply_counters ON public.comments;
CREATE TRIGGER trigger_update_comment_reply_counters
  AFTER INSERT OR DELETE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION update_comment_counters();

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

-- Posts policies
CREATE POLICY "Users can view public posts and their own posts" ON public.posts
  FOR SELECT USING (
    visibility = 'public' OR 
    author_id = auth.uid() OR 
    (visibility = 'connections' AND EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND connections > 0
    ))
  );

CREATE POLICY "Users can create their own posts" ON public.posts
  FOR INSERT WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update their own posts" ON public.posts
  FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Users can delete their own posts" ON public.posts
  FOR DELETE USING (author_id = auth.uid());

-- Comments policies
CREATE POLICY "Users can view comments on visible posts" ON public.comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.posts 
      WHERE id = post_id AND (
        visibility = 'public' OR 
        author_id = auth.uid() OR 
        (visibility = 'connections' AND EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND connections > 0
        ))
      )
    )
  );

CREATE POLICY "Users can create comments on visible posts" ON public.comments
  FOR INSERT WITH CHECK (
    author_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.posts 
      WHERE id = post_id AND (
        visibility = 'public' OR 
        author_id = auth.uid() OR 
        (visibility = 'connections' AND EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND connections > 0
        ))
      )
    )
  );

CREATE POLICY "Users can update their own comments" ON public.comments
  FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Users can delete their own comments" ON public.comments
  FOR DELETE USING (author_id = auth.uid());

-- Likes policies
CREATE POLICY "Users can view likes on visible posts" ON public.post_likes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.posts 
      WHERE id = post_id AND (
        visibility = 'public' OR 
        author_id = auth.uid() OR 
        (visibility = 'connections' AND EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND connections > 0
        ))
      )
    )
  );

CREATE POLICY "Users can like posts" ON public.post_likes
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.posts 
      WHERE id = post_id AND (
        visibility = 'public' OR 
        author_id = auth.uid() OR 
        (visibility = 'connections' AND EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND connections > 0
        ))
      )
    )
  );

CREATE POLICY "Users can unlike their own likes" ON public.post_likes
  FOR DELETE USING (user_id = auth.uid());

-- Comment likes policies
CREATE POLICY "Users can view comment likes" ON public.comment_likes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.comments c
      JOIN public.posts p ON c.post_id = p.id
      WHERE c.id = comment_id AND (
        p.visibility = 'public' OR 
        p.author_id = auth.uid() OR 
        (p.visibility = 'connections' AND EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND connections > 0
        ))
      )
    )
  );

CREATE POLICY "Users can like comments" ON public.comment_likes
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.comments c
      JOIN public.posts p ON c.post_id = p.id
      WHERE c.id = comment_id AND (
        p.visibility = 'public' OR 
        p.author_id = auth.uid() OR 
        (p.visibility = 'connections' AND EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND connections > 0
        ))
      )
    )
  );

CREATE POLICY "Users can unlike their own comment likes" ON public.comment_likes
  FOR DELETE USING (user_id = auth.uid());

-- Shares policies
CREATE POLICY "Users can view shares on visible posts" ON public.post_shares
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.posts 
      WHERE id = post_id AND (
        visibility = 'public' OR 
        author_id = auth.uid() OR 
        (visibility = 'connections' AND EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND connections > 0
        ))
      )
    )
  );

CREATE POLICY "Users can share posts" ON public.post_shares
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.posts 
      WHERE id = post_id AND (
        visibility = 'public' OR 
        author_id = auth.uid() OR 
        (visibility = 'connections' AND EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND connections > 0
        ))
      )
    )
  );

-- Views policies
CREATE POLICY "Users can view post view analytics for their own posts" ON public.post_views
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.posts 
      WHERE id = post_id AND author_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create post views" ON public.post_views
  FOR INSERT WITH CHECK (true);

-- Saved posts policies
CREATE POLICY "Users can view their own saved posts" ON public.saved_posts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can save posts" ON public.saved_posts
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.posts 
      WHERE id = post_id AND (
        visibility = 'public' OR 
        author_id = auth.uid() OR 
        (visibility = 'connections' AND EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND connections > 0
        ))
      )
    )
  );

CREATE POLICY "Users can unsave their own saved posts" ON public.saved_posts
  FOR DELETE USING (user_id = auth.uid());

-- Reports policies
CREATE POLICY "Users can view their own reports" ON public.post_reports
  FOR SELECT USING (reporter_id = auth.uid());

CREATE POLICY "Users can report posts" ON public.post_reports
  FOR INSERT WITH CHECK (
    reporter_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.posts 
      WHERE id = post_id AND author_id != auth.uid()
    )
  );

-- Media files policies
CREATE POLICY "Users can view media files for visible posts" ON public.media_files
  FOR SELECT USING (
    uploaded_by = auth.uid() OR
    (post_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.posts 
      WHERE id = post_id AND (
        visibility = 'public' OR 
        author_id = auth.uid() OR 
        (visibility = 'connections' AND EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND connections > 0
        ))
      )
    )) OR
    (comment_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.comments c
      JOIN public.posts p ON c.post_id = p.id
      WHERE c.id = comment_id AND (
        p.visibility = 'public' OR 
        p.author_id = auth.uid() OR 
        (p.visibility = 'connections' AND EXISTS (
          SELECT 1 FROM public.users 
          WHERE id = auth.uid() AND connections > 0
        ))
      )
    ))
  );

CREATE POLICY "Users can upload media files" ON public.media_files
  FOR INSERT WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Users can delete their own media files" ON public.media_files
  FOR DELETE USING (uploaded_by = auth.uid());

-- =============================================
-- FUNCTIONS FOR COMMON OPERATIONS
-- =============================================

-- Function to get feed posts with user information
CREATE OR REPLACE FUNCTION get_feed_posts(
  user_id_param UUID,
  limit_param INTEGER DEFAULT 20,
  offset_param INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  post_type TEXT,
  media_urls TEXT[],
  article_data JSONB,
  event_data JSONB,
  poll_data JSONB,
  tags TEXT[],
  visibility TEXT,
  is_pinned BOOLEAN,
  is_highlighted BOOLEAN,
  like_count INTEGER,
  comment_count INTEGER,
  share_count INTEGER,
  view_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  author_id UUID,
  author_name TEXT,
  author_avatar TEXT,
  author_role TEXT,
  author_university TEXT,
  author_country TEXT,
  is_liked BOOLEAN,
  is_saved BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.content,
    p.post_type,
    p.media_urls,
    p.article_data,
    p.event_data,
    p.poll_data,
    p.tags,
    p.visibility,
    p.is_pinned,
    p.is_highlighted,
    p.like_count,
    p.comment_count,
    p.share_count,
    p.view_count,
    p.created_at,
    p.updated_at,
    u.id as author_id,
    u.display_name as author_name,
    u.avatar as author_avatar,
    u.role as author_role,
    COALESCE(u.university, u.institution, u.official_university_name) as author_university,
    u.country as author_country,
    EXISTS(SELECT 1 FROM public.post_likes pl WHERE pl.post_id = p.id AND pl.user_id = user_id_param) as is_liked,
    EXISTS(SELECT 1 FROM public.saved_posts sp WHERE sp.post_id = p.id AND sp.user_id = user_id_param) as is_saved
  FROM public.posts p
  JOIN public.users u ON p.author_id = u.id
  WHERE p.deleted_at IS NULL
    AND (p.visibility = 'public' OR p.author_id = user_id_param)
  ORDER BY p.is_pinned DESC, p.created_at DESC
  LIMIT limit_param
  OFFSET offset_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get post comments with user information
CREATE OR REPLACE FUNCTION get_post_comments(
  post_id_param UUID,
  user_id_param UUID,
  limit_param INTEGER DEFAULT 10,
  offset_param INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  media_urls TEXT[],
  like_count INTEGER,
  reply_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  author_id UUID,
  author_name TEXT,
  author_avatar TEXT,
  author_role TEXT,
  author_country TEXT,
  parent_comment_id UUID,
  is_liked BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.content,
    c.media_urls,
    c.like_count,
    c.reply_count,
    c.created_at,
    c.updated_at,
    u.id as author_id,
    u.display_name as author_name,
    u.avatar as author_avatar,
    u.role as author_role,
    u.country as author_country,
    c.parent_comment_id,
    EXISTS(SELECT 1 FROM public.comment_likes cl WHERE cl.comment_id = c.id AND cl.user_id = user_id_param) as is_liked
  FROM public.comments c
  JOIN public.users u ON c.author_id = u.id
  WHERE c.post_id = post_id_param
    AND c.deleted_at IS NULL
  ORDER BY c.created_at ASC
  LIMIT limit_param
  OFFSET offset_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
