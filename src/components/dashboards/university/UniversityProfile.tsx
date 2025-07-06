
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "../../dashboard/Breadcrumb";
import { 
  Building2, 
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Award,
  BookOpen,
  Camera,
  Edit,
  Save,
  Star,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

const UniversityProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    universityName: 'International University of Technology',
    tagline: 'Leading Innovation in Higher Education',
    description: 'A premier institution committed to excellence in education, research, and innovation. We offer world-class programs that prepare students for global careers and leadership roles.',
    website: 'https://www.iut.edu',
    email: 'admissions@iut.edu',
    phone: '+1 (555) 123-4567',
    address: '123 University Ave, Tech City, TC 12345',
    established: '1985',
    totalStudents: '25,000',
    internationalStudents: '8,500',
    facultyCount: '1,200',
    campusSize: '450 acres',
    ranking: '#45 Globally',
    accreditation: 'AACSB, ABET, WASC'
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your university profile has been updated successfully.",
    });
  };

  const programs = [
    { name: 'Master of Computer Science', students: 1250, status: 'Active' },
    { name: 'Business Analytics PhD', students: 340, status: 'Active' },
    { name: 'Data Science Certificate', students: 0, status: 'Draft' },
    { name: 'International Business MBA', students: 890, status: 'Review' }
  ];

  const achievements = [
    { title: 'QS World University Rankings', rank: '#45 Globally', year: '2024' },
    { title: 'Research Excellence Award', rank: 'Top 10 in Technology', year: '2023' },
    { title: 'Student Satisfaction', rank: '4.8/5 Rating', year: '2024' },
    { title: 'Graduate Employment Rate', rank: '94% within 6 months', year: '2023' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-100/20">
      <div className="p-6 space-y-6">
        <Breadcrumb items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "University Profile" }
        ]} />
        
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Card */}
          <Card className="relative overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-orange-500 to-red-600"></div>
            <CardContent className="p-8 -mt-16 relative">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg bg-white">
                      <AvatarFallback className="bg-orange-100 text-orange-600 text-2xl font-bold">
                        IUT
                      </AvatarFallback>
                    </Avatar>
                    <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">{profileData.universityName}</h1>
                    <p className="text-lg text-orange-600 font-medium">{profileData.tagline}</p>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Verified Institution
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        {profileData.ranking}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-orange-600" />
                    About University
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="tagline">Tagline</Label>
                        <Input
                          id="tagline"
                          value={profileData.tagline}
                          onChange={(e) => setProfileData(prev => ({ ...prev, tagline: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={profileData.description}
                          onChange={(e) => setProfileData(prev => ({ ...prev, description: e.target.value }))}
                          rows={4}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700 leading-relaxed">{profileData.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-orange-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{profileData.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{profileData.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <a href={profileData.website} className="text-blue-600 hover:underline flex items-center gap-1">
                          {profileData.website}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Programs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                    Active Programs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {programs.map((program, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{program.name}</h4>
                          <p className="text-sm text-gray-600">{program.students} students enrolled</p>
                        </div>
                        <Badge className={
                          program.status === 'Active' ? 'bg-green-100 text-green-700' :
                          program.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }>
                          {program.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{profileData.totalStudents}</div>
                    <div className="text-sm text-gray-600">Total Students</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{profileData.internationalStudents}</div>
                    <div className="text-sm text-gray-600">International Students</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{profileData.facultyCount}</div>
                    <div className="text-sm text-gray-600">Faculty Members</div>
                  </div>
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Established</span>
                      <span className="text-sm font-medium">{profileData.established}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Campus Size</span>
                      <span className="text-sm font-medium">{profileData.campusSize}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-orange-600" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
                      <p className="text-orange-600 font-medium text-sm">{achievement.rank}</p>
                      <p className="text-xs text-gray-500">{achievement.year}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Accreditation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    Accreditation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {profileData.accreditation.split(', ').map((accred, index) => (
                      <Badge key={index} variant="outline" className="mr-2">
                        {accred}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityProfile;
