-- Supabase Storage Setup
-- This file sets up storage buckets and policies for file uploads

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('portfolio', 'portfolio', true, 26214400, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']),
  ('groups', 'groups', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('documents', 'documents', false, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain', 'image/jpeg', 'image/png', 'image/webp']),
  ('posts', 'posts', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('mentorship', 'mentorship', false, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png', 'image/webp']),
  ('university', 'university', true, 26214400, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('jobs', 'jobs', true, 26214400, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);

-- Storage policies for avatars bucket
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for portfolio bucket
CREATE POLICY "Portfolio files are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');

CREATE POLICY "Users can upload to their own portfolio folder" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'portfolio' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own portfolio files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'portfolio' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own portfolio files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'portfolio' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for groups bucket
CREATE POLICY "Group images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'groups');

CREATE POLICY "Group members can upload group images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'groups' AND
    auth.uid() IN (
      SELECT user_id FROM public.group_members 
      WHERE group_id = (storage.foldername(name))[1]::uuid
    )
  );

CREATE POLICY "Group members can update group images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'groups' AND
    auth.uid() IN (
      SELECT user_id FROM public.group_members 
      WHERE group_id = (storage.foldername(name))[1]::uuid
    )
  );

CREATE POLICY "Group members can delete group images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'groups' AND
    auth.uid() IN (
      SELECT user_id FROM public.group_members 
      WHERE group_id = (storage.foldername(name))[1]::uuid
    )
  );

-- Storage policies for documents bucket (private)
CREATE POLICY "Users can view their own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload to their own documents folder" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own documents" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own documents" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for posts bucket
CREATE POLICY "Post images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'posts');

CREATE POLICY "Users can upload post images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'posts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own post images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'posts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own post images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'posts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for mentorship bucket (private)
CREATE POLICY "Users can view their own mentorship documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'mentorship' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload to their own mentorship folder" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'mentorship' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own mentorship documents" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'mentorship' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own mentorship documents" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'mentorship' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for university bucket
CREATE POLICY "University files are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'university');

CREATE POLICY "University users can upload university files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'university' AND
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'university'
    )
  );

CREATE POLICY "University users can update university files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'university' AND
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'university'
    )
  );

CREATE POLICY "University users can delete university files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'university' AND
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'university'
    )
  );

-- Storage policies for jobs bucket
CREATE POLICY "Job files are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'jobs');

CREATE POLICY "Users can upload job-related files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'jobs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own job files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'jobs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own job files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'jobs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create function to automatically create user folders
CREATE OR REPLACE FUNCTION public.create_user_folders()
RETURNS TRIGGER AS $$
BEGIN
  -- Create user folders in each bucket
  INSERT INTO storage.objects (bucket_id, name, owner)
  VALUES 
    ('avatars', NEW.id::text || '/', NEW.id),
    ('portfolio', NEW.id::text || '/', NEW.id),
    ('documents', NEW.id::text || '/', NEW.id),
    ('posts', NEW.id::text || '/', NEW.id),
    ('mentorship', NEW.id::text || '/', NEW.id),
    ('jobs', NEW.id::text || '/', NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to create user folders on user creation
CREATE TRIGGER create_user_folders_trigger
  AFTER INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.create_user_folders();

-- Create function to clean up user folders on user deletion
CREATE OR REPLACE FUNCTION public.cleanup_user_folders()
RETURNS TRIGGER AS $$
BEGIN
  -- Delete user folders from each bucket
  DELETE FROM storage.objects 
  WHERE bucket_id IN ('avatars', 'portfolio', 'documents', 'posts', 'mentorship', 'jobs')
    AND name LIKE OLD.id::text || '/%';
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to clean up user folders on user deletion
CREATE TRIGGER cleanup_user_folders_trigger
  AFTER DELETE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.cleanup_user_folders();

-- Create function to generate signed URLs for private files
CREATE OR REPLACE FUNCTION public.get_signed_url(bucket_name text, file_path text, expires_in integer DEFAULT 3600)
RETURNS text AS $$
DECLARE
  signed_url text;
BEGIN
  -- This function would typically call the Supabase storage API
  -- For now, we'll return a placeholder
  -- In a real implementation, you would use the Supabase client to generate signed URLs
  signed_url := 'https://your-project.supabase.co/storage/v1/object/sign/' || bucket_name || '/' || file_path || '?token=...';
  
  RETURN signed_url;
END;
$$ LANGUAGE plpgsql;

-- Create function to get file metadata
CREATE OR REPLACE FUNCTION public.get_file_metadata(bucket_name text, file_path text)
RETURNS jsonb AS $$
DECLARE
  file_metadata jsonb;
BEGIN
  SELECT metadata INTO file_metadata
  FROM storage.objects
  WHERE bucket_id = bucket_name AND name = file_path;
  
  RETURN COALESCE(file_metadata, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql;

-- Create function to update file metadata
CREATE OR REPLACE FUNCTION public.update_file_metadata(bucket_name text, file_path text, new_metadata jsonb)
RETURNS boolean AS $$
BEGIN
  UPDATE storage.objects
  SET metadata = new_metadata
  WHERE bucket_id = bucket_name AND name = file_path;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Create function to get storage usage by user
CREATE OR REPLACE FUNCTION public.get_user_storage_usage(user_id uuid)
RETURNS jsonb AS $$
DECLARE
  usage_stats jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_files', COUNT(*),
    'total_size', SUM(COALESCE(metadata->>'size', '0')::bigint),
    'buckets', jsonb_object_agg(
      bucket_id, 
      jsonb_build_object(
        'files', COUNT(*),
        'size', SUM(COALESCE(metadata->>'size', '0')::bigint)
      )
    )
  ) INTO usage_stats
  FROM storage.objects
  WHERE owner = user_id;
  
  RETURN COALESCE(usage_stats, '{"total_files": 0, "total_size": 0, "buckets": {}}'::jsonb);
END;
$$ LANGUAGE plpgsql;

-- Create function to check storage quota
CREATE OR REPLACE FUNCTION public.check_storage_quota(user_id uuid, file_size bigint)
RETURNS boolean AS $$
DECLARE
  current_usage bigint;
  quota_limit bigint := 1073741824; -- 1GB default quota
BEGIN
  -- Get current usage
  SELECT COALESCE(SUM(COALESCE(metadata->>'size', '0')::bigint), 0) INTO current_usage
  FROM storage.objects
  WHERE owner = user_id;
  
  -- Check if adding this file would exceed quota
  RETURN (current_usage + file_size) <= quota_limit;
END;
$$ LANGUAGE plpgsql;

-- Create function to get popular files
CREATE OR REPLACE FUNCTION public.get_popular_files(bucket_name text, limit_count integer DEFAULT 10)
RETURNS TABLE (
  name text,
  size bigint,
  created_at timestamptz,
  download_count bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.name,
    COALESCE((o.metadata->>'size')::bigint, 0) as size,
    o.created_at,
    COALESCE((o.metadata->>'download_count')::bigint, 0) as download_count
  FROM storage.objects o
  WHERE o.bucket_id = bucket_name
  ORDER BY COALESCE((o.metadata->>'download_count')::bigint, 0) DESC, o.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Create function to track file downloads
CREATE OR REPLACE FUNCTION public.track_file_download(bucket_name text, file_path text)
RETURNS void AS $$
BEGIN
  UPDATE storage.objects
  SET metadata = COALESCE(metadata, '{}'::jsonb) || 
      jsonb_build_object(
        'download_count', 
        COALESCE((metadata->>'download_count')::bigint, 0) + 1,
        'last_downloaded', 
        NOW()
      )
  WHERE bucket_id = bucket_name AND name = file_path;
END;
$$ LANGUAGE plpgsql;
