import React from 'react';
import { useAppStore } from '../store/useAppStore';

export const StatusBar: React.FC = () => {
  const { systemStatus } = useAppStore();

  const indicators = [
    { label: 'Models', active: systemStatus.models },
    { label: 'PC', active: systemStatus.pc },
    { label: 'Browser', active: systemStatus.browser },
    { label: 'Terminal', active: systemStatus.terminal },
    { label: 'Runtime', active: systemStatus.runtime },
  ];

  return (
    <footer className="h-6 bg-[#0a0a0b] dark:bg-[#0a0a0b] light:bg-[#f1f2f4] border-t border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 flex items-center justify-between px-3 text-[10px] text-neutral-400 dark:text-neutral-400 light:text-neutral-600 select-none shrink-0 font-mono">
      <div className="flex items-center gap-4">
        {indicators.map((ind) => (
          <div key={ind.label} className="flex items-center gap-1.5">
            <span className="text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
              {ind.label}
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full inline-block ${
                ind.active
                  ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]'
                  : 'bg-neutral-600 dark:bg-neutral-600 light:bg-neutral-400'
              }`}
            />
          </div>
        ))}
      </div>

      <div className="text-[10px] text-neutral-500 dark:text-neutral-500 light:text-neutral-400">
        Phase 1 Foundation
      </div>
    </footer>
  );
};
