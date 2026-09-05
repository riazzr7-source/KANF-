import React from 'react';
import { Badge } from '../components/common/Badge';
import { MonitorPlay } from 'lucide-react';

interface AppItem {
  name: string;
  category: string;
  type: string;
}

const supportedApps: AppItem[] = [
  { name: 'AutoCAD', category: 'CAD & Engineering', type: 'Desktop Native' },
  { name: 'SketchUp', category: '3D Modeling', type: 'Desktop Native' },
  { name: 'VS Code', category: 'Code Editor', type: 'Desktop Native' },
  { name: 'Chrome', category: 'Browser', type: 'Web Engine' },
  { name: 'Excel', category: 'Spreadsheet', type: 'Office Suite' },
  { name: 'Photoshop', category: 'Design & Graphics', type: 'Desktop Native' },
];

export const AppsPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
          Applications
        </h1>
        <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-1 max-w-xl">
          KANF will later detect and operate installed applications using native automation, command interfaces and visual control.
        </p>
      </div>

      {/* App Ecosystem List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-6">
        {supportedApps.map((app) => (
          <div
            key={app.name}
            className="p-4 rounded-xl bg-[#111214] dark:bg-[#111214] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200/90 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 flex items-center justify-center text-neutral-400">
                <MonitorPlay className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-neutral-200 dark:text-neutral-200 light:text-neutral-900">
                  {app.name}
                </h3>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-400 light:text-neutral-500">
                  {app.category} • {app.type}
                </p>
              </div>
            </div>

            <Badge status="inactive">Not detected</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
