import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-md focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-xs px-3.5 py-1.5 gap-2',
    lg: 'text-sm px-4 py-2 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-neutral-100 text-neutral-900 hover:bg-white dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white shadow-sm font-semibold',
    secondary:
      'bg-neutral-900/60 hover:bg-neutral-800/80 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 dark:bg-neutral-900/80 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-white light:bg-neutral-100 light:text-neutral-700 light:border-neutral-300 light:hover:bg-neutral-200',
    ghost:
      'bg-transparent hover:bg-neutral-800/50 text-neutral-400 hover:text-neutral-200 dark:hover:bg-neutral-800/60 light:text-neutral-600 light:hover:bg-neutral-200/70',
    danger:
      'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/30',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
