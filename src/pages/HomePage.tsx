import React from 'react';
import { useModelStore } from '../store/useModelStore';
import { useAppStore } from '../store/useAppStore';
import { ArrowRight, Cpu, Monitor, Play } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { providers } = useModelStore();
  const { setActiveTab } = useAppStore();

  const connectedProvider = providers.find((p) => p.is_connected);

  return (
    <div className="flex-1 flex flex-col justify-between p-8 overflow-y-auto">
      {/* Top Welcome Title */}
      <div className="max-w-2xl space-y-6 pt-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono bg-neutral-900/60 dark:bg-neutral-900/60 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Execution Architecture v0.1
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            KANF V0
          </h1>
          <p className="text-sm text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
            Ready to work.
          </p>
        </div>

        <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-500 light:text-neutral-600 max-w-lg">
          Connect intelligence. Give a command. Let KANF execute.
        </p>

        {/* Quick Action Button if no model connected */}
        {!connectedProvider ? (
          <button
            onClick={() => setActiveTab('models')}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-neutral-100 text-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 light:bg-neutral-900 light:text-white rounded-md hover:bg-white dark:hover:bg-white light:hover:bg-neutral-800 transition-all cursor-pointer shadow-sm"
          >
            <span>Connect your preferred AI model</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active Provider: {connectedProvider.name}
          </div>
        )}
      </div>

      {/* Subtle Visual Empty State */}
      <div className="my-8 py-10 flex flex-col items-center justify-center border border-dashed border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-300 rounded-xl bg-neutral-950/30 dark:bg-neutral-950/30 light:bg-neutral-50/50">
        <div className="w-12 h-12 rounded-xl bg-neutral-900/80 dark:bg-neutral-900/80 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 flex items-center justify-center mb-3 text-neutral-400">
          <Play className="w-5 h-5 text-neutral-500" />
        </div>
        <div className="text-xs font-medium text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
          Canvas Idle
        </div>
        <div className="text-[11px] text-neutral-500 dark:text-neutral-500 light:text-neutral-500 mt-1 max-w-sm text-center">
          Active task plans, workflow graphs, and execution results will be visualized here.
        </div>
      </div>

      {/* Status metrics bar */}
      <div className="pt-4 border-t border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200 grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#111214] dark:bg-[#111214] light:bg-neutral-100/80 border border-neutral-800/70 dark:border-neutral-800/70 light:border-neutral-200">
          <Cpu className="w-4 h-4 text-neutral-500" />
          <div className="space-y-0.5">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
              AI Model
            </div>
            <div className="text-xs font-medium text-neutral-300 dark:text-neutral-300 light:text-neutral-800">
              {connectedProvider ? connectedProvider.name : 'Not connected'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#111214] dark:bg-[#111214] light:bg-neutral-100/80 border border-neutral-800/70 dark:border-neutral-800/70 light:border-neutral-200">
          <Play className="w-4 h-4 text-neutral-500" />
          <div className="space-y-0.5">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
              Runtime
            </div>
            <div className="text-xs font-medium text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
              Not enabled
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#111214] dark:bg-[#111214] light:bg-neutral-100/80 border border-neutral-800/70 dark:border-neutral-800/70 light:border-neutral-200">
          <Monitor className="w-4 h-4 text-neutral-500" />
          <div className="space-y-0.5">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
              Computer
            </div>
            <div className="text-xs font-medium text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
              Not connected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
