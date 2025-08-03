import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  User,
  GraduationCap,
  Building2,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';

interface GlobalNavbarProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    role: string;
  };
}

const GlobalNavbar = ({ isAuthenticated = false, user }: GlobalNavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Mentorship', href: '/mentorship' },
    { name: 'Forum', href: '/forum' },
    { name: 'Opportunities', href: '/opportunities' },
    { name: 'Recent Posts', href: '/recent-posts' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleSignUp = (role?: string) => {
    if (role) {
      navigate('/signup', { state: { role } });
    } else {
      navigate('/signup');
    }
  };

  return (
    <header className='sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex items-center space-x-3'>
            <img
              src='/logo.png'
              alt='Edfellow'
              className='w-14 h-14 rounded-full'
            />
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                Edfellow
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                }}
                className={`transition-colors font-medium ${
                  isActive(item.href)
                    ? 'text-[#007BFF]'
                    : 'text-gray-700 hover:text-[#007BFF]'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className='flex items-center space-x-4'>
            {isAuthenticated ? (
              <div className='flex items-center space-x-4'>
                <span className='text-sm text-gray-600'>
                  Welcome, {user?.name}
                </span>
                <Button
                  onClick={() => navigate('/dashboard')}
                  className='bg-gradient-to-r from-[#007BFF] to-[#0B1B4D] hover:from-[#0056b3] hover:to-[#0B1B4D] text-white'
                >
                  Dashboard
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant='outline'
                  onClick={() => navigate('/login')}
                  className='border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white transition-colors'
                >
                  Log In
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      onClick={() => handleSignUp()}
                      className='bg-gradient-to-r from-[#007BFF] to-[#0B1B4D] hover:from-[#0056b3] hover:to-[#0B1B4D] text-white transition-colors'
                    >
                      Sign Up
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-64'>
                    <DropdownMenuItem
                      onClick={() => handleSignUp('student')}
                      className='flex items-center gap-3 p-3'
                    >
                      <User className='h-5 w-5 text-blue-600' />
                      <div>
                        <div className='font-semibold text-gray-900'>
                          Student
                        </div>
                        <div className='text-sm text-gray-600'>
                          Connect with peers and professors
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSignUp('professor')}
                      className='flex items-center gap-3 p-3'
                    >
                      <GraduationCap className='h-5 w-5 text-green-600' />
                      <div>
                        <div className='font-semibold text-gray-900'>
                          Professor
                        </div>
                        <div className='text-sm text-gray-600'>
                          Share expertise and mentor students
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSignUp('university')}
                      className='flex items-center gap-3 p-3'
                    >
                      <Building2 className='h-5 w-5 text-orange-600' />
                      <div>
                        <div className='font-semibold text-gray-900'>
                          University
                        </div>
                        <div className='text-sm text-gray-600'>
                          Promote programs and connect with students
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='md:hidden p-2 rounded-md text-gray-700 hover:text-[#007BFF] hover:bg-gray-100'
            >
              {isMobileMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200'>
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-[#007BFF] bg-blue-50'
                      : 'text-gray-700 hover:text-[#007BFF] hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              {!isAuthenticated && (
                <div className='pt-4 space-y-2'>
                  <Button
                    variant='outline'
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                    className='w-full border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white'
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => {
                      handleSignUp();
                      setIsMobileMenuOpen(false);
                    }}
                    className='w-full bg-gradient-to-r from-[#007BFF] to-[#0B1B4D] hover:from-[#0056b3] hover:to-[#0B1B4D] text-white'
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default GlobalNavbar;
