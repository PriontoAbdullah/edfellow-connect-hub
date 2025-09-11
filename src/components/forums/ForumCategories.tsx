import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Users,
  Clock,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Briefcase,
  Laptop,
  Users2,
  Building,
  MessageCircle,
  TrendingUp,
} from 'lucide-react';
import { getForumCategories, type ForumCategory } from '@/lib/api/forums';

interface ForumCategoriesProps {
  compact?: boolean;
  onCategorySelect?: (category: ForumCategory) => void;
}

export const ForumCategories: React.FC<ForumCategoriesProps> = ({
  compact = false,
  onCategorySelect,
}) => {
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await getForumCategories();

      if (error) {
        console.error('Error fetching forum categories:', error);
        return;
      }

      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching forum categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'general':
        return <MessageSquare className='w-5 h-5' />;
      case 'academic-support':
        return <GraduationCap className='w-5 h-5' />;
      case 'research':
        return <TrendingUp className='w-5 h-5' />;
      case 'career':
        return <Briefcase className='w-5 h-5' />;
      case 'technology':
        return <Laptop className='w-5 h-5' />;
      case 'study-groups':
        return <Users2 className='w-5 h-5' />;
      case 'university-life':
        return <Building className='w-5 h-5' />;
      case 'off-topic':
        return <MessageCircle className='w-5 h-5' />;
      default:
        return <BookOpen className='w-5 h-5' />;
    }
  };

  const getCategoryColor = (slug: string) => {
    switch (slug) {
      case 'general':
        return 'text-blue-600';
      case 'academic-support':
        return 'text-green-600';
      case 'research':
        return 'text-purple-600';
      case 'career':
        return 'text-orange-600';
      case 'technology':
        return 'text-indigo-600';
      case 'study-groups':
        return 'text-pink-600';
      case 'university-life':
        return 'text-red-600';
      case 'off-topic':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatLastActivity = (dateString?: string) => {
    if (!dateString) return 'No recent activity';

    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='space-y-3'>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className='h-20 bg-gray-200 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium'>Forum Categories</h3>
          <Badge variant='outline'>{categories.length}</Badge>
        </div>

        <div className='space-y-2'>
          {categories.slice(0, 5).map((category) => (
            <div
              key={category.id}
              className='flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer'
              onClick={() => onCategorySelect?.(category)}
            >
              <div className={`${getCategoryColor(category.slug)}`}>
                {getCategoryIcon(category.slug)}
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium truncate'>{category.name}</p>
                <p className='text-xs text-muted-foreground'>
                  {category.thread_count || 0} threads
                </p>
              </div>
              <ChevronRight className='w-4 h-4 text-muted-foreground' />
            </div>
          ))}
        </div>

        {categories.length > 5 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({categories.length})
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h3 className='text-lg font-semibold'>Forum Categories</h3>
        <p className='text-sm text-muted-foreground'>
          Browse discussions by topic
        </p>
      </div>

      {/* Categories Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {categories.map((category) => (
          <Card
            key={category.id}
            className='hover:shadow-md transition-shadow cursor-pointer'
            onClick={() => onCategorySelect?.(category)}
          >
            <CardHeader className='pb-3'>
              <div className='flex items-start gap-3'>
                <div
                  className={`p-2 rounded-lg bg-gray-100 ${getCategoryColor(
                    category.slug
                  )}`}
                >
                  {getCategoryIcon(category.slug)}
                </div>

                <div className='flex-1 min-w-0'>
                  <CardTitle className='text-base truncate'>
                    {category.name}
                  </CardTitle>
                  <p className='text-sm text-muted-foreground mt-1 line-clamp-2'>
                    {category.description}
                  </p>
                </div>

                <ChevronRight className='w-5 h-5 text-muted-foreground flex-shrink-0' />
              </div>
            </CardHeader>

            <CardContent className='pt-0'>
              <div className='flex items-center justify-between text-sm text-muted-foreground'>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-1'>
                    <MessageSquare className='w-4 h-4' />
                    <span>{category.thread_count || 0}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Users className='w-4 h-4' />
                    <span>{category.reply_count || 0}</span>
                  </div>
                </div>

                <div className='flex items-center gap-1'>
                  <Clock className='w-4 h-4' />
                  <span>{formatLastActivity(category.last_activity)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subcategories */}
      {categories.some(
        (cat) => cat.subcategories && cat.subcategories.length > 0
      ) && (
        <div className='space-y-4'>
          <h4 className='text-md font-medium'>Subcategories</h4>
          {categories.map(
            (category) =>
              category.subcategories &&
              category.subcategories.length > 0 && (
                <div key={category.id} className='space-y-2'>
                  <h5 className='text-sm font-medium text-muted-foreground'>
                    {category.name}
                  </h5>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                    {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className='flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer'
                        onClick={() => onCategorySelect?.(subcategory)}
                      >
                        <div
                          className={`${getCategoryColor(subcategory.slug)}`}
                        >
                          {getCategoryIcon(subcategory.slug)}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium truncate'>
                            {subcategory.name}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            {subcategory.thread_count || 0} threads
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};
