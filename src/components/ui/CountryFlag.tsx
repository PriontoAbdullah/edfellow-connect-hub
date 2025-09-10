import React, { useState } from 'react';

interface CountryFlagProps {
  code?: string;
  size?: number;
  className?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  code,
  size = 20,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!code || hasError) {
    // Fallback to emoji flag or placeholder
    return (
      <div
        className={`inline-flex items-center justify-center rounded border bg-gray-100 ${className}`}
        style={{
          width: size,
          height: size * 0.75,
          fontSize: size * 0.6,
          minWidth: size,
        }}
        title={code ? `Flag for ${code.toUpperCase()}` : 'No country flag'}
      >
        🌍
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size * 0.75,
        minWidth: size,
        minHeight: size * 0.75,
      }}
    >
      {isLoading && (
        <div
          className='absolute inset-0 flex items-center justify-center bg-gray-200 rounded animate-pulse'
          style={{ width: size, height: size * 0.75 }}
        />
      )}
      <img
        src={`https://flagcdn.com/w${Math.max(
          40,
          size
        )}/${code.toLowerCase()}.png`}
        alt={`Flag of ${code.toUpperCase()}`}
        width={size}
        height={size * 0.75}
        className={`rounded border border-gray-200 ${
          isLoading ? 'hidden' : 'block'
        }`}
        style={{
          objectFit: 'cover',
          maxWidth: '100%',
          maxHeight: '100%',
          width: '100%',
          height: '100%',
        }}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={(e) => {
          setHasError(true);
          setIsLoading(false);
        }}
        loading='lazy'
      />
    </div>
  );
};
