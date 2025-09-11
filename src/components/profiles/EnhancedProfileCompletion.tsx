import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle,
  Circle,
  AlertCircle,
  Star,
  Users,
  Eye,
  Award,
  FileText,
  Camera,
  Globe,
  Briefcase,
  GraduationCap,
  BookOpen,
  MessageSquare,
} from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface EnhancedProfileCompletionProps {
  userId: string;
  onCompleteAction?: (action: string) => void;
  showActions?: boolean;
  compact?: boolean;
}

interface CompletionItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  weight: number;
  completed: boolean;
  required: boolean;
  category: 'basic' | 'professional' | 'social' | 'academic';
}

export const EnhancedProfileCompletion: React.FC<
  EnhancedProfileCompletionProps
> = ({ userId, onCompleteAction, showActions = true, compact = false }) => {
  const { profile, completionPercentage, completionSuggestions } =
    useProfile(userId);
  const { user } = useAuth();
  const [completionItems, setCompletionItems] = useState<CompletionItem[]>([]);
  const [categoryProgress, setCategoryProgress] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    if (profile) {
      const items = generateCompletionItems(profile);
      setCompletionItems(items);

      // Calculate category progress
      const categories = ['basic', 'professional', 'social', 'academic'];
      const categoryProg: Record<string, number> = {};

      categories.forEach((category) => {
        const categoryItems = items.filter(
          (item) => item.category === category
        );
        const completed = categoryItems.filter((item) => item.completed).length;
        categoryProg[category] =
          categoryItems.length > 0
            ? (completed / categoryItems.length) * 100
            : 0;
      });

      setCategoryProgress(categoryProg);
    }
  }, [profile]);

  const generateCompletionItems = (profileData: any): CompletionItem[] => {
    const items: CompletionItem[] = [
      // Basic Information
      {
        id: 'avatar',
        title: 'Profile Photo',
        description: 'Add a professional profile picture',
        icon: <Camera className='w-4 h-4' />,
        weight: 10,
        completed: !!profileData.avatar,
        required: true,
        category: 'basic',
      },
      {
        id: 'bio',
        title: 'Bio',
        description: 'Write a compelling bio (50+ characters)',
        icon: <FileText className='w-4 h-4' />,
        weight: 15,
        completed: profileData.bio && profileData.bio.length >= 50,
        required: true,
        category: 'basic',
      },
      {
        id: 'location',
        title: 'Location',
        description: 'Add your country and city',
        icon: <Globe className='w-4 h-4' />,
        weight: 10,
        completed: !!(profileData.country && profileData.city),
        required: true,
        category: 'basic',
      },

      // Professional Information
      {
        id: 'skills',
        title: 'Skills',
        description: 'List your key skills and expertise',
        icon: <Star className='w-4 h-4' />,
        weight: 15,
        completed: profileData.skills && profileData.skills.length > 0,
        required: true,
        category: 'professional',
      },
      {
        id: 'experience',
        title: 'Experience',
        description: 'Describe your work or academic experience',
        icon: <Briefcase className='w-4 h-4' />,
        weight: 20,
        completed:
          profileData.experience && profileData.experience.length >= 100,
        required: true,
        category: 'professional',
      },
      {
        id: 'education',
        title: 'Education',
        description: 'Add your educational background',
        icon: <GraduationCap className='w-4 h-4' />,
        weight: 15,
        completed:
          profileData.education &&
          Object.keys(profileData.education).length > 0,
        required: false,
        category: 'professional',
      },

      // Academic Information
      {
        id: 'academic_interests',
        title: 'Academic Interests',
        description: 'Specify your academic interests',
        icon: <BookOpen className='w-4 h-4' />,
        weight: 10,
        completed:
          profileData.academic_interests &&
          profileData.academic_interests.length > 0,
        required: profileData.role === 'student',
        category: 'academic',
      },
      {
        id: 'research_interests',
        title: 'Research Interests',
        description: 'Add your research focus areas',
        icon: <BookOpen className='w-4 h-4' />,
        weight: 10,
        completed:
          profileData.research_interests &&
          profileData.research_interests.length > 0,
        required: profileData.role === 'professor',
        category: 'academic',
      },
      {
        id: 'publications',
        title: 'Publications',
        description: 'List your academic publications',
        icon: <FileText className='w-4 h-4' />,
        weight: 15,
        completed:
          profileData.publications &&
          Object.keys(profileData.publications).length > 0,
        required: false,
        category: 'academic',
      },

      // Social Information
      {
        id: 'social_links',
        title: 'Social Links',
        description: 'Connect your professional profiles',
        icon: <Globe className='w-4 h-4' />,
        weight: 10,
        completed:
          profileData.social_links &&
          Object.keys(profileData.social_links).length > 0,
        required: false,
        category: 'social',
      },
      {
        id: 'languages',
        title: 'Languages',
        description: 'List languages you speak',
        icon: <MessageSquare className='w-4 h-4' />,
        weight: 5,
        completed: profileData.languages && profileData.languages.length > 0,
        required: false,
        category: 'social',
      },
    ];

    // Add role-specific items
    if (profileData.role === 'professor') {
      items.push({
        id: 'subjects_taught',
        title: 'Subjects Taught',
        description: 'List subjects you teach',
        icon: <BookOpen className='w-4 h-4' />,
        weight: 10,
        completed:
          profileData.subjects_taught && profileData.subjects_taught.length > 0,
        required: true,
        category: 'academic',
      });
    }

    if (profileData.role === 'university') {
      items.push({
        id: 'website_url',
        title: 'University Website',
        description: "Add your institution's website",
        icon: <Globe className='w-4 h-4' />,
        weight: 10,
        completed: !!profileData.website_url,
        required: true,
        category: 'professional',
      });
    }

    return items;
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompletionMessage = (percentage: number) => {
    if (percentage >= 90)
      return 'Excellent! Your profile is complete and professional.';
    if (percentage >= 70) return 'Great job! Your profile looks professional.';
    if (percentage >= 50) return 'Good progress! A few more details will help.';
    if (percentage >= 30) return 'Getting there! Complete a few more sections.';
    return "Let's get started! Add some basic information.";
  };

  const getCompletionBadge = (percentage: number) => {
    if (percentage >= 90)
      return <Badge className='bg-green-100 text-green-800'>Complete</Badge>;
    if (percentage >= 70)
      return <Badge className='bg-blue-100 text-blue-800'>Professional</Badge>;
    if (percentage >= 50)
      return <Badge className='bg-yellow-100 text-yellow-800'>Good</Badge>;
    if (percentage >= 30)
      return (
        <Badge className='bg-orange-100 text-orange-800'>In Progress</Badge>
      );
    return <Badge className='bg-red-100 text-red-800'>Getting Started</Badge>;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basic':
        return <User className='w-4 h-4' />;
      case 'professional':
        return <Briefcase className='w-4 h-4' />;
      case 'academic':
        return <GraduationCap className='w-4 h-4' />;
      case 'social':
        return <Users className='w-4 h-4' />;
      default:
        return <Circle className='w-4 h-4' />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'basic':
        return 'Basic Information';
      case 'professional':
        return 'Professional Details';
      case 'academic':
        return 'Academic Information';
      case 'social':
        return 'Social & Links';
      default:
        return category;
    }
  };

  const incompleteRequiredItems = completionItems.filter(
    (item) => item.required && !item.completed
  );
  const incompleteOptionalItems = completionItems.filter(
    (item) => !item.required && !item.completed
  );

  if (!profile) {
    return null;
  }

  if (compact) {
    return (
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium'>Profile Completion</h3>
          <div className='flex items-center gap-2'>
            <span
              className={`text-sm font-medium ${getCompletionColor(
                completionPercentage
              )}`}
            >
              {completionPercentage}%
            </span>
            {getCompletionBadge(completionPercentage)}
          </div>
        </div>
        <Progress value={completionPercentage} className='h-2' />
        <p className='text-xs text-muted-foreground'>
          {getCompletionMessage(completionPercentage)}
        </p>
        {showActions && completionPercentage < 70 && (
          <Button size='sm' className='w-full' asChild>
            <Link to={`/profile/${userId}?edit=true`}>Complete Profile</Link>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-lg'>Profile Completion</CardTitle>
            <div className='flex items-center gap-2'>
              <span
                className={`text-2xl font-bold ${getCompletionColor(
                  completionPercentage
                )}`}
              >
                {completionPercentage}%
              </span>
              {getCompletionBadge(completionPercentage)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className='h-3 mb-4' />
          <p className='text-sm text-muted-foreground mb-4'>
            {getCompletionMessage(completionPercentage)}
          </p>

          {/* Quick Stats */}
          <div className='grid grid-cols-3 gap-4 text-center'>
            <div>
              <div className='text-2xl font-bold text-blue-600'>
                {completionItems.filter((item) => item.completed).length}
              </div>
              <div className='text-xs text-muted-foreground'>Completed</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-orange-600'>
                {incompleteRequiredItems.length}
              </div>
              <div className='text-xs text-muted-foreground'>Required</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-gray-600'>
                {incompleteOptionalItems.length}
              </div>
              <div className='text-xs text-muted-foreground'>Optional</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Progress */}
      <div className='grid grid-cols-2 gap-4'>
        {Object.entries(categoryProgress).map(([category, progress]) => (
          <Card key={category}>
            <CardContent className='p-4'>
              <div className='flex items-center gap-2 mb-2'>
                {getCategoryIcon(category)}
                <span className='text-sm font-medium'>
                  {getCategoryName(category)}
                </span>
              </div>
              <Progress value={progress} className='h-2 mb-2' />
              <span className='text-xs text-muted-foreground'>
                {Math.round(progress)}% complete
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Completion Items */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Profile Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {completionItems.map((item) => (
              <div
                key={item.id}
                className='flex items-center gap-3 p-3 rounded-lg border'
              >
                <div
                  className={`p-2 rounded-full ${
                    item.completed
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle className='w-4 h-4' />
                  ) : (
                    item.icon
                  )}
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-2'>
                    <h4 className='font-medium'>{item.title}</h4>
                    {item.required && (
                      <Badge variant='outline' className='text-xs'>
                        Required
                      </Badge>
                    )}
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {item.description}
                  </p>
                </div>
                <div className='text-right'>
                  <div className='text-sm font-medium'>{item.weight} pts</div>
                  <div className='text-xs text-muted-foreground'>
                    {item.completed ? 'Complete' : 'Incomplete'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {showActions && (
        <div className='flex gap-3'>
          <Button asChild className='flex-1'>
            <Link to={`/profile/${userId}?edit=true`}>
              {completionPercentage < 50 ? 'Complete Profile' : 'Edit Profile'}
            </Link>
          </Button>
          {completionPercentage >= 70 && (
            <Button
              variant='outline'
              onClick={() => onCompleteAction?.('share')}
            >
              Share Profile
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
