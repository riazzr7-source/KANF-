import React from 'react';
import { Users, Building2, FolderGit2, Sliders, FileText } from 'lucide-react';

interface MemorySection {
  id: string;
  title: string;
  description: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
}

const memorySections: MemorySection[] = [
  {
    id: 'people',
    title: 'People',
    description: 'Key contacts, team members, stakeholders and collaborators.',
    count: 0,
    icon: Users,
  },
  {
    id: 'companies',
    title: 'Companies',
    description: 'Organizations, clients, vendors, and external business entities.',
    count: 0,
    icon: Building2,
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Repositories, directory trees, architectural guidelines and deliverables.',
    count: 0,
    icon: FolderGit2,
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Coding style guidelines, preferred tools, shortcuts and habits.',
    count: 0,
    icon: Sliders,
  },
  {
    id: 'instructions',
    title: 'Instructions',
    description: 'Custom system directives, execution rules and workspace guidelines.',
    count: 0,
    icon: FileText,
  },
];

export const MemoryPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
          Memory
        </h1>
        <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-1 max-w-xl">
          KANF memory will store project context, preferences and long-term working information.
        </p>
      </div>

      {/* Grid of memory categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {memorySections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div
              key={sec.id}
              className="p-4 rounded-xl bg-[#111214] dark:bg-[#111214] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200/90 shadow-sm hover:border-neutral-700/80 dark:hover:border-neutral-700/80 light:hover:border-neutral-300 transition-all cursor-default"
            >
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 flex items-center justify-center text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 bg-neutral-900/60 dark:bg-neutral-900/60 light:bg-neutral-100 px-2 py-0.5 rounded border border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
                  {sec.count} items
                </span>
              </div>

              <div className="mt-3">
                <h3 className="text-xs font-semibold text-neutral-200 dark:text-neutral-200 light:text-neutral-900">
                  {sec.title}
                </h3>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-1 leading-relaxed">
                  {sec.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
