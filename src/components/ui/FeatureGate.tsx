import React from 'react';
import { useFeatureGate } from '../../hooks/useFeatureVisibility';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import {
  Lock,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Crown,
  User,
  GraduationCap,
  Building,
} from 'lucide-react';

interface FeatureGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireCompletion?: boolean;
  requireRole?: boolean;
  requireOnboarding?: boolean;
  showUpgradePrompt?: boolean;
  className?: string;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({
  feature,
  children,
  fallback,
  requireCompletion = false,
  requireRole = false,
  requireOnboarding = false,
  showUpgradePrompt = true,
  className = '',
}) => {
  const visibility = useFeatureGate(feature, {
    requireCompletion,
    requireRole,
    requireOnboarding,
  });

  if (visibility.isVisible) {
    return <div className={className}>{children}</div>;
  }

  if (fallback) {
    return <div className={className}>{fallback}</div>;
  }

  if (!showUpgradePrompt) {
    return null;
  }

  return (
    <div className={className}>
      <FeatureUpgradePrompt
        feature={feature}
        reason={visibility.reason}
        requiresUpgrade={visibility.requiresUpgrade}
        completionLevel={visibility.completionLevel}
      />
    </div>
  );
};

// Feature Upgrade Prompt Component
interface FeatureUpgradePromptProps {
  feature: string;
  reason?: string;
  requiresUpgrade?: boolean;
  completionLevel?: 'basic' | 'standard' | 'complete';
}

const FeatureUpgradePrompt: React.FC<FeatureUpgradePromptProps> = ({
  feature,
  reason,
  requiresUpgrade,
  completionLevel,
}) => {
  const getFeatureIcon = (feature: string) => {
    if (feature.includes('certification'))
      return <CheckCircle className='w-5 h-5' />;
    if (feature.includes('publication')) return <Star className='w-5 h-5' />;
    if (feature.includes('project')) return <ArrowRight className='w-5 h-5' />;
    if (feature.includes('portfolio')) return <Crown className='w-5 h-5' />;
    if (feature.includes('verification'))
      return <CheckCircle className='w-5 h-5' />;
    return <Lock className='w-5 h-5' />;
  };

  const getCompletionBadge = (level?: string) => {
    switch (level) {
      case 'basic':
        return <Badge className='bg-blue-100 text-blue-800'>Basic</Badge>;
      case 'standard':
        return <Badge className='bg-green-100 text-green-800'>Standard</Badge>;
      case 'complete':
        return (
          <Badge className='bg-purple-100 text-purple-800'>Complete</Badge>
        );
      default:
        return null;
    }
  };

  const getUpgradeMessage = (feature: string, completionLevel?: string) => {
    if (feature.includes('certification')) {
      return 'Add your certifications to showcase your professional credentials';
    }
    if (feature.includes('publication')) {
      return 'Share your research publications to demonstrate your expertise';
    }
    if (feature.includes('project')) {
      return 'Showcase your projects to highlight your skills and experience';
    }
    if (feature.includes('portfolio')) {
      return 'Create a comprehensive portfolio to stand out to potential connections';
    }
    if (feature.includes('verification')) {
      return 'Get your profile verified to build trust and credibility';
    }

    if (completionLevel === 'basic') {
      return 'Complete more profile sections to unlock this feature';
    }
    if (completionLevel === 'standard') {
      return 'Add advanced profile sections to access this feature';
    }

    return 'Complete your profile to access this feature';
  };

  return (
    <Card className='border-dashed border-2 border-muted-foreground/25'>
      <CardContent className='p-6 text-center'>
        <div className='flex justify-center mb-4'>
          <div className='w-12 h-12 bg-muted rounded-full flex items-center justify-center'>
            {getFeatureIcon(feature)}
          </div>
        </div>

        <h3 className='font-semibold mb-2'>Feature Locked</h3>

        {reason && (
          <p className='text-sm text-muted-foreground mb-4'>{reason}</p>
        )}

        <p className='text-sm text-muted-foreground mb-4'>
          {getUpgradeMessage(feature, completionLevel)}
        </p>

        {completionLevel && (
          <div className='flex justify-center mb-4'>
            {getCompletionBadge(completionLevel)}
          </div>
        )}

        {requiresUpgrade && (
          <Button className='w-full'>
            <ArrowRight className='w-4 h-4 mr-2' />
            Complete Profile
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// Role-based Feature Gate
interface RoleFeatureGateProps {
  allowedRoles: ('student' | 'professor' | 'university')[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export const RoleFeatureGate: React.FC<RoleFeatureGateProps> = ({
  allowedRoles,
  children,
  fallback,
  className = '',
}) => {
  const { userRole } = useFeatureVisibility();

  if (!userRole || !allowedRoles.includes(userRole)) {
    if (fallback) {
      return <div className={className}>{fallback}</div>;
    }

    return (
      <div className={className}>
        <RoleRestrictedPrompt allowedRoles={allowedRoles} />
      </div>
    );
  }

  return <div className={className}>{children}</div>;
};

// Role Restricted Prompt Component
const RoleRestrictedPrompt: React.FC<{
  allowedRoles: ('student' | 'professor' | 'university')[];
}> = ({ allowedRoles }) => {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <User className='w-4 h-4' />;
      case 'professor':
        return <GraduationCap className='w-4 h-4' />;
      case 'university':
        return <Building className='w-4 h-4' />;
      default:
        return <Lock className='w-4 h-4' />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'professor':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'university':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className='border-dashed border-2 border-muted-foreground/25'>
      <CardContent className='p-6 text-center'>
        <div className='flex justify-center mb-4'>
          <div className='w-12 h-12 bg-muted rounded-full flex items-center justify-center'>
            <Lock className='w-5 h-5' />
          </div>
        </div>

        <h3 className='font-semibold mb-2'>Role Restricted</h3>

        <p className='text-sm text-muted-foreground mb-4'>
          This feature is only available for:
        </p>

        <div className='flex justify-center gap-2 mb-4'>
          {allowedRoles.map((role) => (
            <Badge key={role} className={getRoleColor(role)}>
              {getRoleIcon(role)}
              <span className='ml-1 capitalize'>{role}s</span>
            </Badge>
          ))}
        </div>

        <p className='text-xs text-muted-foreground'>
          Contact support if you believe this is an error
        </p>
      </CardContent>
    </Card>
  );
};

// Completion Level Gate
interface CompletionLevelGateProps {
  requiredLevel: 'basic' | 'standard' | 'complete';
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export const CompletionLevelGate: React.FC<CompletionLevelGateProps> = ({
  requiredLevel,
  children,
  fallback,
  className = '',
}) => {
  const { completionLevel } = useFeatureVisibility();

  const levelOrder = { basic: 1, standard: 2, complete: 3 };
  const currentLevel = levelOrder[completionLevel];
  const requiredLevelNum = levelOrder[requiredLevel];

  if (currentLevel >= requiredLevelNum) {
    return <div className={className}>{children}</div>;
  }

  if (fallback) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div className={className}>
      <CompletionUpgradePrompt
        currentLevel={completionLevel}
        requiredLevel={requiredLevel}
      />
    </div>
  );
};

// Completion Upgrade Prompt Component
const CompletionUpgradePrompt: React.FC<{
  currentLevel: 'basic' | 'standard' | 'complete';
  requiredLevel: 'basic' | 'standard' | 'complete';
}> = ({ currentLevel, requiredLevel }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'basic':
        return 'bg-blue-100 text-blue-800';
      case 'standard':
        return 'bg-green-100 text-green-800';
      case 'complete':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUpgradeSteps = (current: string, required: string) => {
    if (current === 'basic' && required === 'standard') {
      return [
        'Add your skills and expertise',
        'Include your academic interests',
        'Add your education history',
        'Add work experience',
      ];
    }
    if (current === 'basic' && required === 'complete') {
      return [
        'Complete basic profile information',
        'Add skills and academic interests',
        'Include education and work experience',
        'Add certifications and projects',
        'Create a comprehensive portfolio',
      ];
    }
    if (current === 'standard' && required === 'complete') {
      return [
        'Add your certifications',
        'Include your publications',
        'Showcase your projects',
        'Create a detailed portfolio',
      ];
    }
    return [];
  };

  const steps = getUpgradeSteps(currentLevel, requiredLevel);

  return (
    <Card className='border-dashed border-2 border-muted-foreground/25'>
      <CardContent className='p-6'>
        <div className='text-center mb-4'>
          <div className='flex justify-center mb-2'>
            <div className='w-12 h-12 bg-muted rounded-full flex items-center justify-center'>
              <AlertCircle className='w-5 h-5' />
            </div>
          </div>

          <h3 className='font-semibold mb-2'>Profile Level Required</h3>

          <div className='flex justify-center gap-2 mb-4'>
            <Badge className={getLevelColor(currentLevel)}>
              Current:{' '}
              {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
            </Badge>
            <Badge className={getLevelColor(requiredLevel)}>
              Required:{' '}
              {requiredLevel.charAt(0).toUpperCase() + requiredLevel.slice(1)}
            </Badge>
          </div>
        </div>

        {steps.length > 0 && (
          <div className='space-y-2'>
            <p className='text-sm font-medium'>Complete these steps:</p>
            <ul className='space-y-1'>
              {steps.map((step, index) => (
                <li
                  key={index}
                  className='text-sm text-muted-foreground flex items-center gap-2'
                >
                  <div className='w-1.5 h-1.5 bg-muted-foreground rounded-full' />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button className='w-full mt-4'>
          <ArrowRight className='w-4 h-4 mr-2' />
          Upgrade Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureGate;
