import React, { useState, useRef, useEffect } from 'react';
import { countries, getCountryCode } from '../../lib/countries';
import { CountryFlag } from './CountryFlag';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  name,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedCountry = countries.find((country) => country.name === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
      >
        <div className='flex items-center gap-2'>
          {selectedCountry ? (
            <>
              <CountryFlag code={selectedCountry.code} size={16} />
              <span className='text-sm'>{selectedCountry.name}</span>
            </>
          ) : (
            <span className='text-gray-500 text-sm'>Select country</span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className='h-4 w-4 text-gray-400' />
        ) : (
          <ChevronDown className='h-4 w-4 text-gray-400' />
        )}
      </button>

      {isOpen && (
        <div className='absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto'>
          {countries.map((country) => (
            <button
              key={country.code || country.name}
              type='button'
              onClick={() => {
                onChange(country.name);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                country.name === value
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-900'
              }`}
            >
              <CountryFlag code={country.code} size={16} />
              <span>{country.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
