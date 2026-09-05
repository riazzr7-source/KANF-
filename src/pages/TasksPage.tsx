import React from 'react';
import { CheckSquare, ListFilter, Plus } from 'lucide-react';
import { Button } from '../components/common/Button';

export const TasksPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            Tasks
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 light:text-neutral-600 mt-1">
            Task planner and execution queue.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" icon={<ListFilter className="w-3.5 h-3.5" />}>
            Filter
          </Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
            New Task
          </Button>
        </div>
      </div>

      {/* Structured Schema View / Table Header */}
      <div className="mt-6 border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 rounded-lg overflow-hidden bg-[#111214] dark:bg-[#111214] light:bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-[#16171a] dark:bg-[#16171a] light:bg-neutral-100 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 text-[11px] font-medium text-neutral-400 dark:text-neutral-400 light:text-neutral-600 font-mono">
          <div className="col-span-4">TASK NAME</div>
          <div className="col-span-2">STATUS</div>
          <div className="col-span-2">CURRENT STEP</div>
          <div className="col-span-2">MODEL</div>
          <div className="col-span-1">APP</div>
          <div className="col-span-1 text-right">CREATED</div>
        </div>

        {/* Empty State */}
        <div className="py-16 flex flex-col items-center justify-center text-center p-6">
          <div className="w-10 h-10 rounded-full bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 flex items-center justify-center mb-3">
            <CheckSquare className="w-4 h-4 text-neutral-500" />
          </div>
          <p className="text-xs font-semibold text-neutral-300 dark:text-neutral-300 light:text-neutral-800">
            No active tasks.
          </p>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-500 light:text-neutral-500 max-w-sm mt-1">
            When you assign instructions or workflows to KANF, autonomous step-by-step progress will display in this pipeline.
          </p>
        </div>
      </div>
    </div>
  );
};
