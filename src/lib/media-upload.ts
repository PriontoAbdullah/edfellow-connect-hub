// Media Upload System for Supabase Storage
// This file handles file uploads, processing, and management

import { useState } from 'react';
import { supabase } from './supabase';
import type {
  UploadedFile,
  MediaFile,
  FeedError,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
} from '@/types/feed';

// =============================================
// STORAGE CONFIGURATION
// =============================================

const STORAGE_BUCKET = 'edfellow';
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'text/plain'];

// =============================================
// FILE VALIDATION
// =============================================

/**
 * Validate file before upload
 */
export const validateFile = (
  file: File
): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return {
      valid: false,
      error: `File size must be less than ${MAX_FILE_SIZE_MB}MB`,
    };
  }

  // Check file type
  const allowedTypes = [
    ...ALLOWED_IMAGE_TYPES,
    ...ALLOWED_VIDEO_TYPES,
    ...ALLOWED_DOCUMENT_TYPES,
  ];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not supported' };
  }

  return { valid: true };
};

/**
 * Get file type category
 */
export const getFileTypeCategory = (
  mimeType: string
): 'image' | 'video' | 'document' => {
  if (ALLOWED_IMAGE_TYPES.includes(mimeType)) return 'image';
  if (ALLOWED_VIDEO_TYPES.includes(mimeType)) return 'video';
  if (ALLOWED_DOCUMENT_TYPES.includes(mimeType)) return 'document';
  return 'document';
};

/**
 * Generate unique filename
 */
export const generateFileName = (
  originalName: string,
  userId: string
): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `${userId}/${timestamp}_${randomString}.${extension}`;
};

// =============================================
// UPLOAD FUNCTIONS
// =============================================

/**
 * Upload a single file to Supabase Storage
 */
export const uploadFile = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<{
  data: { url: string; path: string } | null;
  error: FeedError | null;
}> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return {
        data: null,
        error: { code: 'INVALID_FILE', message: validation.error! },
      };
    }

    // Generate unique filename
    const fileName = generateFileName(file.name, user.id);
    const filePath = `${STORAGE_BUCKET}/${fileName}`;

    // Upload file
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      return {
        data: null,
        error: { code: 'UPLOAD_ERROR', message: error.message, details: error },
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(fileName);

    // Record file in database
    const { error: dbError } = await supabase.from('media_files').insert({
      filename: fileName,
      original_filename: file.name,
      file_path: filePath,
      file_size: file.size,
      mime_type: file.type,
      uploaded_by: user.id,
    });

    if (dbError) {
      console.error('Failed to record file in database:', dbError);
      // Don't fail the upload if database recording fails
    }

    return {
      data: {
        url: urlData.publicUrl,
        path: filePath,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

/**
 * Upload multiple files
 */
export const uploadFiles = async (
  files: File[],
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<{
  data: { url: string; path: string }[] | null;
  error: FeedError | null;
}> => {
  try {
    const results = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file
      const validation = validateFile(file);
      if (!validation.valid) {
        return {
          data: null,
          error: {
            code: 'INVALID_FILE',
            message: `File ${i + 1}: ${validation.error}`,
          },
        };
      }

      const result = await uploadFile(file, (progress) => {
        onProgress?.(i, progress);
      });

      if (result.error) {
        return { data: null, error: result.error };
      }

      results.push(result.data!);
    }

    return { data: results, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

// =============================================
// FILE MANAGEMENT
// =============================================

/**
 * Delete a file from storage and database
 */
export const deleteFile = async (
  filePath: string
): Promise<{ error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    // Extract filename from path
    const fileName = filePath.split('/').pop();
    if (!fileName) {
      return { error: { code: 'INVALID_PATH', message: 'Invalid file path' } };
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([fileName]);

    if (storageError) {
      return {
        error: {
          code: 'DELETE_STORAGE_ERROR',
          message: storageError.message,
          details: storageError,
        },
      };
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('media_files')
      .delete()
      .eq('file_path', filePath)
      .eq('uploaded_by', user.id);

    if (dbError) {
      return {
        error: {
          code: 'DELETE_DB_ERROR',
          message: dbError.message,
          details: dbError,
        },
      };
    }

    return { error: null };
  } catch (error) {
    return {
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

/**
 * Get user's uploaded files
 */
export const getUserFiles = async (
  limit: number = 50,
  offset: number = 0
): Promise<{ data: MediaFile[] | null; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    const { data, error } = await supabase
      .from('media_files')
      .select('*')
      .eq('uploaded_by', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return {
        data: null,
        error: {
          code: 'FETCH_FILES_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

// =============================================
// IMAGE PROCESSING
// =============================================

/**
 * Create image preview
 */
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Resize image for thumbnail
 */
export const resizeImage = (
  file: File,
  maxWidth: number = 300,
  maxHeight: number = 300,
  quality: number = 0.8
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            reject(new Error('Failed to resize image'));
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Get file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get file extension
 */
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

/**
 * Check if file is image
 */
export const isImageFile = (file: File): boolean => {
  return ALLOWED_IMAGE_TYPES.includes(file.type);
};

/**
 * Check if file is video
 */
export const isVideoFile = (file: File): boolean => {
  return ALLOWED_VIDEO_TYPES.includes(file.type);
};

/**
 * Check if file is document
 */
export const isDocumentFile = (file: File): boolean => {
  return ALLOWED_DOCUMENT_TYPES.includes(file.type);
};

/**
 * Get file icon based on type
 */
export const getFileIcon = (mimeType: string): string => {
  const category = getFileTypeCategory(mimeType);

  switch (category) {
    case 'image':
      return '🖼️';
    case 'video':
      return '🎥';
    case 'document':
      return '📄';
    default:
      return '📎';
  }
};

// =============================================
// REACT HOOK FOR FILE UPLOAD
// =============================================

/**
 * Custom hook for managing file uploads
 */
export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadSingleFile = async (
    file: File
  ): Promise<{ url: string; path: string } | null> => {
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const result = await uploadFile(file, (progress) => {
        setProgress(progress);
      });

      if (result.error) {
        setError(result.error.message);
        return null;
      }

      return result.data;
    } catch (err) {
      setError('An unexpected error occurred');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleFiles = async (
    files: File[]
  ): Promise<{ url: string; path: string }[] | null> => {
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const result = await uploadFiles(files, (fileIndex, fileProgress) => {
        const totalProgress = ((fileIndex + fileProgress) / files.length) * 100;
        setProgress(totalProgress);
      });

      if (result.error) {
        setError(result.error.message);
        return null;
      }

      return result.data;
    } catch (err) {
      setError('An unexpected error occurred');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    progress,
    error,
    uploadFile: uploadSingleFile,
    uploadFiles: uploadMultipleFiles,
    clearError: () => setError(null),
  };
};
