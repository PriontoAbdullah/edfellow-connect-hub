import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  MessageSquare,
  BookOpen,
  GraduationCap,
  Building2,
  User,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Network,
  Handshake,
} from 'lucide-react';

interface ForumAutoJoinProps {
  userProfile: any;
  onClose: () => void;
}

const ForumAutoJoin = ({ userProfile, onClose }: ForumAutoJoinProps) => {
  const [selectedForums, setSelectedForums] = useState<string[]>([]);
  const [isJoining, setIsJoining] = useState(false);

  // Generate forum suggestions based on user profile
  const getSuggestedForums = () => {
    const forums = [];

    // Based on user type
    if (userProfile.userType === 'student') {
      forums.push(
        {
          id: 'student-community',
          name: 'Student Community',
          description: 'Connect with fellow students worldwide',
          members: '15,000+',
          icon: Users,
          color: 'from-blue-500 to-indigo-600',
          tags: ['Students', 'Networking', 'Support'],
        },
        {
          id: 'academic-interests',
          name: 'Academic Interests',
          description: 'Share and discuss your academic interests',
          members: '8,500+',
          icon: BookOpen,
          color: 'from-green-500 to-emerald-600',
          tags: ['Academic', 'Discussion', 'Learning'],
        }
      );

      // Based on academic interests
      if (userProfile.academicInterests?.includes('Computer Science')) {
        forums.push({
          id: 'cs-students',
          name: 'Computer Science Students',
          description: 'Connect with CS students and professionals',
          members: '12,000+',
          icon: GraduationCap,
          color: 'from-purple-500 to-pink-600',
          tags: ['Computer Science', 'Programming', 'Tech'],
        });
      }

      if (userProfile.academicInterests?.includes('Engineering')) {
        forums.push({
          id: 'engineering-students',
          name: 'Engineering Students',
          description: 'Engineering community and discussions',
          members: '9,500+',
          icon: Building2,
          color: 'from-orange-500 to-red-600',
          tags: ['Engineering', 'Innovation', 'Projects'],
        });
      }
    }

    if (userProfile.userType === 'professor') {
      forums.push(
        {
          id: 'professor-network',
          name: 'Professor Network',
          description: 'Connect with fellow professors and researchers',
          members: '3,500+',
          icon: GraduationCap,
          color: 'from-indigo-500 to-purple-600',
          tags: ['Professors', 'Research', 'Academic'],
        },
        {
          id: 'research-collaboration',
          name: 'Research Collaboration',
          description: 'Find research partners and collaborators',
          members: '2,800+',
          icon: Network,
          color: 'from-teal-500 to-cyan-600',
          tags: ['Research', 'Collaboration', 'Publications'],
        }
      );

      // Based on research interests
      if (userProfile.academicInterests?.includes('Artificial Intelligence')) {
        forums.push({
          id: 'ai-researchers',
          name: 'AI Researchers',
          description: 'AI and ML research community',
          members: '1,200+',
          icon: Target,
          color: 'from-pink-500 to-rose-600',
          tags: ['AI/ML', 'Research', 'Technology'],
        });
      }
    }

    if (userProfile.userType === 'university') {
      forums.push(
        {
          id: 'university-administrators',
          name: 'University Administrators',
          description: 'Connect with university administrators',
          members: '1,500+',
          icon: Building2,
          color: 'from-amber-500 to-orange-600',
          tags: ['Administration', 'Policy', 'Management'],
        },
        {
          id: 'program-promotion',
          name: 'Program Promotion',
          description: 'Promote your university programs',
          members: '800+',
          icon: Sparkles,
          color: 'from-emerald-500 to-green-600',
          tags: ['Promotion', 'Programs', 'Marketing'],
        }
      );
    }

    return forums;
  };

  const suggestedForums = getSuggestedForums();

  const handleForumToggle = (forumId: string) => {
    setSelectedForums((prev) =>
      prev.includes(forumId)
        ? prev.filter((id) => id !== forumId)
        : [...prev, forumId]
    );
  };

  const handleJoinForums = async () => {
    setIsJoining(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Store joined forums in localStorage
    const joinedForums = selectedForums.map((id) =>
      suggestedForums.find((forum) => forum.id === id)
    );

    localStorage.setItem(
      'edfellow_joined_forums',
      JSON.stringify(joinedForums)
    );

    setIsJoining(false);
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <Card className='max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm'>
        <CardHeader className='text-center pb-6'>
          <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg'>
            <Network className='h-8 w-8 text-white' />
          </div>
          <CardTitle className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'>
            Join Relevant Forums
          </CardTitle>
          <CardDescription className='text-lg text-gray-600 mt-2'>
            We've found some forums that match your interests. Join them to
            start connecting with the community!
          </CardDescription>
        </CardHeader>

        <CardContent className='px-8 pb-8'>
          <div className='grid md:grid-cols-2 gap-6 mb-8'>
            {suggestedForums.map((forum) => {
              const IconComponent = forum.icon;
              const isSelected = selectedForums.includes(forum.id);

              return (
                <Card
                  key={forum.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? 'border-2 border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 shadow-lg'
                      : 'border border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => handleForumToggle(forum.id)}
                >
                  <CardContent className='p-6'>
                    <div className='flex items-start gap-4'>
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${forum.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                      >
                        <IconComponent className='h-6 w-6' />
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-2'>
                          <h3 className='font-semibold text-gray-900'>
                            {forum.name}
                          </h3>
                          {isSelected && (
                            <CheckCircle className='h-5 w-5 text-purple-600' />
                          )}
                        </div>
                        <p className='text-sm text-gray-600 mb-3'>
                          {forum.description}
                        </p>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <Users className='h-4 w-4' />
                            <span>{forum.members}</span>
                          </div>
                          <div className='flex flex-wrap gap-1'>
                            {forum.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant='outline'
                                className='text-xs'
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className='flex items-center justify-between pt-6 border-t border-gray-200'>
            <div className='text-sm text-gray-600'>
              {selectedForums.length} forum
              {selectedForums.length !== 1 ? 's' : ''} selected
            </div>
            <div className='flex gap-3'>
              <Button variant='outline' onClick={onClose} className='px-6'>
                Skip for Now
              </Button>
              <Button
                onClick={handleJoinForums}
                disabled={selectedForums.length === 0 || isJoining}
                className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6'
              >
                {isJoining ? (
                  <>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                    Joining...
                  </>
                ) : (
                  <>
                    Join {selectedForums.length} Forum
                    {selectedForums.length !== 1 ? 's' : ''}
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForumAutoJoin;
