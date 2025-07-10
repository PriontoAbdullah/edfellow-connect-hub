import { Heart, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LandingFooter() {
  const navigate = useNavigate();

  return (
    <footer className='bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12'>
          <div className='col-span-1 sm:col-span-2'>
            <div className='flex items-center space-x-3 mb-4 sm:mb-6'>
              <img
                src='/logo.png'
                alt='Edfellow'
                className='h-12 w-12 rounded-full'
              />
              <div>
                <span className='text-xl sm:text-2xl font-bold'>Edfellow</span>
                <p className='text-xs text-gray-400'>
                  Where Education Meets the World
                </p>
              </div>
            </div>
            <p className='text-gray-400 leading-relaxed mb-4 sm:mb-6 max-w-md text-sm sm:text-base'>
              Building bridges between students, professors, and universities
              globally. Empowering education through meaningful connections.
            </p>
          </div>

          <div>
            <h4 className='text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white'>
              Platform
            </h4>
            <ul className='space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base'>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  For Students
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  For Professors
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  For Universities
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white'>
              Company
            </h4>
            <ul className='space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base'>
              <li>
                <a
                  href='#'
                  onClick={() => navigate('/about')}
                  className='hover:text-white transition-colors'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='#'
                  onClick={() => navigate('/features')}
                  className='hover:text-white transition-colors'
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href='#'
                  onClick={() => navigate('/community')}
                  className='hover:text-white transition-colors'
                >
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 pt-6 sm:pt-8 text-center'>
          <p className='text-gray-400 text-sm sm:text-base'>
            © 2025 Edfellow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
