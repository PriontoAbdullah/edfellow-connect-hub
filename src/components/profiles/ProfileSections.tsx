import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Edit,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Code,
  FileText,
  Globe,
  Star,
  ExternalLink,
  Building,
  User,
} from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { UserData, PublicProfile } from '../../lib/auth';

interface ProfileSectionsProps {
  userId: string;
  isOwnProfile?: boolean;
  onEditSection?: (section: string, data?: any) => void;
}

export const ProfileSections: React.FC<ProfileSectionsProps> = ({
  userId,
  isOwnProfile = false,
  onEditSection,
}) => {
  const { profile, publicProfile } = useProfile(userId);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    skills: true,
    experience: true,
    education: true,
    workExperience: true,
    certifications: true,
    publications: true,
    projects: true,
  });

  // Use public profile data if not own profile, otherwise use full profile
  const displayData = isOwnProfile ? profile : publicProfile;

  if (!displayData) {
    return null;
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const formatDateRange = (startDate: string, endDate?: string) => {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'Present';
    return `${start} - ${end}`;
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const SectionHeader: React.FC<{
    title: string;
    icon: React.ReactNode;
    count?: number;
    section: string;
    canEdit?: boolean;
  }> = ({ title, icon, count, section, canEdit = false }) => (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        {icon}
        <h3 className='font-semibold'>{title}</h3>
        {count !== undefined && count > 0 && (
          <Badge variant='secondary' className='text-xs'>
            {count}
          </Badge>
        )}
      </div>
      <div className='flex items-center gap-2'>
        {canEdit && isOwnProfile && (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => onEditSection?.(section)}
          >
            <Plus className='w-4 h-4' />
          </Button>
        )}
        <Button
          variant='ghost'
          size='sm'
          onClick={() => toggleSection(section)}
        >
          {expandedSections[section] ? (
            <ChevronUp className='w-4 h-4' />
          ) : (
            <ChevronDown className='w-4 h-4' />
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className='space-y-6'>
      {/* Skills Section */}
      {displayData.skills && displayData.skills.length > 0 && (
        <Card>
          <CardHeader>
            <SectionHeader
              title='Skills & Expertise'
              icon={<Award className='w-5 h-5' />}
              count={displayData.skills.length}
              section='skills'
              canEdit
            />
          </CardHeader>
          {expandedSections.skills && (
            <CardContent>
              <div className='flex flex-wrap gap-2'>
                {displayData.skills.map((skill, index) => (
                  <Badge key={index} variant='outline'>
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Academic Interests Section */}
      {displayData.academicInterests &&
        displayData.academicInterests.length > 0 && (
          <Card>
            <CardHeader>
              <SectionHeader
                title='Academic Interests'
                icon={<BookOpen className='w-5 h-5' />}
                count={displayData.academicInterests.length}
                section='academicInterests'
                canEdit
              />
            </CardHeader>
            {expandedSections.academicInterests && (
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {displayData.academicInterests.map((interest, index) => (
                    <Badge key={index} variant='secondary'>
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )}

      {/* Research Interests Section (for professors) */}
      {displayData.researchInterests &&
        displayData.researchInterests.length > 0 && (
          <Card>
            <CardHeader>
              <SectionHeader
                title='Research Interests'
                icon={<BookOpen className='w-5 h-5' />}
                count={displayData.researchInterests.length}
                section='researchInterests'
                canEdit
              />
            </CardHeader>
            {expandedSections.researchInterests && (
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {displayData.researchInterests.map((interest, index) => (
                    <Badge
                      key={index}
                      variant='outline'
                      className='bg-purple-50 text-purple-700'
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )}

      {/* Work Experience Section */}
      {displayData.workExperience && displayData.workExperience.length > 0 && (
        <Card>
          <CardHeader>
            <SectionHeader
              title='Work Experience'
              icon={<Briefcase className='w-5 h-5' />}
              count={displayData.workExperience.length}
              section='workExperience'
              canEdit
            />
          </CardHeader>
          {expandedSections.workExperience && (
            <CardContent className='space-y-4'>
              {displayData.workExperience.map((experience, index) => (
                <div key={index} className='space-y-2'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <h4 className='font-medium'>{experience.title}</h4>
                      <div className='text-sm text-muted-foreground'>
                        {experience.company}
                        {experience.location && (
                          <>
                            {' • '}
                            <span className='flex items-center gap-1'>
                              <MapPin className='w-3 h-3' />
                              {experience.location}
                            </span>
                          </>
                        )}
                      </div>
                      <div className='text-sm text-muted-foreground flex items-center gap-1'>
                        <Calendar className='w-3 h-3' />
                        {formatDateRange(
                          experience.startDate,
                          experience.endDate
                        )}
                      </div>
                    </div>
                    {isOwnProfile && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() =>
                          onEditSection?.('workExperience', experience)
                        }
                      >
                        <Edit className='w-4 h-4' />
                      </Button>
                    )}
                  </div>
                  {experience.description && (
                    <p className='text-sm text-muted-foreground'>
                      {experience.description}
                    </p>
                  )}
                  {experience.skills && experience.skills.length > 0 && (
                    <div className='flex flex-wrap gap-1'>
                      {experience.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant='outline'
                          className='text-xs'
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {index < displayData.workExperience.length - 1 && (
                    <Separator />
                  )}
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      )}

      {/* Education Section */}
      {displayData.education && displayData.education.length > 0 && (
        <Card>
          <CardHeader>
            <SectionHeader
              title='Education'
              icon={<GraduationCap className='w-5 h-5' />}
              count={displayData.education.length}
              section='education'
              canEdit
            />
          </CardHeader>
          {expandedSections.education && (
            <CardContent className='space-y-4'>
              {displayData.education.map((education, index) => (
                <div key={index} className='space-y-2'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <h4 className='font-medium'>{education.degree}</h4>
                      <div className='text-sm text-muted-foreground'>
                        {education.institution}
                        {education.location && (
                          <>
                            {' • '}
                            <span className='flex items-center gap-1'>
                              <MapPin className='w-3 h-3' />
                              {education.location}
                            </span>
                          </>
                        )}
                      </div>
                      <div className='text-sm text-muted-foreground flex items-center gap-1'>
                        <Calendar className='w-3 h-3' />
                        {formatDateRange(
                          education.startDate,
                          education.endDate
                        )}
                      </div>
                      {education.gpa && (
                        <div className='text-sm text-muted-foreground'>
                          GPA: {education.gpa}
                        </div>
                      )}
                    </div>
                    {isOwnProfile && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => onEditSection?.('education', education)}
                      >
                        <Edit className='w-4 h-4' />
                      </Button>
                    )}
                  </div>
                  {education.description && (
                    <p className='text-sm text-muted-foreground'>
                      {education.description}
                    </p>
                  )}
                  {education.courses && education.courses.length > 0 && (
                    <div className='space-y-1'>
                      <div className='text-sm font-medium'>
                        Relevant Courses:
                      </div>
                      <div className='flex flex-wrap gap-1'>
                        {education.courses.map((course, courseIndex) => (
                          <Badge
                            key={courseIndex}
                            variant='outline'
                            className='text-xs'
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {index < displayData.education.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      )}

      {/* Certifications Section */}
      {displayData.certifications && displayData.certifications.length > 0 && (
        <Card>
          <CardHeader>
            <SectionHeader
              title='Certifications'
              icon={<Award className='w-5 h-5' />}
              count={displayData.certifications.length}
              section='certifications'
              canEdit
            />
          </CardHeader>
          {expandedSections.certifications && (
            <CardContent className='space-y-4'>
              {displayData.certifications.map((cert, index) => (
                <div key={index} className='space-y-2'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <h4 className='font-medium'>{cert.name}</h4>
                      <div className='text-sm text-muted-foreground'>
                        {cert.issuer}
                        {cert.credentialId && ` • ID: ${cert.credentialId}`}
                      </div>
                      <div className='text-sm text-muted-foreground flex items-center gap-1'>
                        <Calendar className='w-3 h-3' />
                        Issued: {formatDate(cert.issueDate)}
                        {cert.expiryDate &&
                          ` • Expires: ${formatDate(cert.expiryDate)}`}
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      {cert.url && (
                        <Button variant='ghost' size='sm' asChild>
                          <a
                            href={cert.url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <ExternalLink className='w-4 h-4' />
                          </a>
                        </Button>
                      )}
                      {isOwnProfile && (
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() =>
                            onEditSection?.('certifications', cert)
                          }
                        >
                          <Edit className='w-4 h-4' />
                        </Button>
                      )}
                    </div>
                  </div>
                  {index < displayData.certifications.length - 1 && (
                    <Separator />
                  )}
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      )}

      {/* Publications Section (for professors) */}
      {displayData.publications && displayData.publications.length > 0 && (
        <Card>
          <CardHeader>
            <SectionHeader
              title='Publications'
              icon={<FileText className='w-5 h-5' />}
              count={displayData.publications.length}
              section='publications'
              canEdit
            />
          </CardHeader>
          {expandedSections.publications && (
            <CardContent className='space-y-4'>
              {displayData.publications.map((pub, index) => (
                <div key={index} className='space-y-2'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <h4 className='font-medium'>{pub.title}</h4>
                      <div className='text-sm text-muted-foreground'>
                        {pub.authors.join(', ')}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        {pub.journal} • {formatDate(pub.publicationDate)}
                        {pub.citations && ` • ${pub.citations} citations`}
                      </div>
                      {pub.doi && (
                        <div className='text-sm text-blue-600'>
                          DOI: {pub.doi}
                        </div>
                      )}
                    </div>
                    {isOwnProfile && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => onEditSection?.('publications', pub)}
                      >
                        <Edit className='w-4 h-4' />
                      </Button>
                    )}
                  </div>
                  {pub.abstract && (
                    <p className='text-sm text-muted-foreground'>
                      {pub.abstract}
                    </p>
                  )}
                  {index < displayData.publications.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      )}

      {/* Projects Section */}
      {displayData.projects && displayData.projects.length > 0 && (
        <Card>
          <CardHeader>
            <SectionHeader
              title='Projects'
              icon={<Code className='w-5 h-5' />}
              count={displayData.projects.length}
              section='projects'
              canEdit
            />
          </CardHeader>
          {expandedSections.projects && (
            <CardContent className='space-y-4'>
              {displayData.projects.map((project, index) => (
                <div key={index} className='space-y-2'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <h4 className='font-medium'>{project.name}</h4>
                        <Badge
                          className={getProjectStatusColor(project.status)}
                        >
                          {project.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        {project.description}
                      </p>
                      {project.technologies &&
                        project.technologies.length > 0 && (
                          <div className='flex flex-wrap gap-1 mt-2'>
                            {project.technologies.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant='outline'
                                className='text-xs'
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                    </div>
                    <div className='flex items-center gap-2'>
                      {project.githubUrl && (
                        <Button variant='ghost' size='sm' asChild>
                          <a
                            href={project.githubUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Code className='w-4 h-4' />
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button variant='ghost' size='sm' asChild>
                          <a
                            href={project.liveUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <ExternalLink className='w-4 h-4' />
                          </a>
                        </Button>
                      )}
                      {isOwnProfile && (
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => onEditSection?.('projects', project)}
                        >
                          <Edit className='w-4 h-4' />
                        </Button>
                      )}
                    </div>
                  </div>
                  {index < displayData.projects.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      )}

      {/* Languages Section */}
      {displayData.languages && displayData.languages.length > 0 && (
        <Card>
          <CardHeader>
            <SectionHeader
              title='Languages'
              icon={<Globe className='w-5 h-5' />}
              count={displayData.languages.length}
              section='languages'
              canEdit
            />
          </CardHeader>
          {expandedSections.languages && (
            <CardContent>
              <div className='flex flex-wrap gap-2'>
                {displayData.languages.map((language, index) => (
                  <Badge key={index} variant='outline'>
                    {language}
                  </Badge>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Experience Section (for professors) */}
      {displayData.experience && (
        <Card>
          <CardHeader>
            <SectionHeader
              title='Experience'
              icon={<User className='w-5 h-5' />}
              section='experience'
              canEdit
            />
          </CardHeader>
          {expandedSections.experience && (
            <CardContent>
              <p className='text-sm text-muted-foreground whitespace-pre-wrap'>
                {displayData.experience}
              </p>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
};

export default ProfileSections;
