import React from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { Toggle } from '../components/common/Toggle';
import { ThemeMode } from '../types';
import { Sun, Moon, Monitor } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSetting, setTheme } = useSettingsStore();

  const themeOptions: { mode: ThemeMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { mode: 'system', label: 'System', icon: Monitor },
    { mode: 'dark', label: 'Dark', icon: Moon },
    { mode: 'light', label: 'Light', icon: Sun },
  ];

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
          Settings
        </h1>
        <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-1">
          Preferences, system behavior, and performance configuration.
        </p>
      </div>

      <div className="max-w-2xl space-y-8 mt-6">
        {/* General Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold text-neutral-400 dark:text-neutral-400 light:text-neutral-600 uppercase tracking-wider font-mono">
            General
          </h2>

          <div className="p-4 rounded-xl bg-[#111214] dark:bg-[#111214] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 divide-y divide-neutral-800/60 dark:divide-neutral-800/60 light:divide-neutral-100">
            {/* Theme Selector */}
            <div className="py-2 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-medium text-neutral-200 dark:text-neutral-200 light:text-neutral-800">
                  Appearance Theme
                </div>
                <div className="text-[11px] text-neutral-400 dark:text-neutral-400 light:text-neutral-500">
                  Select interface color mode.
                </div>
              </div>

              <div className="flex items-center gap-1 bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 p-1 rounded-lg border border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                {themeOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = settings.theme === opt.mode;

                  return (
                    <button
                      key={opt.mode}
                      onClick={() => setTheme(opt.mode)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-neutral-800 dark:bg-neutral-800 light:bg-white text-white dark:text-white light:text-neutral-900 shadow-sm'
                          : 'text-neutral-400 dark:text-neutral-400 light:text-neutral-600 hover:text-neutral-200 hover:bg-neutral-800/50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Toggle
              label="Start KANF on system startup"
              description="Automatically start KANF when you log in to Windows."
              checked={settings.start_on_boot}
              onChange={(val) => updateSetting('start_on_boot', val)}
            />

            <Toggle
              label="Minimize to tray"
              description="Keep KANF available in the notification tray when closed."
              checked={settings.minimize_to_tray}
              onChange={(val) => updateSetting('minimize_to_tray', val)}
            />

            <Toggle
              label="Run in background"
              description="Allow persistent background agent monitoring."
              checked={settings.run_in_background}
              onChange={(val) => updateSetting('run_in_background', val)}
            />
          </div>
        </div>

        {/* Performance Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold text-neutral-400 dark:text-neutral-400 light:text-neutral-600 uppercase tracking-wider font-mono">
            Performance
          </h2>

          <div className="p-4 rounded-xl bg-[#111214] dark:bg-[#111214] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 divide-y divide-neutral-800/60 dark:divide-neutral-800/60 light:divide-neutral-100">
            <Toggle
              label="Lightweight Mode"
              description="Optimized for low CPU and GPU usage on Intel i5 / integrated graphics."
              checked={settings.lightweight_mode}
              onChange={(val) => updateSetting('lightweight_mode', val)}
            />

            <Toggle
              label="Reduce animations"
              description="Disable transitions and visual effects to conserve system resources."
              checked={settings.reduce_animations}
              onChange={(val) => updateSetting('reduce_animations', val)}
            />

            <div className="py-2 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-medium text-neutral-200 dark:text-neutral-200 light:text-neutral-800">
                  Background Activity
                </div>
                <div className="text-[11px] text-neutral-400 dark:text-neutral-400 light:text-neutral-500">
                  Control CPU throttling when minimized.
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 rounded text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
                Low (Throttled)
              </span>
            </div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold text-neutral-400 dark:text-neutral-400 light:text-neutral-600 uppercase tracking-wider font-mono">
            Developer
          </h2>

          <div className="p-4 rounded-xl bg-[#111214] dark:bg-[#111214] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 divide-y divide-neutral-800/60 dark:divide-neutral-800/60 light:divide-neutral-100">
            <Toggle
              label="Enable debug logs"
              description="Write verbose internal execution telemetry to local log files."
              checked={settings.debug_logs}
              onChange={(val) => updateSetting('debug_logs', val)}
            />

            <Toggle
              label="Show runtime status"
              description="Display system connection indicators on the bottom status bar."
              checked={settings.show_runtime_status}
              onChange={(val) => updateSetting('show_runtime_status', val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
