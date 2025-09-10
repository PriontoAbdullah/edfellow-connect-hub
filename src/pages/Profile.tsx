import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getCountryCode } from '@/lib/countries';
import { useAuth } from '@/contexts/AuthContext';
import {
  updateUserData,
  getUserData,
  UserData,
  PortfolioItem,
  PrivacySettings,
} from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Edit,
  Save,
  X,
  GraduationCap,
  Building,
  Globe,
  Star,
  Award,
  BookOpen,
  Users,
  MessageSquare,
  Eye,
  Plus,
  Briefcase,
  FileText,
  ExternalLink,
  Linkedin,
  Github,
  Twitter,
  Globe as GlobeIcon,
  Target,
  Lightbulb,
  Code,
  Database,
  Cloud,
  Shield,
  Zap,
  Heart,
  BookMarked,
  TrendingUp,
  Clock,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Trash2,
  Upload,
  Download,
  Lock,
  Unlock,
  Settings,
  Loader2,
  Image,
  Video,
  File,
  Link,
  Brain,
} from 'lucide-react';

// Extended user data interface
interface ExtendedUserData extends UserData {
  avatar?: string;
  portfolio?: PortfolioItem[];
  privacySettings?: PrivacySettings;
  profileViews?: number;
  connections?: number;
  endorsements?: number;
  address?: string;
  city?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  // Portfolio sections
  workExperience?: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    skills: string[];
  }>;
  education?: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    description?: string;
    courses?: string[];
  }>;
  certifications?: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    url?: string;
  }>;
  publications?: Array<{
    id: string;
    title: string;
    authors: string[];
    journal: string;
    publicationDate: string;
    doi?: string;
    abstract?: string;
    citations?: number;
  }>;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    status: 'completed' | 'in-progress' | 'planned';
  }>;
}

const Profile = () => {
  const { user, userData, refreshUserData } = useAuth();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [editingPortfolioItem, setEditingPortfolioItem] =
    useState<PortfolioItem | null>(null);

  // Modal states for different sections
  const [showWorkExperienceModal, setShowWorkExperienceModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showPublicationModal, setShowPublicationModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [showLanguagesModal, setShowLanguagesModal] = useState(false);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);

  // Editing states for different sections
  const [editingWorkExperience, setEditingWorkExperience] = useState<any>(null);
  const [editingEducation, setEditingEducation] = useState<any>(null);
  const [editingCertification, setEditingCertification] = useState<any>(null);
  const [editingPublication, setEditingPublication] = useState<any>(null);
  const [editingProject, setEditingProject] = useState<any>(null);

  const [expandedSections, setExpandedSections] = useState({
    about: true,
    experience: true,
    workExperience: true,
    education: true,
    skills: true,
    certifications: true,
    publications: true,
    projects: true,
    languages: true,
    interests: true,
    portfolio: true,
  });

  const [profileData, setProfileData] = useState<ExtendedUserData>(() => ({
    uid: '',
    email: '',
    displayName: '',
    role: 'student',
    firstName: '',
    lastName: '',
    country: '',
    createdAt: '',
    updatedAt: '',
    emailVerified: false,
    profileCompleted: false,
    // Portfolio data structure
    experience: '',
    skills: [],
    languages: [],
    academicInterests: [],
    mentorshipInterests: [],
    // Extended portfolio sections
    workExperience: [],
    education: [],
    certifications: [],
    publications: [],
    projects: [],
    socialLinks: {},
    portfolio: [],
    privacySettings: {
      profileVisibility: 'public',
      contactInfoVisibility: 'public',
      portfolioVisibility: 'public',
      academicInfoVisibility: 'public',
      experienceVisibility: 'public',
      allowMessages: true,
      allowConnectionRequests: true,
      showOnlineStatus: true,
    },
    profileViews: 0,
    connections: 0,
    endorsements: 0,
  }));

  // Load user data from AuthContext (no need to fetch again)
  useEffect(() => {
    if (!userData) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setProfileData({
        ...userData,
        // Portfolio data
        experience: userData.experience || '',
        skills: userData.skills || [],
        languages: userData.languages || [],
        academicInterests: userData.academicInterests || [],
        mentorshipInterests: userData.mentorshipInterests || [],
        // Extended portfolio sections
        workExperience: userData.workExperience || [],
        education: userData.education || [],
        certifications: userData.certifications || [],
        publications: userData.publications || [],
        projects: userData.projects || [],
        socialLinks: userData.socialLinks || {},
        portfolio: userData.portfolio || [],
        privacySettings: userData.privacySettings || {
          profileVisibility: 'public',
          contactInfoVisibility: 'public',
          portfolioVisibility: 'public',
          academicInfoVisibility: 'public',
          experienceVisibility: 'public',
          allowMessages: true,
          allowConnectionRequests: true,
          showOnlineStatus: true,
        },
        profileViews: userData.profileViews || 0,
        connections: userData.connections || 0,
        endorsements: userData.endorsements || 0,
      });
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [userData, toast]);

  const handleInputChange = (field: string, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrivacyChange = (field: keyof PrivacySettings, value: any) => {
    setProfileData((prev) => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings!,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to save changes.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await updateUserData(user.id, profileData);
      if (error) {
        throw error;
      }
      await refreshUserData();
      setIsEditing(false);
      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to save profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // CRUD operations for work experience
  const addWorkExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      skills: [],
    };
    setEditingWorkExperience(newExperience);
    setShowWorkExperienceModal(true);
  };

  const editWorkExperience = (experience: any) => {
    setEditingWorkExperience(experience);
    setShowWorkExperienceModal(true);
  };

  const saveWorkExperience = async (experience: any) => {
    setSavingSection('workExperience');
    try {
      // Optimistic update
      setProfileData((prev) => {
        const existingIndex =
          prev.workExperience?.findIndex((exp) => exp.id === experience.id) ??
          -1;
        if (existingIndex >= 0) {
          const updatedExperience = [...(prev.workExperience || [])];
          updatedExperience[existingIndex] = experience;
          return { ...prev, workExperience: updatedExperience };
        } else {
          return {
            ...prev,
            workExperience: [...(prev.workExperience || []), experience],
          };
        }
      });

      // Save to database
      if (user) {
        const { error } = await updateUserData(user.id, {
          workExperience: profileData.workExperience
            ?.map((exp) => (exp.id === experience.id ? experience : exp))
            .concat(
              profileData.workExperience?.find(
                (exp) => exp.id === experience.id
              )
                ? []
                : [experience]
            ),
        });

        if (error) {
          throw error;
        }
      }

      setShowWorkExperienceModal(false);
      setEditingWorkExperience(null);
      await refreshUserData(); // Refresh user data in context
      toast({
        title: 'Success',
        description: 'Work experience saved successfully!',
      });
    } catch (error) {
      console.error('Error saving work experience:', error);
      toast({
        title: 'Error',
        description: 'Failed to save work experience. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSavingSection(null);
    }
  };

  const deleteWorkExperience = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      workExperience: prev.workExperience?.filter((exp) => exp.id !== id) || [],
    }));
  };

  // CRUD operations for education
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
      courses: [],
    };
    setEditingEducation(newEducation);
    setShowEducationModal(true);
  };

  const editEducation = (education: any) => {
    setEditingEducation(education);
    setShowEducationModal(true);
  };

  const saveEducation = async (education: any) => {
    setSavingSection('education');
    try {
      // Optimistic update
      setProfileData((prev) => {
        const existingIndex =
          prev.education?.findIndex((edu) => edu.id === education.id) ?? -1;
        if (existingIndex >= 0) {
          const updatedEducation = [...(prev.education || [])];
          updatedEducation[existingIndex] = education;
          return { ...prev, education: updatedEducation };
        } else {
          return { ...prev, education: [...(prev.education || []), education] };
        }
      });

      // Save to database
      if (user) {
        const updatedEducation =
          profileData.education?.map((edu) =>
            edu.id === education.id ? education : edu
          ) || [];

        if (!profileData.education?.find((edu) => edu.id === education.id)) {
          updatedEducation.push(education);
        }

        const { error } = await updateUserData(user.id, {
          education: updatedEducation,
        });

        if (error) {
          throw error;
        }
      }

      setShowEducationModal(false);
      setEditingEducation(null);
      await refreshUserData(); // Refresh user data in context
      toast({
        title: 'Success',
        description: 'Education saved successfully!',
      });
    } catch (error) {
      console.error('Error saving education:', error);
      toast({
        title: 'Error',
        description: 'Failed to save education. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSavingSection(null);
    }
  };

  const deleteEducation = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education?.filter((edu) => edu.id !== id) || [],
    }));
  };

  // CRUD operations for certifications
  const addCertification = () => {
    const newCertification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      url: '',
    };
    setEditingCertification(newCertification);
    setShowCertificationModal(true);
  };

  const editCertification = (certification: any) => {
    setEditingCertification(certification);
    setShowCertificationModal(true);
  };

  const saveCertification = async (certification: any) => {
    setSavingSection('certification');
    try {
      // Optimistic update
      setProfileData((prev) => {
        const existingIndex =
          prev.certifications?.findIndex(
            (cert) => cert.id === certification.id
          ) ?? -1;
        if (existingIndex >= 0) {
          const updatedCertifications = [...(prev.certifications || [])];
          updatedCertifications[existingIndex] = certification;
          return { ...prev, certifications: updatedCertifications };
        } else {
          return {
            ...prev,
            certifications: [...(prev.certifications || []), certification],
          };
        }
      });

      // Save to database
      if (user) {
        const updatedCertifications =
          profileData.certifications?.map((cert) =>
            cert.id === certification.id ? certification : cert
          ) || [];

        if (
          !profileData.certifications?.find(
            (cert) => cert.id === certification.id
          )
        ) {
          updatedCertifications.push(certification);
        }

        const { error } = await updateUserData(user.id, {
          certifications: updatedCertifications,
        });

        if (error) {
          throw error;
        }
      }

      setShowCertificationModal(false);
      setEditingCertification(null);
      await refreshUserData(); // Refresh user data in context
      toast({
        title: 'Success',
        description: 'Certification saved successfully!',
      });
    } catch (error) {
      console.error('Error saving certification:', error);
      toast({
        title: 'Error',
        description: 'Failed to save certification. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSavingSection(null);
    }
  };

  const deleteCertification = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      certifications:
        prev.certifications?.filter((cert) => cert.id !== id) || [],
    }));
  };

  // CRUD operations for publications
  const addPublication = () => {
    const newPublication = {
      id: Date.now().toString(),
      title: '',
      authors: [],
      journal: '',
      publicationDate: '',
      doi: '',
      abstract: '',
      citations: 0,
    };
    setEditingPublication(newPublication);
    setShowPublicationModal(true);
  };

  const editPublication = (publication: any) => {
    setEditingPublication(publication);
    setShowPublicationModal(true);
  };

  const savePublication = async (publication: any) => {
    setSavingSection('publication');
    try {
      // Optimistic update
      setProfileData((prev) => {
        const existingIndex =
          prev.publications?.findIndex((pub) => pub.id === publication.id) ??
          -1;
        if (existingIndex >= 0) {
          const updatedPublications = [...(prev.publications || [])];
          updatedPublications[existingIndex] = publication;
          return { ...prev, publications: updatedPublications };
        } else {
          return {
            ...prev,
            publications: [...(prev.publications || []), publication],
          };
        }
      });

      // Save to database
      if (user) {
        const updatedPublications =
          profileData.publications?.map((pub) =>
            pub.id === publication.id ? publication : pub
          ) || [];

        if (
          !profileData.publications?.find((pub) => pub.id === publication.id)
        ) {
          updatedPublications.push(publication);
        }

        const { error } = await updateUserData(user.id, {
          publications: updatedPublications,
        });

        if (error) {
          throw error;
        }
      }

      setShowPublicationModal(false);
      setEditingPublication(null);
      await refreshUserData(); // Refresh user data in context
      toast({
        title: 'Success',
        description: 'Publication saved successfully!',
      });
    } catch (error) {
      console.error('Error saving publication:', error);
      toast({
        title: 'Error',
        description: 'Failed to save publication. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSavingSection(null);
    }
  };

  const deletePublication = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      publications: prev.publications?.filter((pub) => pub.id !== id) || [],
    }));
  };

  // CRUD operations for projects
  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      status: 'completed' as const,
    };
    setEditingProject(newProject);
    setShowProjectModal(true);
  };

  const editProject = (project: any) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const saveProject = async (project: any) => {
    setSavingSection('project');
    try {
      // Optimistic update
      setProfileData((prev) => {
        const existingIndex =
          prev.projects?.findIndex((proj) => proj.id === project.id) ?? -1;
        if (existingIndex >= 0) {
          const updatedProjects = [...(prev.projects || [])];
          updatedProjects[existingIndex] = project;
          return { ...prev, projects: updatedProjects };
        } else {
          return { ...prev, projects: [...(prev.projects || []), project] };
        }
      });

      // Save to database
      if (user) {
        const updatedProjects =
          profileData.projects?.map((proj) =>
            proj.id === project.id ? project : proj
          ) || [];

        if (!profileData.projects?.find((proj) => proj.id === project.id)) {
          updatedProjects.push(project);
        }

        const { error } = await updateUserData(user.id, {
          projects: updatedProjects,
        });

        if (error) {
          throw error;
        }
      }

      setShowProjectModal(false);
      setEditingProject(null);
      await refreshUserData(); // Refresh user data in context
      toast({
        title: 'Success',
        description: 'Project saved successfully!',
      });
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: 'Error',
        description: 'Failed to save project. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSavingSection(null);
    }
  };

  const deleteProject = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      projects: prev.projects?.filter((proj) => proj.id !== id) || [],
    }));
  };

  // CRUD operations for Skills
  const saveSkills = async (skills: string[]) => {
    setSavingSection('skills');
    try {
      // Optimistic update
      setProfileData((prev) => ({ ...prev, skills }));

      // Save to database
      if (user) {
        const { error } = await updateUserData(user.id, { skills });
        if (error) {
          throw error;
        }
      }

      setShowSkillsModal(false);
      await refreshUserData(); // Refresh user data in context
      toast({
        title: 'Success',
        description: 'Skills updated successfully!',
      });
    } catch (error) {
      console.error('Error saving skills:', error);
      toast({
        title: 'Error',
        description: 'Failed to save skills. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSavingSection(null);
    }
  };

  // CRUD operations for Academic Interests
  const saveAcademicInterests = async (interests: string[]) => {
    setSavingSection('academicInterests');
    try {
      // Optimistic update
      setProfileData((prev) => ({ ...prev, academicInterests: interests }));

      // Save to database
      if (user) {
        const { error } = await updateUserData(user.id, {
          academicInterests: interests,
        });
        if (error) {
          throw error;
        }
      }

      setShowInterestsModal(false);
      await refreshUserData(); // Refresh user data in context
      toast({
        title: 'Success',
        description: 'Academic interests updated successfully!',
      });
    } catch (error) {
      console.error('Error saving academic interests:', error);
      toast({
        title: 'Error',
        description: 'Failed to save academic interests. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSavingSection(null);
    }
  };

  // CRUD operations for Languages
  const saveLanguages = async (languages: string[]) => {
    setSavingSection('languages');
    try {
      // Optimistic update
      setProfileData((prev) => ({ ...prev, languages }));

      // Save to database
      if (user) {
        const { error } = await updateUserData(user.id, { languages });
        if (error) {
          throw error;
        }
      }

      setShowLanguagesModal(false);
      await refreshUserData(); // Refresh user data in context
      toast({
        title: 'Success',
        description: 'Languages updated successfully!',
      });
    } catch (error) {
      console.error('Error saving languages:', error);
      toast({
        title: 'Error',
        description: 'Failed to save languages. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSavingSection(null);
    }
  };

  // CRUD operations for Profile Information
  const saveProfileInfo = async (profileInfo: any) => {
    setSavingSection('profile');
    try {
      // Optimistic update
      setProfileData((prev) => ({ ...prev, ...profileInfo }));

      // Save to database
      if (user) {
        const { error } = await updateUserData(user.id, profileInfo);
        if (error) {
          throw error;
        }
      }

      setShowProfileEditModal(false);
      await refreshUserData(); // Refresh user data in context
      toast({
        title: 'Success',
        description: 'Profile information updated successfully!',
      });
    } catch (error) {
      console.error('Error saving profile info:', error);
      toast({
        title: 'Error',
        description: 'Failed to save profile information. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSavingSection(null);
    }
  };

  const handleCancel = () => {
    if (userData) {
      setProfileData({
        ...userData,
        // Portfolio data
        experience: userData.experience || '',
        skills: userData.skills || [],
        languages: userData.languages || [],
        academicInterests: userData.academicInterests || [],
        mentorshipInterests: userData.mentorshipInterests || [],
        // Extended portfolio sections
        workExperience: userData.workExperience || [],
        education: userData.education || [],
        certifications: userData.certifications || [],
        publications: userData.publications || [],
        projects: userData.projects || [],
        socialLinks: userData.socialLinks || {},
        portfolio: userData.portfolio || [],
        privacySettings: userData.privacySettings || {
          profileVisibility: 'public',
          contactInfoVisibility: 'public',
          portfolioVisibility: 'public',
          academicInfoVisibility: 'public',
          experienceVisibility: 'public',
          allowMessages: true,
          allowConnectionRequests: true,
          showOnlineStatus: true,
        },
        profileViews: userData.profileViews || 0,
        connections: userData.connections || 0,
        endorsements: userData.endorsements || 0,
      });
    }
    setIsEditing(false);
  };

  const addPortfolioItem = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: '',
      description: '',
      type: 'project',
      category: '',
      technologies: [],
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      isPublic: true,
    };
    setEditingPortfolioItem(newItem);
    setShowPortfolioModal(true);
  };

  const editPortfolioItem = (item: PortfolioItem) => {
    setEditingPortfolioItem(item);
    setShowPortfolioModal(true);
  };

  const deletePortfolioItem = (itemId: string) => {
    setProfileData((prev) => ({
      ...prev,
      portfolio: prev.portfolio?.filter((item) => item.id !== itemId) || [],
    }));
  };

  const savePortfolioItem = async (item: PortfolioItem) => {
    setSavingSection('portfolio');
    try {
      // Optimistic update
      setProfileData((prev) => {
        const existingIndex =
          prev.portfolio?.findIndex((p) => p.id === item.id) ?? -1;
        if (existingIndex >= 0) {
          const updatedPortfolio = [...(prev.portfolio || [])];
          updatedPortfolio[existingIndex] = item;
          return { ...prev, portfolio: updatedPortfolio };
        } else {
          return { ...prev, portfolio: [...(prev.portfolio || []), item] };
        }
      });

      // Save to database
      if (user) {
        const updatedPortfolio =
          profileData.portfolio?.map((p) => (p.id === item.id ? item : p)) ||
          [];

        if (!profileData.portfolio?.find((p) => p.id === item.id)) {
          updatedPortfolio.push(item);
        }

        const { error } = await updateUserData(user.id, {
          portfolio: updatedPortfolio,
        });

        if (error) {
          throw error;
        }
      }

      setShowPortfolioModal(false);
      setEditingPortfolioItem(null);
      await refreshUserData(); // Refresh user data in context
      toast({
        title: 'Success',
        description: 'Portfolio item saved successfully!',
      });
    } catch (error) {
      console.error('Error saving portfolio item:', error);
      toast({
        title: 'Error',
        description: 'Failed to save portfolio item. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSavingSection(null);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const getSkillIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return Code;
      case 'Frontend':
        return Globe;
      case 'Backend':
        return Database;
      case 'AI/ML':
        return Brain;
      case 'Database':
        return Database;
      case 'Tools':
        return Zap;
      default:
        return Code;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Basic':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPortfolioIcon = (type: string) => {
    switch (type) {
      case 'project':
        return Code;
      case 'achievement':
        return Award;
      case 'certification':
        return FileText;
      case 'publication':
        return BookOpen;
      case 'document':
        return File;
      default:
        return File;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'planned':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return <Globe className='h-4 w-4 text-green-600' />;
      case 'connections':
        return <Users className='h-4 w-4 text-yellow-600' />;
      case 'private':
        return <Lock className='h-4 w-4 text-red-600' />;
      default:
        return <Globe className='h-4 w-4 text-green-600' />;
    }
  };

  if (!user || isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6 max-w-6xl mx-auto'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
            <User className='h-6 w-6 text-blue-600' />
            Profile
          </h1>
          <p className='text-gray-600'>
            Manage your academic profile and information
          </p>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            onClick={() => setShowPrivacySettings(true)}
            className='flex items-center gap-2'
          >
            <Settings className='h-4 w-4' />
            Privacy
          </Button>
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className='bg-blue-600 hover:bg-blue-700'
              >
                {isSaving ? (
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                ) : (
                  <Save className='h-4 w-4 mr-2' />
                )}
                Save Changes
              </Button>
              <Button variant='outline' onClick={handleCancel}>
                <X className='h-4 w-4 mr-2' />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant='outline'>
              <Edit className='h-4 w-4 mr-2' />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Left Column - Profile Info */}
        <div className='lg:col-span-1 space-y-6'>
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className='text-center space-y-4'>
                <div className='relative mx-auto'>
                  <Avatar className='h-24 w-24 mx-auto'>
                    <AvatarImage
                      src={
                        profileData.avatar ||
                        userData?.avatar ||
                        '/api/placeholder/96/96'
                      }
                      alt={profileData.displayName}
                    />
                    <AvatarFallback className='text-xl'>
                      {profileData.displayName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size='sm'
                      className='absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0'
                      onClick={() => setShowProfileEditModal(true)}
                    >
                      <Camera className='h-4 w-4' />
                    </Button>
                  )}
                </div>
                <div>
                  <CardTitle className='text-xl'>
                    {profileData.displayName}
                  </CardTitle>
                  <CardDescription className='flex items-center justify-center gap-1 mt-1'>
                    <GraduationCap className='h-4 w-4' />
                    {profileData.role === 'student' && `${profileData.major}`}
                    {profileData.role === 'professor' &&
                      `${profileData.position}`}
                    {profileData.role === 'university' &&
                      'University Representative'}
                  </CardDescription>
                  <CardDescription className='flex items-center justify-center gap-1'>
                    <Building className='h-4 w-4' />
                    {profileData.university ||
                      profileData.institutionAffiliation ||
                      profileData.officialUniversityName}
                  </CardDescription>
                  <div className='flex items-center justify-center gap-1 mt-1'>
                    <CountryFlag
                      code={getCountryCode(profileData.country)}
                      size={16}
                      className='rounded-sm'
                    />
                    <span className='text-sm text-gray-500'>
                      {profileData.country}
                    </span>
                  </div>
                </div>
                <div className='flex items-center justify-center gap-4 text-sm text-gray-500'>
                  <span className='flex items-center gap-1'>
                    <Eye className='h-4 w-4' />
                    {profileData.profileViews} views
                  </span>
                  <span className='flex items-center gap-1'>
                    <Users className='h-4 w-4' />
                    {profileData.connections} connections
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Contact Info */}
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <h4 className='font-semibold text-sm'>Contact Information</h4>
                  <div className='flex items-center gap-2'>
                    {getVisibilityIcon(
                      profileData.privacySettings?.contactInfoVisibility ||
                        'public'
                    )}
                    {isEditing && (
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={() => setShowProfileEditModal(true)}
                        className='h-6 w-6 p-0'
                      >
                        <Edit className='h-3 w-3' />
                      </Button>
                    )}
                  </div>
                </div>
                <div className='space-y-1 text-sm'>
                  <div className='flex items-center gap-2'>
                    <Mail className='h-3 w-3 text-gray-400' />
                    {profileData.email}
                  </div>
                  {profileData.phoneNumber && (
                    <div className='flex items-center gap-2'>
                      <Phone className='h-3 w-3 text-gray-400' />
                      {profileData.phoneNumber}
                    </div>
                  )}
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-3 w-3 text-gray-400' />
                    {profileData.address &&
                    profileData.city &&
                    profileData.country
                      ? `${profileData.address}, ${profileData.city}, ${profileData.country}`
                      : profileData.city && profileData.country
                      ? `${profileData.city}, ${profileData.country}`
                      : profileData.country}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <h4 className='font-semibold text-sm'>Social Links</h4>
                  {isEditing && (
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => setShowProfileEditModal(true)}
                      className='h-6 w-6 p-0'
                    >
                      <Edit className='h-3 w-3' />
                    </Button>
                  )}
                </div>
                <div className='flex gap-2'>
                  {profileData.socialLinks?.linkedin && (
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex-1'
                      onClick={() =>
                        window.open(profileData.socialLinks.linkedin, '_blank')
                      }
                    >
                      <Linkedin className='h-3 w-3' />
                    </Button>
                  )}
                  {profileData.socialLinks?.github && (
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex-1'
                      onClick={() =>
                        window.open(profileData.socialLinks.github, '_blank')
                      }
                    >
                      <Github className='h-3 w-3' />
                    </Button>
                  )}
                  {profileData.socialLinks?.twitter && (
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex-1'
                      onClick={() =>
                        window.open(profileData.socialLinks.twitter, '_blank')
                      }
                    >
                      <Twitter className='h-3 w-3' />
                    </Button>
                  )}
                  {profileData.socialLinks?.website && (
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex-1'
                      onClick={() =>
                        window.open(profileData.socialLinks.website, '_blank')
                      }
                    >
                      <GlobeIcon className='h-3 w-3' />
                    </Button>
                  )}
                </div>
                {!profileData.socialLinks?.linkedin &&
                  !profileData.socialLinks?.github &&
                  !profileData.socialLinks?.twitter &&
                  !profileData.socialLinks?.website && (
                    <p className='text-xs text-gray-500 italic'>
                      No social links added yet
                    </p>
                  )}
              </div>

              {/* Stats */}
              <div className='space-y-2'>
                <h4 className='font-semibold text-sm'>Profile Stats</h4>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <div className='text-center p-2 bg-gray-50 rounded'>
                    <div className='font-semibold'>
                      {profileData.portfolio?.length || 0}
                    </div>
                    <div className='text-xs text-gray-500'>Portfolio Items</div>
                  </div>
                  <div className='text-center p-2 bg-gray-50 rounded'>
                    <div className='font-semibold'>
                      {profileData.endorsements}
                    </div>
                    <div className='text-xs text-gray-500'>Endorsements</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* About Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <User className='h-5 w-5' />
                  About
                </CardTitle>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => toggleSection('about')}
                >
                  {expandedSections.about ? (
                    <ChevronUp className='h-4 w-4' />
                  ) : (
                    <ChevronDown className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </CardHeader>
            {expandedSections.about && (
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profileData.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className='min-h-[100px]'
                    placeholder='Tell us about yourself...'
                  />
                ) : (
                  <p className='text-gray-700 leading-relaxed'>
                    {profileData.bio ||
                      'No bio available. Click edit to add one.'}
                  </p>
                )}
              </CardContent>
            )}
          </Card>

          {/* Portfolio Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Briefcase className='h-5 w-5' />
                  Portfolio
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={addPortfolioItem}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('portfolio')}
                  >
                    {expandedSections.portfolio ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.portfolio && (
              <CardContent className='space-y-4'>
                {profileData.portfolio && profileData.portfolio.length > 0 ? (
                  <div className='grid gap-4 md:grid-cols-2'>
                    {profileData.portfolio.map((item) => {
                      const IconComponent = getPortfolioIcon(item.type);
                      return (
                        <div
                          key={item.id}
                          className='border rounded-lg p-4 hover:shadow-md transition-shadow'
                        >
                          <div className='flex items-start justify-between mb-2'>
                            <div className='flex items-center gap-2'>
                              <IconComponent className='h-5 w-5 text-blue-600' />
                              <h4 className='font-semibold'>{item.title}</h4>
                            </div>
                            <div className='flex items-center gap-1'>
                              {item.isPublic ? (
                                <Unlock className='h-4 w-4 text-green-600' />
                              ) : (
                                <Lock className='h-4 w-4 text-red-600' />
                              )}
                              {isEditing && (
                                <div className='flex gap-1'>
                                  <Button
                                    size='sm'
                                    variant='ghost'
                                    onClick={() => editPortfolioItem(item)}
                                  >
                                    <Edit className='h-3 w-3' />
                                  </Button>
                                  <Button
                                    size='sm'
                                    variant='ghost'
                                    onClick={() => deletePortfolioItem(item.id)}
                                  >
                                    <Trash2 className='h-3 w-3' />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          <p className='text-sm text-gray-600 mb-2'>
                            {item.description}
                          </p>
                          <div className='flex items-center gap-2 mb-2'>
                            <Badge variant='outline' className='text-xs'>
                              {item.type}
                            </Badge>
                            <Badge
                              className={`text-xs ${getStatusColor(
                                item.status || 'completed'
                              )}`}
                            >
                              {item.status || 'completed'}
                            </Badge>
                          </div>
                          {item.technologies &&
                            item.technologies.length > 0 && (
                              <div className='flex flex-wrap gap-1 mb-2'>
                                {item.technologies.map((tech) => (
                                  <Badge
                                    key={tech}
                                    variant='secondary'
                                    className='text-xs'
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          <div className='flex items-center gap-2 text-xs text-gray-500'>
                            <Calendar className='h-3 w-3' />
                            {new Date(item.date).toLocaleDateString()}
                            {item.url && (
                              <Button
                                size='sm'
                                variant='ghost'
                                className='h-6 w-6 p-0'
                              >
                                <ExternalLink className='h-3 w-3' />
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className='text-center py-8 text-gray-500'>
                    <Briefcase className='h-12 w-12 mx-auto mb-4 text-gray-300' />
                    <p>No portfolio items yet.</p>
                    {isEditing && (
                      <Button
                        variant='outline'
                        onClick={addPortfolioItem}
                        className='mt-2'
                      >
                        <Plus className='h-4 w-4 mr-2' />
                        Add Portfolio Item
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Skills Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Target className='h-5 w-5' />
                  Skills & Interests
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => setShowSkillsModal(true)}
                      >
                        <Edit className='h-4 w-4 mr-1' />
                        Skills
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => setShowInterestsModal(true)}
                      >
                        <Edit className='h-4 w-4 mr-1' />
                        Interests
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => setShowLanguagesModal(true)}
                      >
                        <Edit className='h-4 w-4 mr-1' />
                        Languages
                      </Button>
                    </>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('skills')}
                  >
                    {expandedSections.skills ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.skills && (
              <CardContent>
                <div className='space-y-4'>
                  {profileData.skills && profileData.skills.length > 0 && (
                    <div>
                      <h4 className='font-semibold text-sm mb-2'>Skills</h4>
                      <div className='flex flex-wrap gap-2'>
                        {profileData.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant='secondary'
                            className='text-xs'
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {profileData.academicInterests &&
                    profileData.academicInterests.length > 0 && (
                      <div>
                        <h4 className='font-semibold text-sm mb-2'>
                          Academic Interests
                        </h4>
                        <div className='flex flex-wrap gap-2'>
                          {profileData.academicInterests.map((interest) => (
                            <Badge
                              key={interest}
                              variant='outline'
                              className='text-xs'
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  {profileData.languages &&
                    profileData.languages.length > 0 && (
                      <div>
                        <h4 className='font-semibold text-sm mb-2'>
                          Languages
                        </h4>
                        <div className='flex flex-wrap gap-2'>
                          {profileData.languages.map((language) => (
                            <Badge
                              key={language}
                              variant='outline'
                              className='text-xs'
                            >
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Experience Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Briefcase className='h-5 w-5' />
                  Experience
                </CardTitle>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => toggleSection('experience')}
                >
                  {expandedSections.experience ? (
                    <ChevronUp className='h-4 w-4' />
                  ) : (
                    <ChevronDown className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </CardHeader>
            {expandedSections.experience && (
              <CardContent>
                {profileData.experience ? (
                  <div className='border-l-2 border-blue-200 pl-4'>
                    <p className='text-gray-700 leading-relaxed'>
                      {profileData.experience}
                    </p>
                  </div>
                ) : (
                  <p className='text-gray-500 italic'>
                    No experience information available.
                  </p>
                )}
              </CardContent>
            )}
          </Card>

          {/* Work Experience Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Briefcase className='h-5 w-5' />
                  Work Experience
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={addWorkExperience}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('workExperience')}
                  >
                    {expandedSections.workExperience ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.workExperience && (
              <CardContent className='space-y-4'>
                {profileData.workExperience &&
                profileData.workExperience.length > 0 ? (
                  profileData.workExperience.map((exp) => (
                    <div
                      key={exp.id}
                      className='border-l-2 border-blue-200 pl-4'
                    >
                      <div className='flex items-start justify-between'>
                        <div>
                          <h4 className='font-semibold'>{exp.title}</h4>
                          <p className='text-sm text-gray-600'>{exp.company}</p>
                          <p className='text-xs text-gray-500 flex items-center gap-1'>
                            <MapPin className='h-3 w-3' />
                            {exp.location}
                          </p>
                          <p className='text-xs text-gray-500'>
                            {exp.startDate} - {exp.endDate}
                          </p>
                        </div>
                        {isEditing && (
                          <div className='flex gap-1'>
                            <Button
                              size='sm'
                              variant='ghost'
                              onClick={() => editWorkExperience(exp)}
                            >
                              <Edit className='h-3 w-3' />
                            </Button>
                            <Button
                              size='sm'
                              variant='ghost'
                              onClick={() => deleteWorkExperience(exp.id)}
                            >
                              <Trash2 className='h-3 w-3' />
                            </Button>
                          </div>
                        )}
                      </div>
                      <p className='text-sm text-gray-700 mt-2'>
                        {exp.description}
                      </p>
                      <div className='flex flex-wrap gap-1 mt-2'>
                        {exp.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant='secondary'
                            className='text-xs'
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500 italic'>
                    No work experience added yet.
                  </p>
                )}
              </CardContent>
            )}
          </Card>

          {/* Education Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <GraduationCap className='h-5 w-5' />
                  Education
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button size='sm' variant='outline' onClick={addEducation}>
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('education')}
                  >
                    {expandedSections.education ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.education && (
              <CardContent className='space-y-4'>
                {profileData.education && profileData.education.length > 0 ? (
                  profileData.education.map((edu) => (
                    <div
                      key={edu.id}
                      className='border-l-2 border-green-200 pl-4'
                    >
                      <div className='flex items-start justify-between'>
                        <div>
                          <h4 className='font-semibold'>{edu.degree}</h4>
                          <p className='text-sm text-gray-600'>
                            {edu.institution}
                          </p>
                          <p className='text-xs text-gray-500 flex items-center gap-1'>
                            <MapPin className='h-3 w-3' />
                            {edu.location}
                          </p>
                          <p className='text-xs text-gray-500'>
                            {edu.startDate} - {edu.endDate}
                          </p>
                          {edu.gpa && (
                            <p className='text-xs text-gray-500'>
                              GPA: {edu.gpa}
                            </p>
                          )}
                        </div>
                        {isEditing && (
                          <div className='flex gap-1'>
                            <Button
                              size='sm'
                              variant='ghost'
                              onClick={() => editEducation(edu)}
                            >
                              <Edit className='h-3 w-3' />
                            </Button>
                            <Button
                              size='sm'
                              variant='ghost'
                              onClick={() => deleteEducation(edu.id)}
                            >
                              <Trash2 className='h-3 w-3' />
                            </Button>
                          </div>
                        )}
                      </div>
                      {edu.description && (
                        <p className='text-sm text-gray-700 mt-2'>
                          {edu.description}
                        </p>
                      )}
                      {edu.courses && edu.courses.length > 0 && (
                        <div className='flex flex-wrap gap-1 mt-2'>
                          {edu.courses.map((course) => (
                            <Badge
                              key={course}
                              variant='outline'
                              className='text-xs'
                            >
                              {course}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500 italic'>
                    No education information added yet.
                  </p>
                )}
              </CardContent>
            )}
          </Card>

          {/* Certifications Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Award className='h-5 w-5' />
                  Certifications
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={addCertification}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('certifications')}
                  >
                    {expandedSections.certifications ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.certifications && (
              <CardContent className='space-y-4'>
                {profileData.certifications &&
                profileData.certifications.length > 0 ? (
                  profileData.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className='border-l-2 border-yellow-200 pl-4'
                    >
                      <div className='flex items-start justify-between'>
                        <div>
                          <h4 className='font-semibold'>{cert.name}</h4>
                          <p className='text-sm text-gray-600'>{cert.issuer}</p>
                          <p className='text-xs text-gray-500'>
                            Issued: {cert.issueDate}
                            {cert.expiryDate &&
                              ` • Expires: ${cert.expiryDate}`}
                          </p>
                          {cert.credentialId && (
                            <p className='text-xs text-gray-500'>
                              ID: {cert.credentialId}
                            </p>
                          )}
                        </div>
                        <div className='flex gap-1'>
                          {cert.url && (
                            <Button size='sm' variant='ghost'>
                              <ExternalLink className='h-3 w-3' />
                            </Button>
                          )}
                          {isEditing && (
                            <div className='flex gap-1'>
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() => editCertification(cert)}
                              >
                                <Edit className='h-3 w-3' />
                              </Button>
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() => deleteCertification(cert.id)}
                              >
                                <Trash2 className='h-3 w-3' />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500 italic'>
                    No certifications added yet.
                  </p>
                )}
              </CardContent>
            )}
          </Card>

          {/* Publications Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <FileText className='h-5 w-5' />
                  Publications
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={addPublication}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('publications')}
                  >
                    {expandedSections.publications ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.publications && (
              <CardContent className='space-y-4'>
                {profileData.publications &&
                profileData.publications.length > 0 ? (
                  profileData.publications.map((pub) => (
                    <div
                      key={pub.id}
                      className='border-l-2 border-purple-200 pl-4'
                    >
                      <div className='flex items-start justify-between'>
                        <div>
                          <h4 className='font-semibold'>{pub.title}</h4>
                          <p className='text-sm text-gray-600'>
                            {pub.authors.join(', ')}
                          </p>
                          <p className='text-sm text-gray-600'>{pub.journal}</p>
                          <p className='text-xs text-gray-500'>
                            {pub.publicationDate}
                          </p>
                          {pub.doi && (
                            <p className='text-xs text-gray-500'>
                              DOI: {pub.doi}
                            </p>
                          )}
                          {pub.citations && (
                            <p className='text-xs text-gray-500 flex items-center gap-1'>
                              <TrendingUp className='h-3 w-3' />
                              {pub.citations} citations
                            </p>
                          )}
                        </div>
                        {isEditing && (
                          <div className='flex gap-1'>
                            <Button
                              size='sm'
                              variant='ghost'
                              onClick={() => editPublication(pub)}
                            >
                              <Edit className='h-3 w-3' />
                            </Button>
                            <Button
                              size='sm'
                              variant='ghost'
                              onClick={() => deletePublication(pub.id)}
                            >
                              <Trash2 className='h-3 w-3' />
                            </Button>
                          </div>
                        )}
                      </div>
                      {pub.abstract && (
                        <p className='text-sm text-gray-700 mt-2'>
                          {pub.abstract}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500 italic'>
                    No publications added yet.
                  </p>
                )}
              </CardContent>
            )}
          </Card>

          {/* Projects Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Code className='h-5 w-5' />
                  Projects
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button size='sm' variant='outline' onClick={addProject}>
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('projects')}
                  >
                    {expandedSections.projects ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.projects && (
              <CardContent className='space-y-4'>
                {profileData.projects && profileData.projects.length > 0 ? (
                  profileData.projects.map((project) => (
                    <div
                      key={project.id}
                      className='border-l-2 border-indigo-200 pl-4'
                    >
                      <div className='flex items-start justify-between'>
                        <div>
                          <h4 className='font-semibold'>{project.name}</h4>
                          <p className='text-sm text-gray-700'>
                            {project.description}
                          </p>
                          <div className='flex flex-wrap gap-1 mt-2'>
                            {project.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant='secondary'
                                className='text-xs'
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className='flex items-center gap-2 mt-2'>
                            <Badge
                              variant={
                                project.status === 'completed'
                                  ? 'default'
                                  : 'secondary'
                              }
                              className='text-xs'
                            >
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                        <div className='flex gap-1'>
                          {project.githubUrl && (
                            <Button size='sm' variant='ghost'>
                              <Github className='h-3 w-3' />
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button size='sm' variant='ghost'>
                              <ExternalLink className='h-3 w-3' />
                            </Button>
                          )}
                          {isEditing && (
                            <div className='flex gap-1'>
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() => editProject(project)}
                              >
                                <Edit className='h-3 w-3' />
                              </Button>
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() => deleteProject(project.id)}
                              >
                                <Trash2 className='h-3 w-3' />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500 italic'>No projects added yet.</p>
                )}
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      {/* Privacy Settings Modal */}
      {showPrivacySettings && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <Card className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Shield className='h-5 w-5' />
                Privacy Settings
              </CardTitle>
              <CardDescription>
                Control who can see your information and how you can be
                contacted
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label className='text-sm font-medium'>
                      Profile Visibility
                    </Label>
                    <p className='text-xs text-gray-500'>
                      Who can see your profile
                    </p>
                  </div>
                  <Select
                    value={
                      profileData.privacySettings?.profileVisibility || 'public'
                    }
                    onValueChange={(value) =>
                      handlePrivacyChange('profileVisibility', value)
                    }
                  >
                    <SelectTrigger className='w-32'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='public'>Public</SelectItem>
                      <SelectItem value='connections'>Connections</SelectItem>
                      <SelectItem value='private'>Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <Label className='text-sm font-medium'>
                      Contact Information
                    </Label>
                    <p className='text-xs text-gray-500'>
                      Who can see your contact details
                    </p>
                  </div>
                  <Select
                    value={
                      profileData.privacySettings?.contactInfoVisibility ||
                      'public'
                    }
                    onValueChange={(value) =>
                      handlePrivacyChange('contactInfoVisibility', value)
                    }
                  >
                    <SelectTrigger className='w-32'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='public'>Public</SelectItem>
                      <SelectItem value='connections'>Connections</SelectItem>
                      <SelectItem value='private'>Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <Label className='text-sm font-medium'>
                      Portfolio Visibility
                    </Label>
                    <p className='text-xs text-gray-500'>
                      Who can see your portfolio
                    </p>
                  </div>
                  <Select
                    value={
                      profileData.privacySettings?.portfolioVisibility ||
                      'public'
                    }
                    onValueChange={(value) =>
                      handlePrivacyChange('portfolioVisibility', value)
                    }
                  >
                    <SelectTrigger className='w-32'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='public'>Public</SelectItem>
                      <SelectItem value='connections'>Connections</SelectItem>
                      <SelectItem value='private'>Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <Label className='text-sm font-medium'>
                      Allow Messages
                    </Label>
                    <p className='text-xs text-gray-500'>
                      Let others send you messages
                    </p>
                  </div>
                  <Switch
                    checked={profileData.privacySettings?.allowMessages || true}
                    onCheckedChange={(checked) =>
                      handlePrivacyChange('allowMessages', checked)
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <Label className='text-sm font-medium'>
                      Allow Connection Requests
                    </Label>
                    <p className='text-xs text-gray-500'>
                      Let others send connection requests
                    </p>
                  </div>
                  <Switch
                    checked={
                      profileData.privacySettings?.allowConnectionRequests ||
                      true
                    }
                    onCheckedChange={(checked) =>
                      handlePrivacyChange('allowConnectionRequests', checked)
                    }
                  />
                </div>
              </div>

              <div className='flex justify-end gap-2 pt-4 border-t'>
                <Button
                  variant='outline'
                  onClick={() => setShowPrivacySettings(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setShowPrivacySettings(false)}>
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Portfolio Item Modal */}
      {showPortfolioModal && editingPortfolioItem && (
        <PortfolioItemModal
          item={editingPortfolioItem}
          onSave={savePortfolioItem}
          onCancel={() => {
            setShowPortfolioModal(false);
            setEditingPortfolioItem(null);
          }}
          savingSection={savingSection}
        />
      )}

      {/* Work Experience Modal */}
      {showWorkExperienceModal && editingWorkExperience && (
        <WorkExperienceModal
          experience={editingWorkExperience}
          onSave={saveWorkExperience}
          onCancel={() => {
            setShowWorkExperienceModal(false);
            setEditingWorkExperience(null);
          }}
          savingSection={savingSection}
        />
      )}

      {/* Education Modal */}
      {showEducationModal && editingEducation && (
        <EducationModal
          education={editingEducation}
          onSave={saveEducation}
          onCancel={() => {
            setShowEducationModal(false);
            setEditingEducation(null);
          }}
          savingSection={savingSection}
        />
      )}

      {/* Certification Modal */}
      {showCertificationModal && editingCertification && (
        <CertificationModal
          certification={editingCertification}
          onSave={saveCertification}
          onCancel={() => {
            setShowCertificationModal(false);
            setEditingCertification(null);
          }}
          savingSection={savingSection}
        />
      )}

      {/* Publication Modal */}
      {showPublicationModal && editingPublication && (
        <PublicationModal
          publication={editingPublication}
          onSave={savePublication}
          onCancel={() => {
            setShowPublicationModal(false);
            setEditingPublication(null);
          }}
          savingSection={savingSection}
        />
      )}

      {/* Project Modal */}
      {showProjectModal && editingProject && (
        <ProjectModal
          project={editingProject}
          onSave={saveProject}
          onCancel={() => {
            setShowProjectModal(false);
            setEditingProject(null);
          }}
          savingSection={savingSection}
        />
      )}

      {/* Skills Modal */}
      {showSkillsModal && (
        <SkillsModal
          skills={profileData.skills || []}
          onSave={saveSkills}
          onCancel={() => setShowSkillsModal(false)}
          savingSection={savingSection}
        />
      )}

      {/* Academic Interests Modal */}
      {showInterestsModal && (
        <InterestsModal
          interests={profileData.academicInterests || []}
          onSave={saveAcademicInterests}
          onCancel={() => setShowInterestsModal(false)}
          savingSection={savingSection}
        />
      )}

      {/* Languages Modal */}
      {showLanguagesModal && (
        <LanguagesModal
          languages={profileData.languages || []}
          onSave={saveLanguages}
          onCancel={() => setShowLanguagesModal(false)}
          savingSection={savingSection}
        />
      )}

      {/* Profile Edit Modal */}
      {showProfileEditModal && (
        <ProfileEditModal
          profileData={profileData}
          onSave={saveProfileInfo}
          onCancel={() => setShowProfileEditModal(false)}
          savingSection={savingSection}
        />
      )}
    </div>
  );
};

// Portfolio Item Modal Component
interface PortfolioItemModalProps {
  item: PortfolioItem;
  onSave: (item: PortfolioItem) => void;
  onCancel: () => void;
  savingSection: string | null;
}

const PortfolioItemModal: React.FC<PortfolioItemModalProps> = ({
  item,
  onSave,
  onCancel,
  savingSection,
}) => {
  const [formData, setFormData] = useState<PortfolioItem>(item);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <Card className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <CardHeader>
          <CardTitle>Portfolio Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='title'>Title *</Label>
              <Input
                id='title'
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor='description'>Description *</Label>
              <Textarea
                id='description'
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='type'>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='project'>Project</SelectItem>
                    <SelectItem value='achievement'>Achievement</SelectItem>
                    <SelectItem value='certification'>Certification</SelectItem>
                    <SelectItem value='publication'>Publication</SelectItem>
                    <SelectItem value='document'>Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor='status'>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='completed'>Completed</SelectItem>
                    <SelectItem value='in-progress'>In Progress</SelectItem>
                    <SelectItem value='planned'>Planned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor='url'>URL</Label>
              <Input
                id='url'
                value={formData.url || ''}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder='https://example.com'
              />
            </div>

            <div>
              <Label htmlFor='githubUrl'>GitHub URL</Label>
              <Input
                id='githubUrl'
                value={formData.githubUrl || ''}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                placeholder='https://github.com/username/repo'
              />
            </div>

            <div className='flex items-center space-x-2'>
              <Switch
                id='isPublic'
                checked={formData.isPublic}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isPublic: checked })
                }
              />
              <Label htmlFor='isPublic'>Make this item public</Label>
            </div>

            <div className='flex justify-end gap-2 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                disabled={savingSection === 'portfolio'}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={savingSection === 'portfolio'}>
                {savingSection === 'portfolio' ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Saving...
                  </>
                ) : (
                  'Save Item'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Work Experience Modal Component
interface WorkExperienceModalProps {
  experience: any;
  onSave: (experience: any) => void;
  onCancel: () => void;
  savingSection: string | null;
}

const WorkExperienceModal: React.FC<WorkExperienceModalProps> = ({
  experience,
  onSave,
  onCancel,
  savingSection,
}) => {
  const [formData, setFormData] = useState(experience);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate > formData.endDate
    ) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <Card className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='title'>Job Title *</Label>
                <Input
                  id='title'
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    if (errors.title) setErrors({ ...errors, title: '' });
                  }}
                  className={errors.title ? 'border-red-500' : ''}
                  required
                />
                {errors.title && (
                  <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
                )}
              </div>
              <div>
                <Label htmlFor='company'>Company *</Label>
                <Input
                  id='company'
                  value={formData.company}
                  onChange={(e) => {
                    setFormData({ ...formData, company: e.target.value });
                    if (errors.company) setErrors({ ...errors, company: '' });
                  }}
                  className={errors.company ? 'border-red-500' : ''}
                  required
                />
                {errors.company && (
                  <p className='text-red-500 text-sm mt-1'>{errors.company}</p>
                )}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor='startDate'>Start Date</Label>
                <Input
                  id='startDate'
                  type='date'
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor='endDate'>End Date</Label>
              <Input
                id='endDate'
                type='date'
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
              />
            </div>

            <div className='flex justify-end gap-2 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                disabled={savingSection === 'workExperience'}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={savingSection === 'workExperience'}
              >
                {savingSection === 'workExperience' ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Saving...
                  </>
                ) : (
                  'Save Experience'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Education Modal Component
interface EducationModalProps {
  education: any;
  onSave: (education: any) => Promise<void>;
  onCancel: () => void;
  savingSection: string | null;
}

const EducationModal: React.FC<EducationModalProps> = ({
  education,
  onSave,
  onCancel,
  savingSection,
}) => {
  const [formData, setFormData] = useState(education);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree is required';
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution is required';
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate > formData.endDate
    ) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSave(formData);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <Card className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='degree'>Degree *</Label>
                <Input
                  id='degree'
                  value={formData.degree}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor='institution'>Institution *</Label>
                <Input
                  id='institution'
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor='gpa'>GPA</Label>
                <Input
                  id='gpa'
                  value={formData.gpa}
                  onChange={(e) =>
                    setFormData({ ...formData, gpa: e.target.value })
                  }
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='startDate'>Start Date</Label>
                <Input
                  id='startDate'
                  type='date'
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor='endDate'>End Date</Label>
                <Input
                  id='endDate'
                  type='date'
                  value={formData.endDate}
                  onChange={(e) => {
                    setFormData({ ...formData, endDate: e.target.value });
                    if (errors.endDate) setErrors({ ...errors, endDate: '' });
                  }}
                  className={errors.endDate ? 'border-red-500' : ''}
                />
                {errors.endDate && (
                  <p className='text-red-500 text-sm mt-1'>{errors.endDate}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
              />
            </div>

            <div className='flex justify-end gap-2 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                disabled={savingSection === 'education'}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={savingSection === 'education'}>
                {savingSection === 'education' ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Saving...
                  </>
                ) : (
                  'Save Education'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Certification Modal Component
interface CertificationModalProps {
  certification: any;
  onSave: (certification: any) => Promise<void>;
  onCancel: () => void;
  savingSection: string | null;
}

const CertificationModal: React.FC<CertificationModalProps> = ({
  certification,
  onSave,
  onCancel,
  savingSection,
}) => {
  const [formData, setFormData] = useState(certification);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <Card className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <CardHeader>
          <CardTitle>Certification</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='name'>Certification Name *</Label>
                <Input
                  id='name'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor='issuer'>Issuer *</Label>
                <Input
                  id='issuer'
                  value={formData.issuer}
                  onChange={(e) =>
                    setFormData({ ...formData, issuer: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='issueDate'>Issue Date</Label>
                <Input
                  id='issueDate'
                  type='date'
                  value={formData.issueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, issueDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor='expiryDate'>Expiry Date</Label>
                <Input
                  id='expiryDate'
                  type='date'
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='credentialId'>Credential ID</Label>
                <Input
                  id='credentialId'
                  value={formData.credentialId}
                  onChange={(e) =>
                    setFormData({ ...formData, credentialId: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor='url'>URL</Label>
                <Input
                  id='url'
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder='https://example.com'
                />
              </div>
            </div>

            <div className='flex justify-end gap-2 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                disabled={savingSection === 'certification'}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={savingSection === 'certification'}
              >
                {savingSection === 'certification' ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Saving...
                  </>
                ) : (
                  'Save Certification'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Publication Modal Component
interface PublicationModalProps {
  publication: any;
  onSave: (publication: any) => Promise<void>;
  onCancel: () => void;
  savingSection: string | null;
}

const PublicationModal: React.FC<PublicationModalProps> = ({
  publication,
  onSave,
  onCancel,
  savingSection,
}) => {
  const [formData, setFormData] = useState(publication);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <Card className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <CardHeader>
          <CardTitle>Publication</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='title'>Title *</Label>
              <Input
                id='title'
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='journal'>Journal/Conference</Label>
                <Input
                  id='journal'
                  value={formData.journal}
                  onChange={(e) =>
                    setFormData({ ...formData, journal: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor='publicationDate'>Publication Date</Label>
                <Input
                  id='publicationDate'
                  type='date'
                  value={formData.publicationDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      publicationDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='doi'>DOI</Label>
                <Input
                  id='doi'
                  value={formData.doi}
                  onChange={(e) =>
                    setFormData({ ...formData, doi: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor='citations'>Citations</Label>
                <Input
                  id='citations'
                  type='number'
                  value={formData.citations}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      citations: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor='abstract'>Abstract</Label>
              <Textarea
                id='abstract'
                value={formData.abstract}
                onChange={(e) =>
                  setFormData({ ...formData, abstract: e.target.value })
                }
                rows={4}
              />
            </div>

            <div className='flex justify-end gap-2 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                disabled={savingSection === 'publication'}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={savingSection === 'publication'}>
                {savingSection === 'publication' ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Saving...
                  </>
                ) : (
                  'Save Publication'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Project Modal Component
interface ProjectModalProps {
  project: any;
  onSave: (project: any) => Promise<void>;
  onCancel: () => void;
  savingSection: string | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onSave,
  onCancel,
  savingSection,
}) => {
  const [formData, setFormData] = useState(project);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <Card className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <CardHeader>
          <CardTitle>Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='name'>Project Name *</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='githubUrl'>GitHub URL</Label>
                <Input
                  id='githubUrl'
                  value={formData.githubUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, githubUrl: e.target.value })
                  }
                  placeholder='https://github.com/username/repo'
                />
              </div>
              <div>
                <Label htmlFor='liveUrl'>Live URL</Label>
                <Input
                  id='liveUrl'
                  value={formData.liveUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, liveUrl: e.target.value })
                  }
                  placeholder='https://example.com'
                />
              </div>
            </div>

            <div>
              <Label htmlFor='status'>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='completed'>Completed</SelectItem>
                  <SelectItem value='in-progress'>In Progress</SelectItem>
                  <SelectItem value='planned'>Planned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='flex justify-end gap-2 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                disabled={savingSection === 'project'}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={savingSection === 'project'}>
                {savingSection === 'project' ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Saving...
                  </>
                ) : (
                  'Save Project'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Skills Modal Component
interface SkillsModalProps {
  skills: string[];
  onSave: (skills: string[]) => void;
  onCancel: () => void;
  savingSection: string | null;
}

const SkillsModal: React.FC<SkillsModalProps> = ({
  skills,
  onSave,
  onCancel,
  savingSection,
}) => {
  const [formData, setFormData] = useState<string[]>(skills);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !formData.includes(newSkill.trim())) {
      setFormData([...formData, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(formData.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <Card className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <CardHeader>
          <CardTitle>Edit Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='newSkill'>Add New Skill</Label>
              <div className='flex gap-2'>
                <Input
                  id='newSkill'
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder='Enter a skill'
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button
                  type='button'
                  onClick={addSkill}
                  disabled={!newSkill.trim()}
                >
                  Add
                </Button>
              </div>
            </div>

            <div>
              <Label>Current Skills</Label>
              <div className='flex flex-wrap gap-2 mt-2'>
                {formData.map((skill) => (
                  <Badge
                    key={skill}
                    variant='secondary'
                    className='flex items-center gap-1'
                  >
                    {skill}
                    <button
                      type='button'
                      onClick={() => removeSkill(skill)}
                      className='ml-1 hover:text-red-500'
                    >
                      <X className='h-3 w-3' />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className='flex justify-end gap-2 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                disabled={savingSection === 'skills'}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={savingSection === 'skills'}>
                {savingSection === 'skills' ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Saving...
                  </>
                ) : (
                  'Save Skills'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Academic Interests Modal Component
interface InterestsModalProps {
  interests: string[];
  onSave: (interests: string[]) => void;
  onCancel: () => void;
  savingSection: string | null;
}

const InterestsModal: React.FC<InterestsModalProps> = ({
  interests,
  onSave,
  onCancel,
  savingSection,
}) => {
  const [formData, setFormData] = useState<string[]>(interests);
  const [newInterest, setNewInterest] = useState('');

  const addInterest = () => {
    if (newInterest.trim() && !formData.includes(newInterest.trim())) {
      setFormData([...formData, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(formData.filter((i) => i !== interest));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <Card className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <CardHeader>
          <CardTitle>Edit Academic Interests</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='newInterest'>Add New Interest</Label>
              <div className='flex gap-2'>
                <Input
                  id='newInterest'
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder='Enter an academic interest'
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addInterest();
                    }
                  }}
                />
                <Button
                  type='button'
                  onClick={addInterest}
                  disabled={!newInterest.trim()}
                >
                  Add
                </Button>
              </div>
            </div>

            <div>
              <Label>Current Academic Interests</Label>
              <div className='flex flex-wrap gap-2 mt-2'>
                {formData.map((interest) => (
                  <Badge
                    key={interest}
                    variant='outline'
                    className='flex items-center gap-1'
                  >
                    {interest}
                    <button
                      type='button'
                      onClick={() => removeInterest(interest)}
                      className='ml-1 hover:text-red-500'
                    >
                      <X className='h-3 w-3' />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className='flex justify-end gap-2 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                disabled={savingSection === 'academicInterests'}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={savingSection === 'academicInterests'}
              >
                {savingSection === 'academicInterests' ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Saving...
                  </>
                ) : (
                  'Save Interests'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Languages Modal Component
interface LanguagesModalProps {
  languages: string[];
  onSave: (languages: string[]) => void;
  onCancel: () => void;
  savingSection: string | null;
}

const LanguagesModal: React.FC<LanguagesModalProps> = ({
  languages,
  onSave,
  onCancel,
  savingSection,
}) => {
  const [formData, setFormData] = useState<string[]>(languages);
  const [newLanguage, setNewLanguage] = useState('');

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.includes(newLanguage.trim())) {
      setFormData([...formData, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setFormData(formData.filter((l) => l !== language));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <Card className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <CardHeader>
          <CardTitle>Edit Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='newLanguage'>Add New Language</Label>
              <div className='flex gap-2'>
                <Input
                  id='newLanguage'
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder='Enter a language'
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addLanguage();
                    }
                  }}
                />
                <Button
                  type='button'
                  onClick={addLanguage}
                  disabled={!newLanguage.trim()}
                >
                  Add
                </Button>
              </div>
            </div>

            <div>
              <Label>Current Languages</Label>
              <div className='flex flex-wrap gap-2 mt-2'>
                {formData.map((language) => (
                  <Badge
                    key={language}
                    variant='outline'
                    className='flex items-center gap-1'
                  >
                    {language}
                    <button
                      type='button'
                      onClick={() => removeLanguage(language)}
                      className='ml-1 hover:text-red-500'
                    >
                      <X className='h-3 w-3' />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className='flex justify-end gap-2 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                disabled={savingSection === 'languages'}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={savingSection === 'languages'}>
                {savingSection === 'languages' ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Saving...
                  </>
                ) : (
                  'Save Languages'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Profile Edit Modal Component
interface ProfileEditModalProps {
  profileData: ExtendedUserData;
  onSave: (profileInfo: any) => void;
  onCancel: () => void;
  savingSection: string | null;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  profileData,
  onSave,
  onCancel,
  savingSection,
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: profileData.firstName || '',
    lastName: profileData.lastName || '',
    phoneNumber: profileData.phoneNumber || '',
    address: profileData.address || '',
    city: profileData.city || '',
    country: profileData.country || '',
    bio: profileData.bio || '',
    avatar: profileData.avatar || '',
    socialLinks: {
      linkedin: profileData.socialLinks?.linkedin || '',
      github: profileData.socialLinks?.github || '',
      twitter: profileData.socialLinks?.twitter || '',
      website: profileData.socialLinks?.website || '',
    },
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select an image smaller than 2MB.',
          variant: 'destructive',
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please select a valid image file.',
          variant: 'destructive',
        });
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!user) return null;

    try {
      setUploadingAvatar(true);

      // Create a unique filename with user ID folder structure
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${user.id}/${fileName}`;

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('edfellow')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('edfellow').getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let avatarUrl = formData.avatar;

      // Upload avatar if a new file is selected
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
        if (!avatarUrl) {
          toast({
            title: 'Upload failed',
            description: 'Failed to upload avatar. Please try again.',
            variant: 'destructive',
          });
          return;
        }
      }

      // Update form data with new avatar URL
      const updatedFormData = {
        ...formData,
        avatar: avatarUrl,
      };

      onSave(updatedFormData);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload avatar. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <Card className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <CardHeader>
          <CardTitle>Edit Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and contact details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Profile Image Upload */}
            <div className='space-y-2'>
              <Label>Profile Picture</Label>
              <div className='flex items-center gap-4'>
                <div className='relative'>
                  <Avatar className='h-20 w-20'>
                    <AvatarImage
                      src={
                        avatarPreview ||
                        profileData.avatar ||
                        '/api/placeholder/80/80'
                      }
                      alt={profileData.displayName}
                    />
                    <AvatarFallback className='text-lg'>
                      {profileData.displayName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  {avatarFile && (
                    <div className='absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1'>
                      <CheckCircle className='h-3 w-3 text-white' />
                    </div>
                  )}
                </div>
                <div className='space-y-2'>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='text-sm'
                    disabled={uploadingAvatar}
                  />
                  <p className='text-xs text-gray-500'>
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                  {uploadingAvatar && (
                    <div className='flex items-center gap-2 text-sm text-blue-600'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                      Uploading avatar...
                    </div>
                  )}
                  {avatarFile && !uploadingAvatar && (
                    <div className='flex items-center gap-2 text-sm text-green-600'>
                      <CheckCircle className='h-4 w-4' />
                      Ready to upload
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='firstName'>First Name *</Label>
                <Input
                  id='firstName'
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor='lastName'>Last Name *</Label>
                <Input
                  id='lastName'
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className='space-y-4'>
              <h4 className='font-semibold text-sm'>Contact Information</h4>
              <div>
                <Label htmlFor='phoneNumber'>Phone Number</Label>
                <Input
                  id='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  placeholder='+1 (555) 123-4567'
                />
              </div>
              <div>
                <Label htmlFor='address'>Address</Label>
                <Input
                  id='address'
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder='123 Main Street'
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='city'>City</Label>
                  <Input
                    id='city'
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder='New York'
                  />
                </div>
                <div>
                  <Label htmlFor='country'>Country</Label>
                  <Input
                    id='country'
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    placeholder='United States'
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor='bio'>Bio</Label>
              <Textarea
                id='bio'
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={4}
                placeholder='Tell us about yourself...'
              />
            </div>

            {/* Social Links */}
            <div className='space-y-4'>
              <h4 className='font-semibold text-sm'>Social Links</h4>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='linkedin'>LinkedIn</Label>
                  <Input
                    id='linkedin'
                    value={formData.socialLinks.linkedin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          linkedin: e.target.value,
                        },
                      })
                    }
                    placeholder='https://linkedin.com/in/username'
                  />
                </div>
                <div>
                  <Label htmlFor='github'>GitHub</Label>
                  <Input
                    id='github'
                    value={formData.socialLinks.github}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          github: e.target.value,
                        },
                      })
                    }
                    placeholder='https://github.com/username'
                  />
                </div>
                <div>
                  <Label htmlFor='twitter'>Twitter</Label>
                  <Input
                    id='twitter'
                    value={formData.socialLinks.twitter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          twitter: e.target.value,
                        },
                      })
                    }
                    placeholder='https://twitter.com/username'
                  />
                </div>
                <div>
                  <Label htmlFor='website'>Website</Label>
                  <Input
                    id='website'
                    value={formData.socialLinks.website}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          website: e.target.value,
                        },
                      })
                    }
                    placeholder='https://yourwebsite.com'
                  />
                </div>
              </div>
            </div>

            <div className='flex justify-end gap-2 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                disabled={savingSection === 'profile'}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={savingSection === 'profile' || uploadingAvatar}
              >
                {savingSection === 'profile' || uploadingAvatar ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    {uploadingAvatar ? 'Uploading...' : 'Saving...'}
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
