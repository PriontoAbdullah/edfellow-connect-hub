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
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const selectedCountry = countries.find((country) => country.name === value);

  // Filter and sort countries by relevance
  const getFilteredCountries = () => {
    if (!searchQuery.trim()) {
      return countries;
    }

    const query = searchQuery.toLowerCase().trim();

    const filtered = countries.filter((country) => {
      const nameMatch = country.name.toLowerCase().includes(query);
      const codeMatch = country.code.toLowerCase().includes(query);
      return nameMatch || codeMatch;
    });

    // Sort by relevance: starts with query first, then contains query
    return filtered.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aStartsWith = aName.startsWith(query);
      const bStartsWith = bName.startsWith(query);

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return aName.localeCompare(bName);
    });
  };

  const filteredCountries = getFilteredCountries();

  const handleSelect = (countryName: string) => {
    onChange(countryName);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchQuery('');
    } else if (e.key === 'Enter' && filteredCountries.length > 0) {
      handleSelect(filteredCountries[0].name);
    }
  };

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
        <div className='absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-hidden'>
          <div className='p-2 border-b border-gray-200 sticky top-0 bg-white'>
            <input
              ref={searchInputRef}
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Type to search...'
              className='w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              autoComplete='off'
            />
          </div>
          <div className='max-h-60 overflow-y-auto'>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={`${country.code}-${country.name}`}
                  type='button'
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(country.name);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100 transition-colors ${
                    country.name === value
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-900'
                  }`}
                >
                  <CountryFlag code={country.code} size={16} />
                  <span>{country.name}</span>
                </button>
              ))
            ) : (
              <div className='px-3 py-4 text-sm text-gray-500 text-center'>
                No countries found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
