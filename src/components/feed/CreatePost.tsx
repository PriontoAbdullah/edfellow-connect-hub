// Create Post Component
// This component handles post creation with different types and media uploads

import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import {
  Image,
  Calendar,
  FileText,
  X,
  Plus,
  Hash,
  Globe,
  Users,
  Lock,
  Upload,
  Video,
  File,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type {
  PostFormData,
  PostType,
  PostVisibility,
  UploadedFile,
} from '@/types/feed';
import { usePostCreation } from '@/hooks/useFeed';
import { useAuth } from '@/contexts/AuthContext';
import { useFileUpload } from '@/lib/media-upload';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getCountryCode } from '@/lib/countries';

interface CreatePostProps {
  onPostCreated?: () => void;
  placeholder?: string;
  defaultType?: PostType;
  compact?: boolean;
}

export const CreatePost: React.FC<CreatePostProps> = ({
  onPostCreated,
  placeholder = 'What do you want to talk about?',
  defaultType = 'text',
  compact = false,
}) => {
  const { toast } = useToast();
  const { user, userData } = useAuth();
  const { createPost, loading, error, clearError } = usePostCreation();
  const { uploadFile, uploading, progress } = useFileUpload();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    content: '',
    post_type: defaultType,
    files: [],
    tags: [],
    visibility: 'public',
    article_data: undefined,
    event_data: undefined,
    poll_data: undefined,
  });

  const [newTag, setNewTag] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleTypeChange = (type: PostType) => {
    setFormData((prev) => ({ ...prev, post_type: type }));
  };

  const handleVisibilityChange = (visibility: PostVisibility) => {
    setFormData((prev) => ({ ...prev, visibility }));
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadedFile: UploadedFile = {
        file,
        preview: file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : undefined,
        progress: 0,
      };
      newFiles.push(uploadedFile);
    }

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.content.trim()) {
      toast({
        title: 'Content required',
        description: 'Please enter some content for your post.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const success = await createPost(formData);

      if (success) {
        toast({
          title: 'Post created',
          description: 'Your post has been published successfully.',
        });

        // Reset form
        setFormData({
          content: '',
          post_type: defaultType,
          files: [],
          tags: [],
          visibility: 'public',
          article_data: undefined,
          event_data: undefined,
          poll_data: undefined,
        });
        setNewTag('');
        setShowAdvanced(false);
        setIsOpen(false);

        onPostCreated?.();
      } else {
        toast({
          title: 'Failed to create post',
          description: error || 'An unexpected error occurred.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  const getVisibilityIcon = (visibility: PostVisibility) => {
    switch (visibility) {
      case 'public':
        return <Globe className='h-4 w-4' />;
      case 'connections':
        return <Users className='h-4 w-4' />;
      case 'private':
        return <Lock className='h-4 w-4' />;
    }
  };

  const getVisibilityLabel = (visibility: PostVisibility) => {
    switch (visibility) {
      case 'public':
        return 'Public';
      case 'connections':
        return 'Connections Only';
      case 'private':
        return 'Private';
    }
  };

  if (compact) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className='w-full'>
            <Plus className='h-4 w-4 mr-2' />
            Create Post
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Share your thoughts, ideas, or updates with your network.
            </DialogDescription>
          </DialogHeader>
          <CreatePostForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden'>
      <CardContent className='p-6'>
        <div className='flex items-start gap-4 mb-6'>
          <Avatar className='h-12 w-12 ring-2 ring-gray-100'>
            <AvatarImage
              src={userData?.avatar || undefined}
              alt={userData?.displayName || 'User'}
            />
            <AvatarFallback className='bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold'>
              {userData?.displayName
                ?.split(' ')
                .map((n) => n[0])
                .join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-sm font-medium text-gray-700'>
                {userData?.displayName || 'User'}
              </span>
              {userData?.country && (
                <div className='flex items-center gap-1'>
                  <CountryFlag
                    code={getCountryCode(userData.country)}
                    size={12}
                    className='rounded-sm'
                  />
                  <span className='text-xs text-gray-500'>
                    {userData.country}
                  </span>
                </div>
              )}
            </div>
            <Textarea
              placeholder={placeholder}
              value={formData.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className='min-h-[100px] resize-none border-0 focus:ring-0 text-base bg-gray-50 rounded-2xl p-4 placeholder:text-gray-500 hover:bg-gray-100 transition-colors'
            />
          </div>
        </div>

        {/* File Previews */}
        {formData.files.length > 0 && (
          <div className='mb-4'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
              {formData.files.map((file, index) => (
                <div key={index} className='relative'>
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={`Preview ${index + 1}`}
                      className='w-full h-24 object-cover rounded-lg'
                    />
                  ) : (
                    <div className='w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center'>
                      <File className='h-8 w-8 text-gray-400' />
                    </div>
                  )}
                  <Button
                    variant='destructive'
                    size='sm'
                    className='absolute -top-2 -right-2 h-6 w-6 rounded-full p-0'
                    onClick={() => removeFile(index)}
                  >
                    <X className='h-3 w-3' />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {formData.tags.length > 0 && (
          <div className='mb-4 flex flex-wrap gap-2'>
            {formData.tags.map((tag, index) => (
              <Badge key={index} variant='secondary' className='text-xs'>
                #{tag}
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-4 w-4 p-0 ml-1'
                  onClick={() => removeTag(tag)}
                >
                  <X className='h-3 w-3' />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {/* Advanced Options */}
        {showAdvanced && (
          <div className='mb-4 space-y-4 p-4 bg-gray-50 rounded-lg'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-medium text-gray-700 mb-2 block'>
                  Post Type
                </label>
                <Select
                  value={formData.post_type}
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='text'>Text Post</SelectItem>
                    <SelectItem value='media'>Media Post</SelectItem>
                    <SelectItem value='article'>Article</SelectItem>
                    <SelectItem value='event'>Event</SelectItem>
                    <SelectItem value='poll'>Poll</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className='text-sm font-medium text-gray-700 mb-2 block'>
                  Visibility
                </label>
                <Select
                  value={formData.visibility}
                  onValueChange={handleVisibilityChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='public'>
                      <div className='flex items-center gap-2'>
                        <Globe className='h-4 w-4' />
                        Public
                      </div>
                    </SelectItem>
                    <SelectItem value='connections'>
                      <div className='flex items-center gap-2'>
                        <Users className='h-4 w-4' />
                        Connections Only
                      </div>
                    </SelectItem>
                    <SelectItem value='private'>
                      <div className='flex items-center gap-2'>
                        <Lock className='h-4 w-4' />
                        Private
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className='text-sm font-medium text-gray-700 mb-2 block'>
                Add Tags
              </label>
              <div className='flex gap-2'>
                <Input
                  placeholder='Enter a tag'
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} disabled={!newTag.trim()}>
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
          <div className='flex items-center gap-2'>
            <input
              ref={fileInputRef}
              type='file'
              multiple
              accept='image/*,video/*,.pdf,.txt'
              onChange={(e) => handleFileUpload(e.target.files)}
              className='hidden'
            />
            <Button
              variant='ghost'
              size='sm'
              onClick={() => fileInputRef.current?.click()}
              className='text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200'
            >
              <Image className='h-5 w-5 mr-2' />
              Media
            </Button>
            {/* <Button
              variant='ghost'
              size='sm'
              className='text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200'
            >
              <Calendar className='h-5 w-5 mr-2' />
              Event
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200'
            >
              <FileText className='h-5 w-5 mr-2' />
              Write article
            </Button> */}
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setShowAdvanced(!showAdvanced)}
              className='text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200'
            >
              <Hash className='h-5 w-5 mr-2' />
              {showAdvanced ? 'Hide' : 'More'}
            </Button>
          </div>

          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1 text-sm text-gray-500'>
              {getVisibilityIcon(formData.visibility)}
              <span>{getVisibilityLabel(formData.visibility)}</span>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!formData.content.trim() || loading}
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>

        {error && (
          <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
            <p className='text-sm text-red-600'>{error}</p>
            <Button
              variant='ghost'
              size='sm'
              onClick={clearError}
              className='mt-2 text-red-600 hover:text-red-700'
            >
              Dismiss
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Internal form component for dialog
const CreatePostForm: React.FC = () => {
  // This would contain the same form logic but adapted for the dialog
  return (
    <div>
      {/* Form content would go here */}
      <p>Create post form content...</p>
    </div>
  );
};
