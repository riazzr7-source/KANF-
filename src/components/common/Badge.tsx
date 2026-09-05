import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  status?: 'ready' | 'inactive' | 'warning' | 'neutral';
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  status = 'neutral',
  children,
  dot = true,
  className,
}) => {
  const dotColors = {
    ready: 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]',
    inactive: 'bg-neutral-500',
    warning: 'bg-amber-500',
    neutral: 'bg-neutral-400',
  };

  const badgeStyles = {
    ready: 'text-emerald-400 dark:text-emerald-400 light:text-emerald-700 bg-emerald-500/10 border-emerald-500/20',
    inactive: 'text-neutral-400 dark:text-neutral-400 light:text-neutral-600 bg-neutral-500/10 border-neutral-700/40 light:border-neutral-300',
    warning: 'text-amber-400 dark:text-amber-400 light:text-amber-700 bg-amber-500/10 border-amber-500/20',
    neutral: 'text-neutral-300 dark:text-neutral-300 light:text-neutral-700 bg-neutral-800/40 border-neutral-700/40 light:bg-neutral-100 light:border-neutral-300',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border tracking-wide select-none',
        badgeStyles[status],
        className
      )}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[status])} />}
      {children}
    </span>
  );
};
