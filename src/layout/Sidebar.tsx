import React from 'react';
import {
  Home,
  CheckSquare,
  Brain,
  Cpu,
  Layers,
  Settings,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { NavTab } from '../types';

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'memory', label: 'Memory', icon: Brain },
  { id: 'models', label: 'Models', icon: Cpu },
  { id: 'apps', label: 'Apps', icon: Layers },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <aside className="w-48 bg-[#0f1011] dark:bg-[#0f1011] light:bg-[#f3f4f6] border-r border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 flex flex-col justify-between p-2 select-none shrink-0">
      {/* Navigation section */}
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-medium tracking-wider text-neutral-500 dark:text-neutral-500 light:text-neutral-400 uppercase">
          Workspace
        </div>

        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-all duration-150 text-left cursor-pointer ${
                  isActive
                    ? 'bg-neutral-800/90 dark:bg-neutral-800/90 light:bg-white text-white dark:text-white light:text-neutral-900 shadow-sm border border-neutral-700/60 dark:border-neutral-700/60 light:border-neutral-200/80'
                    : 'text-neutral-400 dark:text-neutral-400 light:text-neutral-600 hover:text-neutral-200 dark:hover:text-neutral-200 light:hover:text-neutral-900 hover:bg-neutral-800/40 dark:hover:bg-neutral-800/40 light:hover:bg-neutral-200/60 border border-transparent'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? 'text-neutral-100 dark:text-neutral-100 light:text-neutral-900'
                      : 'text-neutral-500 dark:text-neutral-500 light:text-neutral-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer workspace tag */}
      <div className="px-3 py-2 border-t border-neutral-800/50 dark:border-neutral-800/50 light:border-neutral-200/70">
        <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-500 light:text-neutral-400 font-mono">
          <span>v0.1.0</span>
          <span>x64</span>
        </div>
      </div>
    </aside>
  );
};
