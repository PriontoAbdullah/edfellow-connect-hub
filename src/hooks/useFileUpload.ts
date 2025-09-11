import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface UploadOptions {
  bucket: 'avatars' | 'portfolio' | 'groups' | 'documents' | 'posts';
  folder?: string;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  generateThumbnail?: boolean;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadResult {
  url: string;
  path: string;
  size: number;
  type: string;
  thumbnailUrl?: string;
}

export const useFileUpload = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);

  const uploadFile = useCallback(
    async (
      file: File,
      options: UploadOptions
    ): Promise<{ data: UploadResult | null; error: string | null }> => {
      if (!user) {
        return { data: null, error: 'User not authenticated' };
      }

      // Validate file size
      if (options.maxSize && file.size > options.maxSize) {
        const maxSizeMB = options.maxSize / (1024 * 1024);
        return {
          data: null,
          error: `File size must be less than ${maxSizeMB}MB`,
        };
      }

      // Validate file type
      if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
        return {
          data: null,
          error: `File type not allowed. Allowed types: ${options.allowedTypes.join(
            ', '
          )}`,
        };
      }

      setUploading(true);
      setProgress({ loaded: 0, total: file.size, percentage: 0 });

      try {
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${
          options.folder || 'uploads'
        }/${Date.now()}.${fileExt}`;

        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
          .from(options.bucket)
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          throw error;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from(options.bucket)
          .getPublicUrl(fileName);

        const result: UploadResult = {
          url: urlData.publicUrl,
          path: fileName,
          size: file.size,
          type: file.type,
        };

        // Generate thumbnail for images if requested
        if (options.generateThumbnail && file.type.startsWith('image/')) {
          try {
            const thumbnailResult = await generateThumbnail(
              file,
              options.bucket,
              fileName
            );
            if (thumbnailResult.data) {
              result.thumbnailUrl = thumbnailResult.data.url;
            }
          } catch (thumbnailError) {
            console.warn('Failed to generate thumbnail:', thumbnailError);
          }
        }

        setProgress({ loaded: file.size, total: file.size, percentage: 100 });

        toast({
          title: 'Success',
          description: 'File uploaded successfully',
        });

        return { data: result, error: null };
      } catch (error: any) {
        console.error('Upload error:', error);
        return {
          data: null,
          error: error.message || 'Failed to upload file',
        };
      } finally {
        setUploading(false);
        setProgress(null);
      }
    },
    [user, toast]
  );

  const generateThumbnail = async (
    file: File,
    bucket: string,
    originalPath: string
  ): Promise<{ data: UploadResult | null; error: string | null }> => {
    try {
      // Create canvas for thumbnail generation
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      return new Promise((resolve) => {
        img.onload = async () => {
          // Calculate thumbnail dimensions (max 300x300)
          const maxSize = 300;
          let { width, height } = img;

          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Draw and compress image
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            async (blob) => {
              if (!blob) {
                resolve({ data: null, error: 'Failed to generate thumbnail' });
                return;
              }

              // Upload thumbnail
              const thumbnailPath = originalPath.replace(
                /\.[^/.]+$/,
                '_thumb.jpg'
              );
              const thumbnailFile = new File([blob], 'thumbnail.jpg', {
                type: 'image/jpeg',
              });

              const { data, error } = await supabase.storage
                .from(bucket)
                .upload(thumbnailPath, thumbnailFile, {
                  cacheControl: '3600',
                  upsert: false,
                });

              if (error) {
                resolve({ data: null, error: error.message });
                return;
              }

              const { data: urlData } = supabase.storage
                .from(bucket)
                .getPublicUrl(thumbnailPath);

              resolve({
                data: {
                  url: urlData.publicUrl,
                  path: thumbnailPath,
                  size: blob.size,
                  type: 'image/jpeg',
                },
                error: null,
              });
            },
            'image/jpeg',
            0.8
          );
        };

        img.onerror = () => {
          resolve({
            data: null,
            error: 'Failed to load image for thumbnail generation',
          });
        };

        img.src = URL.createObjectURL(file);
      });
    } catch (error: any) {
      return {
        data: null,
        error: error.message || 'Failed to generate thumbnail',
      };
    }
  };

  const deleteFile = useCallback(
    async (bucket: string, path: string): Promise<{ error: string | null }> => {
      try {
        const { error } = await supabase.storage.from(bucket).remove([path]);

        if (error) {
          return { error: error.message };
        }

        return { error: null };
      } catch (error: any) {
        return { error: error.message || 'Failed to delete file' };
      }
    },
    []
  );

  const getFileUrl = useCallback((bucket: string, path: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);

    return data.publicUrl;
  }, []);

  const uploadMultipleFiles = useCallback(
    async (
      files: File[],
      options: UploadOptions
    ): Promise<{ data: UploadResult[] | null; error: string | null }> => {
      const results: UploadResult[] = [];
      const errors: string[] = [];

      for (const file of files) {
        const result = await uploadFile(file, options);
        if (result.data) {
          results.push(result.data);
        } else if (result.error) {
          errors.push(`${file.name}: ${result.error}`);
        }
      }

      if (errors.length > 0) {
        return {
          data: results.length > 0 ? results : null,
          error: errors.join('; '),
        };
      }

      return { data: results, error: null };
    },
    [uploadFile]
  );

  return {
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    getFileUrl,
    uploading,
    progress,
  };
};

// Hook for avatar uploads
export const useAvatarUpload = () => {
  const { uploadFile, uploading, progress } = useFileUpload();

  const uploadAvatar = useCallback(
    async (file: File) => {
      return uploadFile(file, {
        bucket: 'avatars',
        folder: 'profiles',
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
        generateThumbnail: true,
      });
    },
    [uploadFile]
  );

  return {
    uploadAvatar,
    uploading,
    progress,
  };
};

// Hook for portfolio uploads
export const usePortfolioUpload = () => {
  const { uploadFile, uploadMultipleFiles, uploading, progress } =
    useFileUpload();

  const uploadPortfolioImage = useCallback(
    async (file: File) => {
      return uploadFile(file, {
        bucket: 'portfolio',
        folder: 'images',
        maxSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        generateThumbnail: true,
      });
    },
    [uploadFile]
  );

  const uploadPortfolioDocument = useCallback(
    async (file: File) => {
      return uploadFile(file, {
        bucket: 'portfolio',
        folder: 'documents',
        maxSize: 25 * 1024 * 1024, // 25MB
        allowedTypes: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
        ],
      });
    },
    [uploadFile]
  );

  const uploadMultiplePortfolioImages = useCallback(
    async (files: File[]) => {
      return uploadMultipleFiles(files, {
        bucket: 'portfolio',
        folder: 'images',
        maxSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        generateThumbnail: true,
      });
    },
    [uploadMultipleFiles]
  );

  return {
    uploadPortfolioImage,
    uploadPortfolioDocument,
    uploadMultiplePortfolioImages,
    uploading,
    progress,
  };
};

// Hook for group uploads
export const useGroupUpload = () => {
  const { uploadFile, uploading, progress } = useFileUpload();

  const uploadGroupImage = useCallback(
    async (file: File, groupId: string) => {
      return uploadFile(file, {
        bucket: 'groups',
        folder: groupId,
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
        generateThumbnail: true,
      });
    },
    [uploadFile]
  );

  return {
    uploadGroupImage,
    uploading,
    progress,
  };
};

// Hook for document uploads
export const useDocumentUpload = () => {
  const { uploadFile, uploading, progress } = useFileUpload();

  const uploadDocument = useCallback(
    async (file: File, category: string) => {
      return uploadFile(file, {
        bucket: 'documents',
        folder: category,
        maxSize: 50 * 1024 * 1024, // 50MB
        allowedTypes: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'text/plain',
          'image/jpeg',
          'image/png',
          'image/webp',
        ],
      });
    },
    [uploadFile]
  );

  return {
    uploadDocument,
    uploading,
    progress,
  };
};

// Hook for post uploads
export const usePostUpload = () => {
  const { uploadFile, uploadMultipleFiles, uploading, progress } =
    useFileUpload();

  const uploadPostImage = useCallback(
    async (file: File) => {
      return uploadFile(file, {
        bucket: 'posts',
        folder: 'images',
        maxSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        generateThumbnail: true,
      });
    },
    [uploadFile]
  );

  const uploadMultiplePostImages = useCallback(
    async (files: File[]) => {
      return uploadMultipleFiles(files, {
        bucket: 'posts',
        folder: 'images',
        maxSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        generateThumbnail: true,
      });
    },
    [uploadMultipleFiles]
  );

  return {
    uploadPostImage,
    uploadMultiplePostImages,
    uploading,
    progress,
  };
};
