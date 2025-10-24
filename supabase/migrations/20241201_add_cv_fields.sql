-- Add CV fields to users table
ALTER TABLE users 
ADD COLUMN cv_url TEXT,
ADD COLUMN cv_file_name TEXT;

-- Add comments for the new columns
COMMENT ON COLUMN users.cv_url IS 'URL to the user''s uploaded CV file';
COMMENT ON COLUMN users.cv_file_name IS 'Original filename of the uploaded CV';
