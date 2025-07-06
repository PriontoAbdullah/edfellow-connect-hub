
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "../../dashboard/Breadcrumb";
import { 
  BookOpen, 
  Search,
  Filter,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  Users,
  DollarSign,
  Calendar,
  Globe,
  BarChart3,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const UniversityPrograms = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const programs = [
    {
      id: 1,
      name: 'Master of Computer Science',
      type: 'Master\'s Degree',
      status: 'active',
      applications: 1250,
      views: 8420,
      fees: '$25,000',
      deadline: 'Dec 15, 2025',
      startDate: 'Sep 2026',
      language: 'English',
      format: 'On-Campus',
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      name: 'Business Analytics PhD',
      type: 'PhD Program',
      status: 'active',
      applications: 340,
      views: 2890,
      fees: '$30,000',
      deadline: 'Jan 30, 2026',
      startDate: 'Sep 2026',
      language: 'English',
      format: 'Hybrid',
      lastUpdated: '5 days ago'
    },
    {
      id: 3,
      name: 'Data Science Certificate',
      type: 'Certificate',
      status: 'draft',
      applications: 0,
      views: 0,
      fees: '$5,000',
      deadline: 'Nov 20, 2025',
      startDate: 'Jan 2026',
      language: 'English',
      format: 'Online',
      lastUpdated: '1 week ago'
    },
    {
      id: 4,
      name: 'International Business MBA',
      type: 'Master\'s Degree',
      status: 'under_review',
      applications: 890,
      views: 5670,
      fees: '$45,000',
      deadline: 'Mar 15, 2026',
      startDate: 'Sep 2026',
      language: 'English',
      format: 'On-Campus',
      lastUpdated: '3 days ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'under_review': return 'bg-blue-100 text-blue-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'draft': return <Clock className="h-4 w-4" />;
      case 'under_review': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (programId: number) => {
    toast({
      title: "Edit Program",
      description: "Opening program editor...",
    });
  };

  const handlePreview = (programId: number) => {
    toast({
      title: "Program Preview",
      description: "Opening program preview...",
    });
  };

  const handleDelete = (programId: number) => {
    toast({
      title: "Program Deleted",
      description: "Program has been removed successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-100/20">
      <div className="p-6 space-y-6">
        <Breadcrumb items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Programs" }
        ]} />
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Programs</h1>
            <p className="text-gray-600 mt-1">Manage your educational programs and track their performance</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <BookOpen className="h-4 w-4 mr-2" />
            Add New Program
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">4</div>
              <div className="text-sm text-gray-600">Total Programs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">2,480</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">16,980</div>
              <div className="text-sm text-gray-600">Total Views</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">$105K</div>
              <div className="text-sm text-gray-600">Revenue Potential</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Programs List */}
        <div className="space-y-4">
          {filteredPrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{program.name}</h3>
                      <Badge variant="secondary">{program.type}</Badge>
                      <Badge className={getStatusColor(program.status)}>
                        {getStatusIcon(program.status)}
                        <span className="ml-1 capitalize">{program.status.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {program.fees}/year
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Deadline: {program.deadline}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        {program.format}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(program.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handlePreview(program.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(program.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6 pt-4 border-t">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{program.applications}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                      <Users className="h-3 w-3" />
                      Applications
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{program.views.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                      <Eye className="h-3 w-3" />
                      Views
                    </div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">5.4%</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Conversion
                    </div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700 w-full">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityPrograms;
