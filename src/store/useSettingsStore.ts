import { create } from 'zustand';
import { AppSettings, ThemeMode } from '../types';
import { api } from '../utils/tauriBridge';

interface SettingsState {
  settings: AppSettings;
  isLoading: boolean;
  loadSettings: () => Promise<void>;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => Promise<void>;
  setTheme: (theme: ThemeMode) => Promise<void>;
}

const defaultSettings: AppSettings = {
  theme: 'system',
  start_on_boot: false,
  minimize_to_tray: true,
  run_in_background: false,
  lightweight_mode: true,
  reduce_animations: false,
  background_activity: 'Low',
  debug_logs: false,
  show_runtime_status: true,
};

function applyThemeToDom(theme: ThemeMode) {
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
  }
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: defaultSettings,
  isLoading: true,

  loadSettings: async () => {
    try {
      const raw = await api.getAllSettings();
      const current = { ...defaultSettings };

      if (raw.theme) current.theme = raw.theme as ThemeMode;
      if (raw.start_on_boot !== undefined) current.start_on_boot = raw.start_on_boot === 'true';
      if (raw.minimize_to_tray !== undefined) current.minimize_to_tray = raw.minimize_to_tray === 'true';
      if (raw.run_in_background !== undefined) current.run_in_background = raw.run_in_background === 'true';
      if (raw.lightweight_mode !== undefined) current.lightweight_mode = raw.lightweight_mode === 'true';
      if (raw.reduce_animations !== undefined) current.reduce_animations = raw.reduce_animations === 'true';
      if (raw.background_activity) current.background_activity = raw.background_activity;
      if (raw.debug_logs !== undefined) current.debug_logs = raw.debug_logs === 'true';
      if (raw.show_runtime_status !== undefined) current.show_runtime_status = raw.show_runtime_status === 'true';

      applyThemeToDom(current.theme);
      set({ settings: current, isLoading: false });
    } catch (e) {
      console.error('Failed to load settings:', e);
      applyThemeToDom(defaultSettings.theme);
      set({ settings: defaultSettings, isLoading: false });
    }
  },

  updateSetting: async <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const updated = { ...get().settings, [key]: value };
    set({ settings: updated });
    if (key === 'theme') {
      applyThemeToDom(value as ThemeMode);
    }
    try {
      await api.saveSetting(key as string, String(value));
    } catch (e) {
      console.error(`Failed to save setting ${key}:`, e);
    }
  },

  setTheme: async (theme: ThemeMode) => {
    await get().updateSetting('theme', theme);
  },
}));

// Listen to OS theme changes if theme is system
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const currentTheme = useSettingsStore.getState().settings.theme;
    if (currentTheme === 'system') {
      applyThemeToDom('system');
    }
  });
}
