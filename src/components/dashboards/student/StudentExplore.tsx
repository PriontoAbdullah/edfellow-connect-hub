
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "../../dashboard/Breadcrumb";
import { Search, Star, MapPin, Calendar, DollarSign, Users, BookOpen, Filter, Heart } from 'lucide-react';

const StudentExplore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const trendingPrograms = [
    {
      id: 1,
      name: 'Master of Science in Artificial Intelligence',
      university: 'Stanford University',
      country: 'USA',
      duration: '2 years',
      tuition: '$58,000/year',
      rating: 4.9,
      applications: 1250,
      deadline: 'Jan 15, 2025',
      level: 'masters',
      category: 'technology',
      description: 'Comprehensive AI program covering machine learning, deep learning, and AI ethics.',
      highlights: ['Research Opportunities', '1:5 Faculty Ratio', 'Industry Partnerships']
    },
    {
      id: 2,
      name: 'PhD in Data Science',
      university: 'MIT',
      country: 'USA',
      duration: '4-5 years',
      tuition: 'Fully Funded',
      rating: 4.8,
      applications: 890,
      deadline: 'Dec 15, 2024',
      level: 'phd',
      category: 'technology',
      description: 'Advanced research program in data science and computational methods.',
      highlights: ['Full Funding', 'Research Assistantship', 'Top Faculty']
    },
    {
      id: 3,
      name: 'Master of Business Administration',
      university: 'Harvard Business School',
      country: 'USA',
      duration: '2 years',
      tuition: '$73,440/year',
      rating: 4.9,
      applications: 2100,
      deadline: 'Jan 3, 2025',
      level: 'masters',
      category: 'business',
      description: 'World-renowned MBA program with focus on leadership and innovation.',
      highlights: ['Global Network', 'Case Method', 'Entrepreneurship Focus']
    },
    {
      id: 4,
      name: 'MSc Computer Vision',
      university: 'University of Oxford',
      country: 'UK',
      duration: '1 year',
      tuition: '£32,760',
      rating: 4.7,
      applications: 456,
      deadline: 'Mar 1, 2025',
      level: 'masters',
      category: 'technology',
      description: 'Intensive program focusing on computer vision and image processing.',
      highlights: ['1-Year Program', 'Industry Projects', 'World-Class Research']
    },
    {
      id: 5,
      name: 'Bachelor of Engineering',
      university: 'IIT Delhi',
      country: 'India',
      duration: '4 years',
      tuition: '₹2,50,000/year',
      rating: 4.8,
      applications: 3200,
      deadline: 'May 15, 2025',
      level: 'bachelor',
      category: 'engineering',
      description: 'Comprehensive engineering program with multiple specializations.',
      highlights: ['Multiple Specializations', 'Research Focus', 'Industry Connect']
    },
    {
      id: 6,
      name: 'MSc Renewable Energy',
      university: 'Technical University of Denmark',
      country: 'Denmark',
      duration: '2 years',
      tuition: 'EU: Free, Non-EU: €15,000/year',
      rating: 4.6,
      applications: 342,
      deadline: 'Jan 31, 2025',
      level: 'masters',
      category: 'engineering',
      description: 'Cutting-edge program in sustainable energy technologies.',
      highlights: ['Sustainability Focus', 'Lab Access', 'Industry Partnerships']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Fields' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'arts', label: 'Arts & Humanities' }
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'bachelor', label: 'Bachelor' },
    { value: 'masters', label: 'Masters' },
    { value: 'phd', label: 'PhD' },
    { value: 'certificate', label: 'Certificate' }
  ];

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Explore Programs" }]} />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Explore Programs</h1>
          <p className="text-gray-600">Discover educational opportunities from top universities worldwide</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Heart className="h-4 w-4 mr-2" />
          Saved Programs
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search programs by name, university, or location..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {levels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Programs */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Trending Programs</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {trendingPrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs capitalize">
                    {program.level}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{program.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{program.name}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {program.university}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {program.country}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {program.duration} • Deadline: {program.deadline}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Tuition: {program.tuition}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {program.applications} applications
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Program Highlights:</h4>
                  <div className="flex flex-wrap gap-1">
                    {program.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Learn More
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Heart className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600">Universities</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">2,400+</div>
            <div className="text-sm text-gray-600">Programs</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">80+</div>
            <div className="text-sm text-gray-600">Countries</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">95%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentExplore;
