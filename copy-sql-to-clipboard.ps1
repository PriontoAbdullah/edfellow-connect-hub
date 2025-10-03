# PowerShell script to copy the SQL fix to clipboard
$sql = @"
-- Add missing columns to group_posts table
ALTER TABLE public.group_posts ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT FALSE;
ALTER TABLE public.group_posts ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT FALSE;
ALTER TABLE public.group_posts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE public.group_posts ADD COLUMN IF NOT EXISTS attachments JSONB;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_group_posts_is_pinned ON public.group_posts(is_pinned);
CREATE INDEX IF NOT EXISTS idx_group_posts_is_locked ON public.group_posts(is_locked);

-- Verify the columns were added
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'group_posts' AND table_schema = 'public';
"@

# Copy to clipboard
$sql | Set-Clipboard

Write-Host "✅ SQL copied to clipboard!" -ForegroundColor Green
Write-Host ""
Write-Host "Now follow these steps:" -ForegroundColor Yellow
Write-Host "1. Go to your Supabase Dashboard" -ForegroundColor White
Write-Host "2. Navigate to SQL Editor" -ForegroundColor White
Write-Host "3. Paste the SQL (Ctrl+V)" -ForegroundColor White
Write-Host "4. Click Run" -ForegroundColor White
Write-Host "5. Try creating a post again" -ForegroundColor White
Write-Host ""
Write-Host "The SQL is now in your clipboard - just paste it!" -ForegroundColor Cyan
