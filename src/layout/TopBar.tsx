import React from 'react';
import { Badge } from '../components/common/Badge';

export const TopBar: React.FC = () => {
  return (
    <header className="h-10 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 bg-[#0e0f10] dark:bg-[#0e0f10] light:bg-[#f8f9fa] flex items-center justify-between px-4 select-none shrink-0 drag-region">
      {/* Brand */}
      <div className="flex items-center gap-2.5 no-drag">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-neutral-200 dark:bg-neutral-200 light:bg-neutral-800" />
          <span className="text-xs font-semibold tracking-wider text-neutral-100 dark:text-neutral-100 light:text-neutral-900 uppercase">
            KANF V0
          </span>
        </div>
        <span className="text-[10px] text-neutral-500 dark:text-neutral-500 light:text-neutral-400 font-mono tracking-tight">
          Phase 1 Shell
        </span>
      </div>

      {/* System Status Indicator */}
      <div className="flex items-center gap-3 no-drag">
        <Badge status="ready">System Ready</Badge>
      </div>
    </header>
  );
};
