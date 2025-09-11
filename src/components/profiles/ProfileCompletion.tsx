import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  CheckCircle,
  Circle,
  ArrowRight,
  User,
  Camera,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  Globe,
  MessageSquare,
} from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';

interface ProfileCompletionProps {
  userId: string;
  onCompleteAction?: (action: string) => void;
  showActions?: boolean;
}

export const ProfileCompletion: React.FC<ProfileCompletionProps> = ({
  userId,
  onCompleteAction,
  showActions = true,
}) => {
  const { profile, completionPercentage, completionSuggestions } =
    useProfile(userId);

  if (!profile) {
    return null;
  }

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getCompletionMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent! Your profile is nearly complete.';
    if (percentage >= 80) return 'Great job! Your profile looks professional.';
    if (percentage >= 60) return 'Good progress! A few more details will help.';
    if (percentage >= 40) return 'Getting there! Complete a few more sections.';
    return "Let's get started! Add some basic information.";
  };

  const getCompletionIcon = (percentage: number) => {
    if (percentage >= 80)
      return <CheckCircle className='w-5 h-5 text-green-600' />;
    if (percentage >= 60) return <Circle className='w-5 h-5 text-yellow-600' />;
    if (percentage >= 40) return <Circle className='w-5 h-5 text-orange-600' />;
    return <Circle className='w-5 h-5 text-red-600' />;
  };

  const getCompletionBadge = (percentage: number) => {
    if (percentage >= 90)
      return <Badge className='bg-green-100 text-green-800'>Complete</Badge>;
    if (percentage >= 80)
      return <Badge className='bg-blue-100 text-blue-800'>Professional</Badge>;
    if (percentage >= 60)
      return <Badge className='bg-yellow-100 text-yellow-800'>Good</Badge>;
    if (percentage >= 40)
      return (
        <Badge className='bg-orange-100 text-orange-800'>In Progress</Badge>
      );
    return <Badge className='bg-red-100 text-red-800'>Getting Started</Badge>;
  };

  const getSuggestionIcon = (suggestion: string) => {
    if (suggestion.includes('bio')) return <User className='w-4 h-4' />;
    if (suggestion.includes('picture') || suggestion.includes('avatar'))
      return <Camera className='w-4 h-4' />;
    if (suggestion.includes('university') || suggestion.includes('major'))
      return <GraduationCap className='w-4 h-4' />;
    if (suggestion.includes('institution') || suggestion.includes('department'))
      return <Briefcase className='w-4 h-4' />;
    if (suggestion.includes('skills')) return <Award className='w-4 h-4' />;
    if (suggestion.includes('interests'))
      return <BookOpen className='w-4 h-4' />;
    if (suggestion.includes('website')) return <Globe className='w-4 h-4' />;
    return <MessageSquare className='w-4 h-4' />;
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (onCompleteAction) {
      // Map suggestion to action
      if (suggestion.includes('bio')) {
        onCompleteAction('edit-bio');
      } else if (
        suggestion.includes('picture') ||
        suggestion.includes('avatar')
      ) {
        onCompleteAction('upload-avatar');
      } else if (
        suggestion.includes('university') ||
        suggestion.includes('major')
      ) {
        onCompleteAction('edit-education');
      } else if (
        suggestion.includes('institution') ||
        suggestion.includes('department')
      ) {
        onCompleteAction('edit-professional');
      } else if (suggestion.includes('skills')) {
        onCompleteAction('edit-skills');
      } else if (suggestion.includes('interests')) {
        onCompleteAction('edit-interests');
      } else if (suggestion.includes('website')) {
        onCompleteAction('edit-social-links');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2'>
            {getCompletionIcon(completionPercentage)}
            Profile Completion
          </CardTitle>
          {getCompletionBadge(completionPercentage)}
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Progress Bar */}
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Completion</span>
            <span
              className={`font-medium ${getCompletionColor(
                completionPercentage
              )}`}
            >
              {completionPercentage}%
            </span>
          </div>
          <Progress value={completionPercentage} className='h-2' />
        </div>

        {/* Completion Message */}
        <p className='text-sm text-muted-foreground'>
          {getCompletionMessage(completionPercentage)}
        </p>

        {/* Suggestions */}
        {completionSuggestions.length > 0 && (
          <div className='space-y-3'>
            <h4 className='text-sm font-medium'>Complete your profile:</h4>
            <div className='space-y-2'>
              {completionSuggestions.slice(0, 3).map((suggestion, index) => (
                <div
                  key={index}
                  className='flex items-center gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer'
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {getSuggestionIcon(suggestion)}
                  <span className='text-sm flex-1'>{suggestion}</span>
                  {showActions && (
                    <ArrowRight className='w-4 h-4 text-muted-foreground' />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {showActions && completionPercentage < 100 && (
          <div className='pt-2'>
            <Button
              variant='outline'
              size='sm'
              className='w-full'
              onClick={() => onCompleteAction?.('edit-profile')}
            >
              Complete Profile
              <ArrowRight className='w-4 h-4 ml-2' />
            </Button>
          </div>
        )}

        {/* Completion Stats */}
        <div className='pt-4 border-t'>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <div className='text-muted-foreground'>Profile Views</div>
              <div className='font-medium'>{profile.profileViews || 0}</div>
            </div>
            <div>
              <div className='text-muted-foreground'>Connections</div>
              <div className='font-medium'>{profile.connections || 0}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletion;
