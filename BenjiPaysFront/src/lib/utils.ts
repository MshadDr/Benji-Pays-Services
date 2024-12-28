import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^0-9.-]+/g, ''));
}

export const parseAndFormatCurrency = (value: string, setState: React.Dispatch<React.SetStateAction<any>>) => {
  const formattedValue = value.replace(/[^0-9.]/g, '');
  setState(formattedValue);
};