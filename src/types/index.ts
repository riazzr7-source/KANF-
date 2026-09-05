export type NavTab = 'home' | 'tasks' | 'memory' | 'models' | 'apps' | 'settings';

export type ThemeMode = 'system' | 'light' | 'dark';

export interface AppSettings {
  theme: ThemeMode;
  start_on_boot: boolean;
  minimize_to_tray: boolean;
  run_in_background: boolean;
  lightweight_mode: boolean;
  reduce_animations: boolean;
  background_activity: string;
  debug_logs: boolean;
  show_runtime_status: boolean;
}

export interface ModelProvider {
  id: string;
  name: string;
  description: string;
  api_key_masked: string;
  base_url?: string;
  default_model?: string;
  is_connected: boolean;
  updated_at: number;
}

export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  created_at: number;
}

export interface SystemStatus {
  models: boolean;
  pc: boolean;
  browser: boolean;
  terminal: boolean;
  runtime: boolean;
}
