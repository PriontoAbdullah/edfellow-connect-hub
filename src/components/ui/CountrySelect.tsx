import React from 'react';
import { countries, getCountryCode } from '../../lib/countries';
import { CountryFlag } from './CountryFlag';

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
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name={name}
      className={className}
    >
      <option value=''>Select country</option>
      {countries.map((country) => (
        <option key={country.code || country.name} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;
