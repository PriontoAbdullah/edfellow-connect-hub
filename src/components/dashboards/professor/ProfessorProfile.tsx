
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb } from "../../dashboard/Breadcrumb";
import { User, Mail, MapPin, BookOpen, Edit, Save, X, Settings, Star, Award, Users } from 'lucide-react';

const ProfessorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    title: 'Professor of Computer Science',
    department: 'Computer Science Department',
    university: 'Stanford University',
    country: 'United States',
    bio: 'Distinguished professor specializing in artificial intelligence and machine learning. Passionate about mentoring the next generation of computer scientists and researchers.',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision', 'Deep Learning'],
    education: [
      'PhD in Computer Science - MIT (2010)',
      'MS in Computer Science - Carnegie Mellon (2006)',
      'BS in Mathematics - Harvard (2004)'
    ],
    publications: '127 peer-reviewed papers',
    hIndex: '45',
    citations: '8,450'
  });

  const mentorshipStats = {
    totalStudents: 127,
    activeStudents: 8,
    rating: 4.9,
    completedSessions: 456
  };

  const recentPublications = [
    {
      title: 'Advances in Neural Network Architecture for Computer Vision',
      journal: 'Nature Machine Intelligence',
      year: 2024,
      citations: 23
    },
    {
      title: 'Ethical Considerations in AI-Driven Healthcare Systems',
      journal: 'AI Ethics Journal',
      year: 2024,
      citations: 15
    },
    {
      title: 'Deep Learning Approaches to Natural Language Understanding',
      journal: 'Journal of AI Research',
      year: 2023,
      citations: 89
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "My Profile" }]} />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faculty Profile</h1>
          <p className="text-gray-600">Manage your academic profile and visibility settings</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        placeholder="Full Name"
                      />
                      <Input
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        placeholder="Email"
                        type="email"
                      />
                      <Input
                        value={profileData.title}
                        onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                        placeholder="Academic Title"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{profileData.name}</h3>
                      <p className="text-blue-600 font-medium">{profileData.title}</p>
                      <p className="text-gray-600">{profileData.email}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {profileData.department}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {profileData.country}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  {isEditing ? (
                    <Input
                      value={profileData.department}
                      onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.department}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                  {isEditing ? (
                    <Input
                      value={profileData.university}
                      onChange={(e) => setProfileData({...profileData, university: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.university}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio and Expertise */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Academic Bio</label>
                {isEditing ? (
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={4}
                    placeholder="Describe your academic background and research interests..."
                  />
                ) : (
                  <p className="text-gray-900">{profileData.bio}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.expertise.map((area, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-700">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                <div className="space-y-2">
                  {profileData.education.map((degree, index) => (
                    <div key={index} className="text-gray-900 text-sm">
                      • {degree}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Publications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                Recent Publications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPublications.map((pub, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-gray-900">{pub.title}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{pub.journal} ({pub.year})</span>
                      <Badge variant="outline">{pub.citations} citations</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mentorship Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Mentorship Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{mentorshipStats.rating}</div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Average Rating
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-gray-900">{mentorshipStats.totalStudents}</div>
                  <div className="text-xs text-gray-600">Total Students</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">{mentorshipStats.activeStudents}</div>
                  <div className="text-xs text-gray-600">Active</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{mentorshipStats.completedSessions}</div>
                <div className="text-xs text-gray-600">Sessions Completed</div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                Academic Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{profileData.hIndex}</div>
                <div className="text-sm text-gray-600">h-index</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-gray-900">{profileData.publications}</div>
                  <div className="text-xs text-gray-600">Publications</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">{profileData.citations}</div>
                  <div className="text-xs text-gray-600">Citations</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visibility Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-600" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Visibility</span>
                <Badge className="bg-green-100 text-green-700">Public</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mentorship Availability</span>
                <Badge className="bg-green-100 text-green-700">Open</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Contact Information</span>
                <Badge variant="secondary">Students Only</Badge>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Manage Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfessorProfile;
