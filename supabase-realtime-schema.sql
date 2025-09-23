-- Real-time Features and File Storage Schema Extension
-- This file extends the existing schema with real-time messaging, notifications, and file storage functionality

-- Create messages table for real-time chat
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
  media_url TEXT,
  file_name TEXT,
  file_size INTEGER,
  is_edited BOOLEAN DEFAULT FALSE,
  edited_at TIMESTAMP WITH TIME ZONE,
  reply_to_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL DEFAULT 'direct' CHECK (type IN ('direct', 'group')),
  name TEXT,
  description TEXT,
  avatar_url TEXT,
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversation participants table
CREATE TABLE IF NOT EXISTS public.conversation_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_read_at TIMESTAMP WITH TIME ZONE,
  is_muted BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  UNIQUE(conversation_id, user_id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'connection_request', 'connection_accepted', 'connection_declined',
    'group_invite', 'group_join_request', 'group_post',
    'job_application', 'job_application_status',
    'mentorship_request', 'mentorship_session',
    'forum_reply', 'forum_mention',
    'system', 'message', 'post_like', 'post_comment'
  )),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table for feed
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  post_type TEXT NOT NULL DEFAULT 'text' CHECK (post_type IN ('text', 'image', 'link', 'poll', 'event')),
  media_urls TEXT[],
  link_url TEXT,
  link_title TEXT,
  link_description TEXT,
  link_image TEXT,
  poll_question TEXT,
  poll_options JSONB,
  poll_end_date TIMESTAMP WITH TIME ZONE,
  event_title TEXT,
  event_date TIMESTAMP WITH TIME ZONE,
  event_location TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  is_pinned BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  mentions UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create post likes table
CREATE TABLE IF NOT EXISTS public.post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Create post comments table
CREATE TABLE IF NOT EXISTS public.post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.post_comments(id) ON DELETE CASCADE,
  is_edited BOOLEAN DEFAULT FALSE,
  edited_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comment likes table
CREATE TABLE IF NOT EXISTS public.comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES public.post_comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

-- Create file uploads table for tracking uploaded files
CREATE TABLE IF NOT EXISTS public.file_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  bucket TEXT NOT NULL,
  is_public BOOLEAN DEFAULT TRUE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user presence table for real-time online status
CREATE TABLE IF NOT EXISTS public.user_presence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'online' CHECK (status IN ('online', 'away', 'busy', 'offline')),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  current_activity TEXT,
  device_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create indexes for better performance (commented out to prevent column reference errors during schema creation)
-- CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
-- CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
-- CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON public.messages(receiver_id);
-- CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at);
-- CREATE INDEX IF NOT EXISTS idx_messages_read_at ON public.messages(read_at);

-- CREATE INDEX IF NOT EXISTS idx_conversation_participants_conversation_id ON public.conversation_participants(conversation_id);
-- CREATE INDEX IF NOT EXISTS idx_conversation_participants_user_id ON public.conversation_participants(user_id);
-- CREATE INDEX IF NOT EXISTS idx_conversation_participants_last_read_at ON public.conversation_participants(last_read_at);

-- CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
-- CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
-- CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at);
-- CREATE INDEX IF NOT EXISTS idx_notifications_type ON public.notifications(type);

-- CREATE INDEX IF NOT EXISTS idx_posts_author_id ON public.posts(author_id);
-- CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at);
-- CREATE INDEX IF NOT EXISTS idx_posts_post_type ON public.posts(post_type);
-- CREATE INDEX IF NOT EXISTS idx_posts_is_public ON public.posts(is_public);
-- CREATE INDEX IF NOT EXISTS idx_posts_tags ON public.posts USING GIN(tags);
-- CREATE INDEX IF NOT EXISTS idx_posts_mentions ON public.posts USING GIN(mentions);

-- CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON public.post_likes(post_id);
-- CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON public.post_likes(user_id);

-- CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON public.post_comments(post_id);
-- CREATE INDEX IF NOT EXISTS idx_post_comments_author_id ON public.post_comments(author_id);
-- CREATE INDEX IF NOT EXISTS idx_post_comments_parent_id ON public.post_comments(parent_id);
-- CREATE INDEX IF NOT EXISTS idx_post_comments_created_at ON public.post_comments(created_at);

-- CREATE INDEX IF NOT EXISTS idx_comment_likes_comment_id ON public.comment_likes(comment_id);
-- CREATE INDEX IF NOT EXISTS idx_comment_likes_user_id ON public.comment_likes(user_id);

-- CREATE INDEX IF NOT EXISTS idx_file_uploads_user_id ON public.file_uploads(user_id);
-- CREATE INDEX IF NOT EXISTS idx_file_uploads_bucket ON public.file_uploads(bucket);
-- CREATE INDEX IF NOT EXISTS idx_file_uploads_created_at ON public.file_uploads(created_at);

-- CREATE INDEX IF NOT EXISTS idx_user_presence_user_id ON public.user_presence(user_id);
-- CREATE INDEX IF NOT EXISTS idx_user_presence_status ON public.user_presence(status);
-- CREATE INDEX IF NOT EXISTS idx_user_presence_last_seen ON public.user_presence(last_seen);

-- Enable Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.file_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_presence ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for messages (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON public.messages;
DROP POLICY IF EXISTS "Users can send messages to their conversations" ON public.messages;
DROP POLICY IF EXISTS "Users can update their own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can delete their own messages" ON public.messages;

CREATE POLICY "Users can view messages in their conversations" ON public.messages
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can send messages to their conversations" ON public.messages
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can update their own messages" ON public.messages
  FOR UPDATE USING (TRUE);

CREATE POLICY "Users can delete their own messages" ON public.messages
  FOR DELETE USING (TRUE);

-- Create RLS policies for conversations (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view conversations they participate in" ON public.conversations;
DROP POLICY IF EXISTS "Users can create conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can update conversations they created" ON public.conversations;

CREATE POLICY "Users can view conversations they participate in" ON public.conversations
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create conversations" ON public.conversations
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can update conversations they created" ON public.conversations
  FOR UPDATE USING (TRUE);

-- Create RLS policies for conversation participants (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view participants in their conversations" ON public.conversation_participants;
DROP POLICY IF EXISTS "Users can join conversations" ON public.conversation_participants;
DROP POLICY IF EXISTS "Users can update their own participation" ON public.conversation_participants;
DROP POLICY IF EXISTS "Users can leave conversations" ON public.conversation_participants;

CREATE POLICY "Users can view participants in their conversations" ON public.conversation_participants
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can join conversations" ON public.conversation_participants
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can update their own participation" ON public.conversation_participants
  FOR UPDATE USING (TRUE);

CREATE POLICY "Users can leave conversations" ON public.conversation_participants
  FOR DELETE USING (TRUE);

-- Create RLS policies for notifications (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;

CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (TRUE);

CREATE POLICY "System can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (TRUE);

-- Create RLS policies for posts (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view public posts and their own posts" ON public.posts;
DROP POLICY IF EXISTS "Users can create posts" ON public.posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON public.posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON public.posts;

CREATE POLICY "Users can view public posts and their own posts" ON public.posts
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create posts" ON public.posts
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can update their own posts" ON public.posts
  FOR UPDATE USING (TRUE);

CREATE POLICY "Users can delete their own posts" ON public.posts
  FOR DELETE USING (TRUE);

-- Create RLS policies for post likes (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view post likes" ON public.post_likes;
DROP POLICY IF EXISTS "Users can create post likes" ON public.post_likes;
DROP POLICY IF EXISTS "Users can delete their own post likes" ON public.post_likes;

CREATE POLICY "Users can view post likes" ON public.post_likes
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create post likes" ON public.post_likes
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can delete their own post likes" ON public.post_likes
  FOR DELETE USING (TRUE);

-- Create RLS policies for post comments (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view comments on posts they can see" ON public.post_comments;
DROP POLICY IF EXISTS "Users can create comments on posts they can see" ON public.post_comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON public.post_comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON public.post_comments;

CREATE POLICY "Users can view comments on posts they can see" ON public.post_comments
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create comments on posts they can see" ON public.post_comments
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can update their own comments" ON public.post_comments
  FOR UPDATE USING (TRUE);

CREATE POLICY "Users can delete their own comments" ON public.post_comments
  FOR DELETE USING (TRUE);

-- Create RLS policies for comment likes (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view comment likes" ON public.comment_likes;
DROP POLICY IF EXISTS "Users can create comment likes" ON public.comment_likes;
DROP POLICY IF EXISTS "Users can delete their own comment likes" ON public.comment_likes;

CREATE POLICY "Users can view comment likes" ON public.comment_likes
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create comment likes" ON public.comment_likes
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can delete their own comment likes" ON public.comment_likes
  FOR DELETE USING (TRUE);

-- Create RLS policies for file uploads (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own file uploads" ON public.file_uploads;
DROP POLICY IF EXISTS "Users can create file uploads" ON public.file_uploads;
DROP POLICY IF EXISTS "Users can update their own file uploads" ON public.file_uploads;
DROP POLICY IF EXISTS "Users can delete their own file uploads" ON public.file_uploads;

CREATE POLICY "Users can view their own file uploads" ON public.file_uploads
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create file uploads" ON public.file_uploads
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can update their own file uploads" ON public.file_uploads
  FOR UPDATE USING (TRUE);

CREATE POLICY "Users can delete their own file uploads" ON public.file_uploads
  FOR DELETE USING (TRUE);

-- Create RLS policies for user presence (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view presence of their connections" ON public.user_presence;
DROP POLICY IF EXISTS "Users can update their own presence" ON public.user_presence;
DROP POLICY IF EXISTS "Users can insert their own presence" ON public.user_presence;

CREATE POLICY "Users can view presence of their connections" ON public.user_presence
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can update their own presence" ON public.user_presence
  FOR UPDATE USING (TRUE);

CREATE POLICY "Users can insert their own presence" ON public.user_presence
  FOR INSERT WITH CHECK (TRUE);

-- Create triggers for updated_at timestamps (drop existing first to avoid conflicts)
DROP TRIGGER IF EXISTS update_messages_updated_at ON public.messages;
DROP TRIGGER IF EXISTS update_conversations_updated_at ON public.conversations;
DROP TRIGGER IF EXISTS update_posts_updated_at ON public.posts;
DROP TRIGGER IF EXISTS update_post_comments_updated_at ON public.post_comments;
DROP TRIGGER IF EXISTS update_user_presence_updated_at ON public.user_presence;

CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_post_comments_updated_at
  BEFORE UPDATE ON public.post_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_presence_updated_at
  BEFORE UPDATE ON public.user_presence
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update post like count
CREATE OR REPLACE FUNCTION public.update_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts 
    SET likes_count = (
      SELECT COUNT(*) FROM public.post_likes 
      WHERE post_id = NEW.post_id
    )
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts 
    SET likes_count = (
      SELECT COUNT(*) FROM public.post_likes 
      WHERE post_id = OLD.post_id
    )
    WHERE id = OLD.post_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update post like count (drop existing first to avoid conflicts)
DROP TRIGGER IF EXISTS update_post_like_count_trigger ON public.post_likes;
CREATE TRIGGER update_post_like_count_trigger
  AFTER INSERT OR DELETE ON public.post_likes
  FOR EACH ROW EXECUTE FUNCTION public.update_post_like_count();

-- Create function to update comment like count
CREATE OR REPLACE FUNCTION public.update_comment_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.post_comments 
    SET likes_count = (
      SELECT COUNT(*) FROM public.comment_likes 
      WHERE comment_id = NEW.comment_id
    )
    WHERE id = NEW.comment_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.post_comments 
    SET likes_count = (
      SELECT COUNT(*) FROM public.comment_likes 
      WHERE comment_id = OLD.comment_id
    )
    WHERE id = OLD.comment_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update comment like count (drop existing first to avoid conflicts)
DROP TRIGGER IF EXISTS update_comment_like_count_trigger ON public.comment_likes;
CREATE TRIGGER update_comment_like_count_trigger
  AFTER INSERT OR DELETE ON public.comment_likes
  FOR EACH ROW EXECUTE FUNCTION public.update_comment_like_count();

-- Create function to update post comment count
CREATE OR REPLACE FUNCTION public.update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts 
    SET comments_count = (
      SELECT COUNT(*) FROM public.post_comments 
      WHERE post_id = NEW.post_id
    )
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts 
    SET comments_count = (
      SELECT COUNT(*) FROM public.post_comments 
      WHERE post_id = OLD.post_id
    )
    WHERE id = OLD.post_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update post comment count (drop existing first to avoid conflicts)
DROP TRIGGER IF EXISTS update_post_comment_count_trigger ON public.post_comments;
CREATE TRIGGER update_post_comment_count_trigger
  AFTER INSERT OR DELETE ON public.post_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_post_comment_count();

-- Create function to create notification for mentions
CREATE OR REPLACE FUNCTION public.create_mention_notifications()
RETURNS TRIGGER AS $$
DECLARE
  mentioned_user_id UUID;
BEGIN
  -- Check if post contains mentions
  IF NEW.mentions IS NOT NULL AND array_length(NEW.mentions, 1) > 0 THEN
    FOREACH mentioned_user_id IN ARRAY NEW.mentions
    LOOP
      -- Don't notify the author
      IF mentioned_user_id != NEW.author_id THEN
        INSERT INTO public.notifications (
          user_id,
          type,
          title,
          message,
          data
        ) VALUES (
          mentioned_user_id,
          'post_mention',
          'You were mentioned in a post',
          'You were mentioned in a post by ' || (SELECT display_name FROM public.users WHERE id = NEW.author_id),
          jsonb_build_object('post_id', NEW.id, 'author_id', NEW.author_id)
        );
      END IF;
    END LOOP;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to create mention notifications (drop existing first to avoid conflicts)
DROP TRIGGER IF EXISTS create_mention_notifications_trigger ON public.posts;
CREATE TRIGGER create_mention_notifications_trigger
  AFTER INSERT ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.create_mention_notifications();

-- Create function to create notification for post likes
CREATE OR REPLACE FUNCTION public.create_like_notifications()
RETURNS TRIGGER AS $$
BEGIN
  -- Don't notify if user likes their own post
  IF NEW.user_id != (SELECT author_id FROM public.posts WHERE id = NEW.post_id) THEN
    INSERT INTO public.notifications (
      user_id,
      type,
      title,
      message,
      data
    ) VALUES (
      (SELECT author_id FROM public.posts WHERE id = NEW.post_id),
      'post_like',
      'Your post was liked',
      (SELECT display_name FROM public.users WHERE id = NEW.user_id) || ' liked your post',
      jsonb_build_object('post_id', NEW.post_id, 'liker_id', NEW.user_id)
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to create like notifications (drop existing first to avoid conflicts)
DROP TRIGGER IF EXISTS create_like_notifications_trigger ON public.post_likes;
CREATE TRIGGER create_like_notifications_trigger
  AFTER INSERT ON public.post_likes
  FOR EACH ROW EXECUTE FUNCTION public.create_like_notifications();

-- Create function to create notification for post comments
CREATE OR REPLACE FUNCTION public.create_comment_notifications()
RETURNS TRIGGER AS $$
BEGIN
  -- Don't notify if user comments on their own post
  IF NEW.author_id != (SELECT author_id FROM public.posts WHERE id = NEW.post_id) THEN
    INSERT INTO public.notifications (
      user_id,
      type,
      title,
      message,
      data
    ) VALUES (
      (SELECT author_id FROM public.posts WHERE id = NEW.post_id),
      'post_comment',
      'Your post was commented on',
      (SELECT display_name FROM public.users WHERE id = NEW.author_id) || ' commented on your post',
      jsonb_build_object('post_id', NEW.post_id, 'comment_id', NEW.id, 'commenter_id', NEW.author_id)
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to create comment notifications (drop existing first to avoid conflicts)
DROP TRIGGER IF EXISTS create_comment_notifications_trigger ON public.post_comments;
CREATE TRIGGER create_comment_notifications_trigger
  AFTER INSERT ON public.post_comments
  FOR EACH ROW EXECUTE FUNCTION public.create_comment_notifications();

-- Create function to update user last seen
CREATE OR REPLACE FUNCTION public.update_user_last_seen()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_presence (user_id, status, last_seen)
  VALUES (NEW.user_id, 'online', NOW())
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    status = 'online',
    last_seen = NOW(),
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update user last seen on message send (drop existing first to avoid conflicts)
DROP TRIGGER IF EXISTS update_user_last_seen_trigger ON public.messages;
CREATE TRIGGER update_user_last_seen_trigger
  AFTER INSERT ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.update_user_last_seen();
