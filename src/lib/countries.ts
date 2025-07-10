export const countries = [
  { name: 'United States', code: 'us' },
  { name: 'United Kingdom', code: 'gb' },
  { name: 'Canada', code: 'ca' },
  { name: 'Australia', code: 'au' },
  { name: 'Germany', code: 'de' },
  { name: 'France', code: 'fr' },
  { name: 'Netherlands', code: 'nl' },
  { name: 'Sweden', code: 'se' },
  { name: 'Japan', code: 'jp' },
  { name: 'South Korea', code: 'kr' },
  { name: 'Singapore', code: 'sg' },
  { name: 'India', code: 'in' },
  { name: 'China', code: 'cn' },
  { name: 'Brazil', code: 'br' },
  { name: 'Mexico', code: 'mx' },
  { name: 'Other', code: '' },
];

export function getCountryCode(name: string): string | undefined {
  return countries.find((c) => c.name === name)?.code;
}
