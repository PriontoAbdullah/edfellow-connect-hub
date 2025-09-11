# 🎯 UI Visibility Strategy - EdFellow Connect Hub

## 📋 Overview

This document outlines the comprehensive strategy for showing/hiding UI elements based on user roles, profile completion status, and feature availability. This ensures users see only relevant features and are guided through the onboarding process.

## 🎭 User Roles & Permissions

### **Role Hierarchy:**

1. **Student** - Basic access, limited features
2. **Professor** - Enhanced access, mentorship features
3. **University** - Full access, administrative features

---

## 🚀 Progressive Disclosure Strategy

### **Phase 1: Onboarding (0-20% Complete)**

_Show only essential features to avoid overwhelming new users_

### **Phase 2: Core Features (20-60% Complete)**

_Reveal main functionality as users engage_

### **Phase 3: Advanced Features (60-100% Complete)**

_Full feature access for engaged users_

---

## 📊 Profile Completion Levels

### **Level 1: Basic (0-30%)**

- ✅ Account created
- ✅ Basic info (name, email, role)
- ❌ Profile incomplete

### **Level 2: Standard (30-70%)**

- ✅ Basic info complete
- ✅ Bio, interests, skills
- ✅ At least one portfolio item
- ❌ Missing advanced sections

### **Level 3: Complete (70-100%)**

- ✅ All profile sections filled
- ✅ Portfolio items added
- ✅ Privacy settings configured
- ✅ Profile verified (if applicable)

---

## 🎯 Feature Visibility Matrix

### **Landing Page & Public Areas**

| Feature             | Student   | Professor | University | Completion Required |
| ------------------- | --------- | --------- | ---------- | ------------------- |
| **Public Programs** | ✅ Always | ✅ Always | ✅ Always  | None                |
| **Public Posts**    | ✅ Always | ✅ Always | ✅ Always  | None                |
| **Statistics**      | ✅ Always | ✅ Always | ✅ Always  | None                |
| **Sign Up/Login**   | ✅ Always | ✅ Always | ✅ Always  | None                |

### **Dashboard Navigation**

| Feature            | Student     | Professor   | University  | Completion Required |
| ------------------ | ----------- | ----------- | ----------- | ------------------- |
| **Dashboard Home** | ✅ Always   | ✅ Always   | ✅ Always   | None                |
| **Profile**        | ✅ Always   | ✅ Always   | ✅ Always   | None                |
| **Feed**           | ✅ Level 1+ | ✅ Level 1+ | ✅ Level 1+ | Basic (30%)         |
| **Explore**        | ✅ Level 1+ | ✅ Level 1+ | ✅ Level 1+ | Basic (30%)         |
| **Groups**         | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Mentorship**     | ✅ Level 2+ | ✅ Level 2+ | ❌ Hidden   | Standard (50%)      |
| **Opportunities**  | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Analytics**      | ❌ Hidden   | ✅ Level 3+ | ✅ Level 3+ | Complete (70%)      |
| **Admin Panel**    | ❌ Hidden   | ❌ Hidden   | ✅ Level 3+ | Complete (70%)      |

### **Profile Features**

| Feature              | Student     | Professor   | University  | Completion Required |
| -------------------- | ----------- | ----------- | ----------- | ------------------- |
| **Basic Info**       | ✅ Always   | ✅ Always   | ✅ Always   | None                |
| **Bio & Interests**  | ✅ Level 1+ | ✅ Level 1+ | ✅ Level 1+ | Basic (30%)         |
| **Portfolio**        | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Work Experience**  | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Education**        | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Publications**     | ✅ Level 3+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Certifications**   | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Privacy Settings** | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Verification**     | ✅ Level 3+ | ✅ Level 3+ | ✅ Level 3+ | Complete (70%)      |

### **Feed & Social Features**

| Feature            | Student     | Professor   | University  | Completion Required |
| ------------------ | ----------- | ----------- | ----------- | ------------------- |
| **View Posts**     | ✅ Level 1+ | ✅ Level 1+ | ✅ Level 1+ | Basic (30%)         |
| **Create Posts**   | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Like/Comment**   | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Share Posts**    | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Media Upload**   | ✅ Level 3+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Post Analytics** | ❌ Hidden   | ✅ Level 3+ | ✅ Level 3+ | Complete (70%)      |

### **Networking Features**

| Feature                   | Student     | Professor   | University  | Completion Required |
| ------------------------- | ----------- | ----------- | ----------- | ------------------- |
| **View Profiles**         | ✅ Level 1+ | ✅ Level 1+ | ✅ Level 1+ | Basic (30%)         |
| **Send Connections**      | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Network Discovery**     | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Connection Management** | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Network Analytics**     | ❌ Hidden   | ✅ Level 3+ | ✅ Level 3+ | Complete (70%)      |

### **Study Groups**

| Feature              | Student     | Professor   | University  | Completion Required |
| -------------------- | ----------- | ----------- | ----------- | ------------------- |
| **View Groups**      | ✅ Level 1+ | ✅ Level 1+ | ✅ Level 1+ | Basic (30%)         |
| **Join Groups**      | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Create Groups**    | ✅ Level 3+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Group Management** | ❌ Hidden   | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Group Analytics**  | ❌ Hidden   | ✅ Level 3+ | ✅ Level 3+ | Complete (70%)      |

### **Mentorship Features**

| Feature                     | Student     | Professor   | University | Completion Required |
| --------------------------- | ----------- | ----------- | ---------- | ------------------- |
| **View Mentors**            | ✅ Level 2+ | ❌ Hidden   | ❌ Hidden  | Standard (50%)      |
| **Book Sessions**           | ✅ Level 3+ | ❌ Hidden   | ❌ Hidden  | Complete (70%)      |
| **Mentor Profile**          | ❌ Hidden   | ✅ Level 2+ | ❌ Hidden  | Standard (50%)      |
| **Availability Management** | ❌ Hidden   | ✅ Level 2+ | ❌ Hidden  | Standard (50%)      |
| **Session History**         | ✅ Level 3+ | ✅ Level 2+ | ❌ Hidden  | Standard (50%)      |
| **Payment Processing**      | ✅ Level 3+ | ✅ Level 2+ | ❌ Hidden  | Standard (50%)      |

### **Job Opportunities**

| Feature                 | Student     | Professor   | University  | Completion Required |
| ----------------------- | ----------- | ----------- | ----------- | ------------------- |
| **View Jobs**           | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Apply for Jobs**      | ✅ Level 3+ | ✅ Level 3+ | ✅ Level 3+ | Complete (70%)      |
| **Post Jobs**           | ❌ Hidden   | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Manage Applications** | ✅ Level 3+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Job Analytics**       | ❌ Hidden   | ✅ Level 3+ | ✅ Level 3+ | Complete (70%)      |

### **Notifications**

| Feature                    | Student     | Professor   | University  | Completion Required |
| -------------------------- | ----------- | ----------- | ----------- | ------------------- |
| **View Notifications**     | ✅ Level 1+ | ✅ Level 1+ | ✅ Level 1+ | Basic (30%)         |
| **Notification Settings**  | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Push Notifications**     | ✅ Level 2+ | ✅ Level 2+ | ✅ Level 2+ | Standard (50%)      |
| **Notification Analytics** | ❌ Hidden   | ✅ Level 3+ | ✅ Level 3+ | Complete (70%)      |

---

## 🎨 UI Component Visibility Rules

### **Navigation Components**

#### **Main Sidebar (AppSidebar.tsx)**

```typescript
const getVisibleMenuItems = (user: User, completionLevel: number) => {
  const baseItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home, always: true },
    { path: '/dashboard/profile', label: 'Profile', icon: User, always: true },
  ];

  if (completionLevel >= 1) {
    baseItems.push(
      { path: '/dashboard/feed', label: 'Feed', icon: MessageSquare },
      { path: '/dashboard/explore', label: 'Explore', icon: Search }
    );
  }

  if (completionLevel >= 2) {
    baseItems.push(
      { path: '/dashboard/groups', label: 'Groups', icon: Users },
      {
        path: '/dashboard/opportunities',
        label: 'Opportunities',
        icon: Briefcase,
      }
    );

    if (user.role === 'student' || user.role === 'professor') {
      baseItems.push({
        path: '/dashboard/mentorship',
        label: 'Mentorship',
        icon: GraduationCap,
      });
    }
  }

  if (completionLevel >= 3) {
    if (user.role === 'professor' || user.role === 'university') {
      baseItems.push({
        path: '/dashboard/analytics',
        label: 'Analytics',
        icon: BarChart,
      });
    }
  }

  if (user.role === 'university' && completionLevel >= 3) {
    baseItems.push({
      path: '/dashboard/admin',
      label: 'Admin',
      icon: Settings,
    });
  }

  return baseItems;
};
```

#### **Dashboard Header (DashboardHeader.tsx)**

```typescript
const getVisibleActions = (user: User, completionLevel: number) => {
  const actions = [
    { icon: Bell, onClick: handleNotificationClick, always: true },
    { icon: User, onClick: handleProfileClick, always: true },
  ];

  if (completionLevel >= 2) {
    actions.push(
      { icon: MessageCircle, onClick: handleMessagingClick },
      { icon: Users, onClick: handleNetworkClick }
    );
  }

  if (completionLevel >= 2) {
    actions.push({ icon: Search, onClick: handleOpportunitiesClick });
  }

  return actions;
};
```

### **Profile Components**

#### **Profile Tabs (Profile.tsx)**

```typescript
const getVisibleTabs = (user: User, completionLevel: number) => {
  const tabs = [
    { id: 'overview', label: 'Overview', always: true },
    { id: 'about', label: 'About', always: true },
  ];

  if (completionLevel >= 2) {
    tabs.push(
      { id: 'portfolio', label: 'Portfolio' },
      { id: 'experience', label: 'Experience' },
      { id: 'education', label: 'Education' }
    );
  }

  if (completionLevel >= 3) {
    tabs.push({ id: 'publications', label: 'Publications' });
  }

  if (completionLevel >= 2) {
    tabs.push({ id: 'settings', label: 'Settings' });
  }

  return tabs;
};
```

### **Feed Components**

#### **Create Post Button (CreatePost.tsx)**

```typescript
const shouldShowCreatePost = (completionLevel: number) => {
  return completionLevel >= 2;
};
```

#### **Post Actions (FeedPost.tsx)**

```typescript
const getVisibleActions = (completionLevel: number) => {
  const actions = ['view'];

  if (completionLevel >= 2) {
    actions.push('like', 'comment', 'share');
  }

  if (completionLevel >= 3) {
    actions.push('save', 'report');
  }

  return actions;
};
```

---

## 🚦 Onboarding Flow & Progressive Disclosure

### **Step 1: Account Creation (0-10%)**

**Visible Elements:**

- ✅ Sign up form
- ✅ Email verification
- ✅ Basic profile setup
- ❌ All other features hidden

**Hidden Elements:**

- ❌ Dashboard navigation
- ❌ Feed access
- ❌ Social features
- ❌ Advanced settings

### **Step 2: Basic Profile (10-30%)**

**Visible Elements:**

- ✅ Profile completion prompts
- ✅ Basic dashboard
- ✅ Feed (read-only)
- ✅ Explore page (view-only)
- ❌ Social interactions

**Hidden Elements:**

- ❌ Post creation
- ❌ Connection requests
- ❌ Group joining
- ❌ Mentorship features

### **Step 3: Social Engagement (30-50%)**

**Visible Elements:**

- ✅ Post creation
- ✅ Like/comment functionality
- ✅ Connection requests
- ✅ Group joining
- ✅ Basic mentorship viewing

**Hidden Elements:**

- ❌ Group creation
- ❌ Mentorship booking
- ❌ Job applications
- ❌ Advanced analytics

### **Step 4: Full Participation (50-70%)**

**Visible Elements:**

- ✅ All social features
- ✅ Group creation (professors/universities)
- ✅ Mentorship booking
- ✅ Job applications
- ✅ Advanced profile sections

**Hidden Elements:**

- ❌ Analytics (students)
- ❌ Admin features
- ❌ Advanced settings

### **Step 5: Power User (70-100%)**

**Visible Elements:**

- ✅ All features based on role
- ✅ Analytics and insights
- ✅ Advanced settings
- ✅ Admin panel (universities)

---

## 🎯 Implementation Strategy

### **1. Profile Completion Tracking**

#### **Completion Calculation**

```typescript
const calculateProfileCompletion = (user: UserData): number => {
  const sections = [
    { weight: 20, completed: !!user.bio },
    { weight: 15, completed: !!user.academicInterests?.length },
    { weight: 15, completed: !!user.skills?.length },
    { weight: 10, completed: !!user.workExperience?.length },
    { weight: 10, completed: !!user.education?.length },
    { weight: 10, completed: !!user.certifications?.length },
    { weight: 10, completed: !!user.projects?.length },
    { weight: 5, completed: !!user.publications?.length },
    { weight: 5, completed: !!user.privacySettings },
  ];

  const totalWeight = sections.reduce(
    (sum, section) => sum + section.weight,
    0
  );
  const completedWeight = sections.reduce(
    (sum, section) => sum + (section.completed ? section.weight : 0),
    0
  );

  return Math.round((completedWeight / totalWeight) * 100);
};
```

#### **Completion Level Mapping**

```typescript
const getCompletionLevel = (completion: number): number => {
  if (completion < 30) return 1; // Basic
  if (completion < 70) return 2; // Standard
  return 3; // Complete
};
```

### **2. Component Visibility Hooks**

#### **useFeatureVisibility Hook**

```typescript
export const useFeatureVisibility = () => {
  const { user, userData } = useAuth();
  const completionLevel = getCompletionLevel(
    calculateProfileCompletion(userData)
  );

  const isFeatureVisible = (feature: string, role?: string): boolean => {
    const featureConfig = FEATURE_VISIBILITY_MATRIX[feature];
    if (!featureConfig) return false;

    // Check role requirement
    if (
      role &&
      featureConfig.roles &&
      !featureConfig.roles.includes(user.role)
    ) {
      return false;
    }

    // Check completion requirement
    if (featureConfig.completionRequired > completionLevel) {
      return false;
    }

    return true;
  };

  const getVisibleFeatures = (category: string) => {
    return Object.entries(FEATURE_VISIBILITY_MATRIX)
      .filter(
        ([feature, config]) =>
          config.category === category && isFeatureVisible(feature)
      )
      .map(([feature]) => feature);
  };

  return {
    completionLevel,
    isFeatureVisible,
    getVisibleFeatures,
    userRole: user.role,
  };
};
```

### **3. Conditional Rendering Components**

#### **FeatureGate Component**

```typescript
interface FeatureGateProps {
  feature: string;
  role?: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({
  feature,
  role,
  fallback = null,
  children,
}) => {
  const { isFeatureVisible } = useFeatureVisibility();

  if (!isFeatureVisible(feature, role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
```

#### **Usage Example**

```typescript
// In a component
<FeatureGate feature="mentorship" role="student">
  <MentorshipSection />
</FeatureGate>

<FeatureGate
  feature="analytics"
  fallback={<UpgradePrompt />}
>
  <AnalyticsDashboard />
</FeatureGate>
```

### **4. Navigation Component Updates**

#### **AppSidebar with Visibility**

```typescript
export const AppSidebar: React.FC<AppSidebarProps> = ({ user, onLogout }) => {
  const { completionLevel, isFeatureVisible } = useFeatureVisibility();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home, always: true },
    { path: '/dashboard/profile', label: 'Profile', icon: User, always: true },
  ];

  // Add conditional menu items
  if (isFeatureVisible('feed')) {
    menuItems.push({
      path: '/dashboard/feed',
      label: 'Feed',
      icon: MessageSquare,
    });
  }

  if (isFeatureVisible('groups')) {
    menuItems.push({ path: '/dashboard/groups', label: 'Groups', icon: Users });
  }

  if (isFeatureVisible('mentorship', user.role)) {
    menuItems.push({
      path: '/dashboard/mentorship',
      label: 'Mentorship',
      icon: GraduationCap,
    });
  }

  if (isFeatureVisible('analytics', user.role)) {
    menuItems.push({
      path: '/dashboard/analytics',
      label: 'Analytics',
      icon: BarChart,
    });
  }

  return (
    <nav className='sidebar'>
      {menuItems.map((item) => (
        <NavItem key={item.path} {...item} />
      ))}
    </nav>
  );
};
```

---

## 🎨 Visual Indicators & Prompts

### **Completion Progress Bar**

```typescript
const ProfileCompletionBar: React.FC = () => {
  const { userData } = useAuth();
  const completion = calculateProfileCompletion(userData);
  const level = getCompletionLevel(completion);

  return (
    <div className='completion-bar'>
      <div className='progress'>
        <div className='progress-fill' style={{ width: `${completion}%` }} />
      </div>
      <span className='completion-text'>Profile {completion}% Complete</span>
      {level < 3 && (
        <Button variant='outline' size='sm'>
          Complete Profile
        </Button>
      )}
    </div>
  );
};
```

### **Feature Unlock Prompts**

```typescript
const FeatureUnlockPrompt: React.FC<{ feature: string }> = ({ feature }) => {
  const { completionLevel } = useFeatureVisibility();
  const featureConfig = FEATURE_VISIBILITY_MATRIX[feature];

  return (
    <div className='unlock-prompt'>
      <Lock className='w-8 h-8 text-muted-foreground' />
      <h3>Unlock {featureConfig.name}</h3>
      <p>
        Complete {featureConfig.completionRequired * 10}% of your profile to
        access this feature.
      </p>
      <Button onClick={() => navigate('/dashboard/profile')}>
        Complete Profile
      </Button>
    </div>
  );
};
```

### **Role-Based Feature Badges**

```typescript
const RoleBadge: React.FC<{ role: string }> = ({ role }) => {
  const roleConfig = {
    student: { color: 'blue', icon: GraduationCap, label: 'Student' },
    professor: { color: 'green', icon: UserCheck, label: 'Professor' },
    university: { color: 'purple', icon: Building, label: 'University' },
  };

  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <Badge variant='secondary' className={`role-badge role-${config.color}`}>
      <Icon className='w-3 h-3 mr-1' />
      {config.label}
    </Badge>
  );
};
```

---

## 📱 Mobile Responsiveness

### **Mobile Navigation**

- **Collapsible sidebar** with role-based menu items
- **Bottom navigation** for primary features
- **Swipe gestures** for feature discovery
- **Progressive disclosure** in mobile modals

### **Touch-Friendly Prompts**

- **Large touch targets** for completion prompts
- **Swipe-to-complete** profile sections
- **Gesture-based** feature unlocking
- **Haptic feedback** for interactions

---

## 🎯 Success Metrics

### **User Engagement Metrics**

- **Profile completion rate** by role
- **Feature adoption rate** by completion level
- **Time to first meaningful action**
- **User retention** by completion level

### **Feature Usage Metrics**

- **Feature discovery rate** (how many users find hidden features)
- **Completion prompt effectiveness**
- **Role-based feature usage**
- **Progressive disclosure impact**

### **User Experience Metrics**

- **Onboarding completion rate**
- **User satisfaction** by completion level
- **Support ticket reduction**
- **Feature request patterns**

---

## 🚀 Implementation Priority

### **Phase 1: Core Visibility (Week 1)**

1. ✅ Profile completion tracking
2. ✅ Basic feature gating
3. ✅ Navigation visibility
4. ✅ Completion progress bar

### **Phase 2: Advanced Features (Week 2)**

1. ✅ Role-based permissions
2. ✅ Progressive disclosure
3. ✅ Feature unlock prompts
4. ✅ Mobile responsiveness

### **Phase 3: Polish & Analytics (Week 3)**

1. ✅ Visual indicators
2. ✅ User experience optimization
3. ✅ Analytics integration
4. ✅ A/B testing setup

---

## 🎯 Ready to Implement?

The UI visibility strategy is complete and ready for implementation. This will ensure:

- ✅ **Users see only relevant features** based on their role and progress
- ✅ **Progressive disclosure** guides users through onboarding
- ✅ **Role-based permissions** provide appropriate access levels
- ✅ **Completion tracking** motivates profile completion
- ✅ **Mobile-friendly** responsive design

**Next Steps:**

1. **Implement the completion tracking system**
2. **Create the FeatureGate component**
3. **Update navigation components**
4. **Add visual indicators and prompts**
5. **Test with different user roles and completion levels**

This strategy will significantly improve user experience and guide users toward full platform engagement! 🚀
