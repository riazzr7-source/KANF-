import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  className,
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-neutral-300 dark:text-neutral-300 light:text-neutral-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={twMerge(
          clsx(
            'w-full px-3 py-2 text-xs rounded-md border transition-all duration-150',
            'bg-[#0f1011] dark:bg-[#0f1011] light:bg-neutral-50',
            'text-neutral-200 dark:text-neutral-200 light:text-neutral-900',
            'border-neutral-800 dark:border-neutral-800 light:border-neutral-300',
            'focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-500 light:focus:border-neutral-600',
            'placeholder:text-neutral-600 dark:placeholder:text-neutral-600 light:placeholder:text-neutral-400',
            error && 'border-red-500/80 focus:border-red-500',
            className
          )
        )}
        {...props}
      />
      {helperText && !error && (
        <p className="text-[11px] text-neutral-500 dark:text-neutral-500 light:text-neutral-500">
          {helperText}
        </p>
      )}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
};
