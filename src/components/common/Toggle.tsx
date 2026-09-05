import React from 'react';

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="space-y-0.5 pr-4">
        <label className="text-xs font-medium text-neutral-200 dark:text-neutral-200 light:text-neutral-800 cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-[11px] text-neutral-400 dark:text-neutral-400 light:text-neutral-500">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed ${
          checked
            ? 'bg-neutral-200 dark:bg-neutral-200 light:bg-neutral-900'
            : 'bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked
              ? 'translate-x-4 bg-neutral-950 dark:bg-neutral-950 light:bg-white'
              : 'translate-x-0 bg-neutral-400 dark:bg-neutral-400 light:bg-white'
          }`}
        />
      </button>
    </div>
  );
};
