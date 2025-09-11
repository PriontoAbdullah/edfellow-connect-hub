import { useAuth } from '../contexts/AuthContext';
import { UserData } from '../lib/auth';

export interface FeatureVisibilityConfig {
  // Profile completion levels
  basic: string[];
  standard: string[];
  complete: string[];

  // Role-based features
  student: string[];
  professor: string[];
  university: string[];

  // Progressive disclosure
  onboarding: string[];
  core: string[];
  advanced: string[];
}

export interface FeatureVisibilityResult {
  isVisible: boolean;
  reason?: string;
  requiresUpgrade?: boolean;
  completionLevel?: 'basic' | 'standard' | 'complete';
}

// Default feature visibility configuration
const DEFAULT_CONFIG: FeatureVisibilityConfig = {
  basic: [
    'profile-basic-info',
    'profile-avatar',
    'profile-bio',
    'profile-contact',
    'profile-location',
  ],
  standard: [
    'profile-skills',
    'profile-academic-interests',
    'profile-education',
    'profile-work-experience',
    'profile-languages',
    'profile-social-links',
  ],
  complete: [
    'profile-certifications',
    'profile-publications',
    'profile-projects',
    'profile-portfolio',
    'profile-privacy-settings',
    'profile-verification',
  ],
  student: [
    'profile-major',
    'profile-university',
    'profile-degree-level',
    'profile-academic-interests',
    'profile-mentorship-interests',
    'profile-portfolio',
  ],
  professor: [
    'profile-institution',
    'profile-department',
    'profile-position',
    'profile-subjects-taught',
    'profile-research-interests',
    'profile-publications',
    'profile-mentorship-interests',
  ],
  university: [
    'profile-official-name',
    'profile-website-url',
    'profile-contact-person',
    'profile-accreditation',
    'profile-areas-of-interest',
    'profile-programs',
  ],
  onboarding: [
    'profile-basic-info',
    'profile-avatar',
    'profile-bio',
    'profile-role-specific',
  ],
  core: [
    'profile-skills',
    'profile-education',
    'profile-work-experience',
    'profile-social-links',
    'profile-privacy-settings',
  ],
  advanced: [
    'profile-certifications',
    'profile-publications',
    'profile-projects',
    'profile-portfolio',
    'profile-verification',
    'profile-analytics',
  ],
};

export const useFeatureVisibility = (
  config: Partial<FeatureVisibilityConfig> = {}
) => {
  const { userData } = useAuth();

  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // Calculate profile completion level
  const getCompletionLevel = (
    userData: UserData | null
  ): 'basic' | 'standard' | 'complete' => {
    if (!userData) return 'basic';

    const basicFields = [
      'displayName',
      'firstName',
      'lastName',
      'bio',
      'country',
    ];
    const standardFields = [
      'skills',
      'academicInterests',
      'education',
      'workExperience',
    ];
    const completeFields = [
      'certifications',
      'publications',
      'projects',
      'portfolio',
    ];

    const basicComplete = basicFields.filter((field) => {
      const value = userData[field as keyof UserData];
      return (
        value &&
        (Array.isArray(value)
          ? value.length > 0
          : value.toString().trim() !== '')
      );
    }).length;

    const standardComplete = standardFields.filter((field) => {
      const value = userData[field as keyof UserData];
      return (
        value &&
        (Array.isArray(value)
          ? value.length > 0
          : value.toString().trim() !== '')
      );
    }).length;

    const completeComplete = completeFields.filter((field) => {
      const value = userData[field as keyof UserData];
      return (
        value &&
        (Array.isArray(value)
          ? value.length > 0
          : value.toString().trim() !== '')
      );
    }).length;

    if (completeComplete >= 3) return 'complete';
    if (standardComplete >= 2) return 'standard';
    return 'basic';
  };

  // Check if a feature is visible
  const isFeatureVisible = (
    feature: string,
    options: {
      requireCompletion?: boolean;
      requireRole?: boolean;
      requireOnboarding?: boolean;
    } = {}
  ): FeatureVisibilityResult => {
    if (!userData) {
      return {
        isVisible: false,
        reason: 'User not authenticated',
      };
    }

    const completionLevel = getCompletionLevel(userData);
    const userRole = userData.role;

    // Check completion level requirements
    if (options.requireCompletion) {
      const requiredLevel = mergedConfig.complete.includes(feature)
        ? 'complete'
        : mergedConfig.standard.includes(feature)
        ? 'standard'
        : 'basic';

      if (completionLevel === 'basic' && requiredLevel !== 'basic') {
        return {
          isVisible: false,
          reason: `Complete your profile to access ${feature}`,
          requiresUpgrade: true,
          completionLevel,
        };
      }

      if (completionLevel === 'standard' && requiredLevel === 'complete') {
        return {
          isVisible: false,
          reason: `Complete more profile sections to access ${feature}`,
          requiresUpgrade: true,
          completionLevel,
        };
      }
    }

    // Check role-based requirements
    if (options.requireRole) {
      const roleFeatures = mergedConfig[
        userRole as keyof FeatureVisibilityConfig
      ] as string[];
      if (!roleFeatures.includes(feature)) {
        return {
          isVisible: false,
          reason: `This feature is not available for ${userRole}s`,
        };
      }
    }

    // Check onboarding requirements
    if (options.requireOnboarding) {
      if (
        !userData.profileCompleted &&
        !mergedConfig.onboarding.includes(feature)
      ) {
        return {
          isVisible: false,
          reason: 'Complete onboarding to access this feature',
          requiresUpgrade: true,
        };
      }
    }

    return {
      isVisible: true,
      completionLevel,
    };
  };

  // Get all visible features for current user
  const getVisibleFeatures = (
    category?: keyof FeatureVisibilityConfig
  ): string[] => {
    if (!userData) return [];

    const completionLevel = getCompletionLevel(userData);
    const userRole = userData.role;

    let features: string[] = [];

    if (category) {
      features = mergedConfig[category] || [];
    } else {
      // Get all features based on completion level
      features = [
        ...mergedConfig.basic,
        ...(completionLevel === 'standard' || completionLevel === 'complete'
          ? mergedConfig.standard
          : []),
        ...(completionLevel === 'complete' ? mergedConfig.complete : []),
      ];
    }

    // Filter by role
    const roleFeatures = mergedConfig[
      userRole as keyof FeatureVisibilityConfig
    ] as string[];
    return features.filter((feature) => roleFeatures.includes(feature));
  };

  // Get features that require upgrade
  const getUpgradeRequiredFeatures = (): string[] => {
    if (!userData) return [];

    const completionLevel = getCompletionLevel(userData);
    const userRole = userData.role;

    let upgradeFeatures: string[] = [];

    if (completionLevel === 'basic') {
      upgradeFeatures = [...mergedConfig.standard, ...mergedConfig.complete];
    } else if (completionLevel === 'standard') {
      upgradeFeatures = mergedConfig.complete;
    }

    // Filter by role
    const roleFeatures = mergedConfig[
      userRole as keyof FeatureVisibilityConfig
    ] as string[];
    return upgradeFeatures.filter((feature) => roleFeatures.includes(feature));
  };

  // Get completion suggestions
  const getCompletionSuggestions = (): string[] => {
    if (!userData) return [];

    const completionLevel = getCompletionLevel(userData);
    const suggestions: string[] = [];

    if (completionLevel === 'basic') {
      if (!userData.skills || userData.skills.length === 0) {
        suggestions.push('Add your skills and expertise');
      }
      if (
        !userData.academicInterests ||
        userData.academicInterests.length === 0
      ) {
        suggestions.push('Add your academic interests');
      }
      if (!userData.education || userData.education.length === 0) {
        suggestions.push('Add your education history');
      }
    } else if (completionLevel === 'standard') {
      if (!userData.certifications || userData.certifications.length === 0) {
        suggestions.push('Add your certifications');
      }
      if (!userData.projects || userData.projects.length === 0) {
        suggestions.push('Add your projects');
      }
      if (!userData.portfolio || userData.portfolio.length === 0) {
        suggestions.push('Create your portfolio');
      }
    }

    return suggestions;
  };

  return {
    isFeatureVisible,
    getVisibleFeatures,
    getUpgradeRequiredFeatures,
    getCompletionSuggestions,
    completionLevel: getCompletionLevel(userData),
    userRole: userData?.role,
    isProfileCompleted: userData?.profileCompleted || false,
  };
};

// Hook for specific feature visibility checks
export const useFeatureGate = (
  feature: string,
  options?: {
    requireCompletion?: boolean;
    requireRole?: boolean;
    requireOnboarding?: boolean;
  }
) => {
  const { isFeatureVisible } = useFeatureVisibility();

  return isFeatureVisible(feature, options);
};

// Hook for getting user's accessible features
export const useUserFeatures = () => {
  const {
    getVisibleFeatures,
    getUpgradeRequiredFeatures,
    getCompletionSuggestions,
  } = useFeatureVisibility();

  return {
    visibleFeatures: getVisibleFeatures(),
    upgradeRequiredFeatures: getUpgradeRequiredFeatures(),
    completionSuggestions: getCompletionSuggestions(),
  };
};
