import { ChatMessage, ModelProvider } from '../types';

// Check if running in Tauri environment
export const isTauri = (): boolean => {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
};

// Lazy dynamic invoke to avoid crashes when @tauri-apps/api/core is called outside Tauri
async function invokeBackend<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  if (isTauri()) {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      return await invoke<T>(cmd, args);
    } catch (err) {
      console.warn(`[TauriBridge] Native call ${cmd} failed, falling back to local store:`, err);
    }
  }
  return fallbackHandlers(cmd, args) as Promise<T>;
}

// Browser fallback storage simulation
const LS_SETTINGS_KEY = 'kanf_v0_settings';
const LS_MODELS_KEY = 'kanf_v0_models';
const LS_CHAT_KEY = 'kanf_v0_chat';

const defaultProviders: ModelProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'GPT-4o, o3-mini, GPT-4 Turbo',
    api_key_masked: '',
    default_model: 'gpt-4o',
    is_connected: false,
    updated_at: 0,
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Claude 3.5 Sonnet, Claude 3.7 Sonnet',
    api_key_masked: '',
    default_model: 'claude-3-7-sonnet-latest',
    is_connected: false,
    updated_at: 0,
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Gemini 2.5 Pro, Gemini 2.5 Flash',
    api_key_masked: '',
    default_model: 'gemini-2.5-flash',
    is_connected: false,
    updated_at: 0,
  },
  {
    id: 'local_ai',
    name: 'Local AI',
    description: 'Ollama, LM Studio, vLLM Local Server',
    api_key_masked: '',
    base_url: 'http://localhost:11434/v1',
    default_model: 'llama3:8b',
    is_connected: false,
    updated_at: 0,
  },
  {
    id: 'custom_api',
    name: 'Custom API',
    description: 'OpenAI-compatible inference endpoint',
    api_key_masked: '',
    base_url: '',
    default_model: '',
    is_connected: false,
    updated_at: 0,
  },
];

async function fallbackHandlers(cmd: string, args?: Record<string, unknown>): Promise<unknown> {
  switch (cmd) {
    case 'get_all_settings': {
      const stored = localStorage.getItem(LS_SETTINGS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Object.entries(parsed).map(([key, value]) => ({ key, value: String(value) }));
      }
      return [
        { key: 'theme', value: 'system' },
        { key: 'lightweight_mode', value: 'true' },
        { key: 'reduce_animations', value: 'false' },
        { key: 'start_on_boot', value: 'false' },
        { key: 'minimize_to_tray', value: 'true' },
        { key: 'run_in_background', value: 'false' },
        { key: 'debug_logs', value: 'false' },
        { key: 'show_runtime_status', value: 'true' },
      ];
    }
    case 'save_setting': {
      const stored = localStorage.getItem(LS_SETTINGS_KEY);
      const parsed = stored ? JSON.parse(stored) : {};
      if (args && args.key) {
        parsed[args.key as string] = args.value;
        localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(parsed));
      }
      return null;
    }
    case 'get_model_providers': {
      const stored = localStorage.getItem(LS_MODELS_KEY);
      if (stored) {
        const saved = JSON.parse(stored) as ModelProvider[];
        // Merge with defaults to ensure all providers are present
        return defaultProviders.map((def) => {
          const match = saved.find((s) => s.id === def.id);
          return match ? { ...def, ...match } : def;
        });
      }
      return defaultProviders;
    }
    case 'save_model_provider': {
      if (args && args.provider) {
        const provider = args.provider as ModelProvider;
        const stored = localStorage.getItem(LS_MODELS_KEY);
        const list: ModelProvider[] = stored ? JSON.parse(stored) : [...defaultProviders];
        const index = list.findIndex((p) => p.id === provider.id);
        if (index >= 0) {
          list[index] = provider;
        } else {
          list.push(provider);
        }
        localStorage.setItem(LS_MODELS_KEY, JSON.stringify(list));
      }
      return null;
    }
    case 'get_chat_history': {
      const stored = localStorage.getItem(LS_CHAT_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    case 'save_chat_message': {
      if (args && args.msg) {
        const msg = args.msg as ChatMessage;
        const stored = localStorage.getItem(LS_CHAT_KEY);
        const list: ChatMessage[] = stored ? JSON.parse(stored) : [];
        list.push(msg);
        localStorage.setItem(LS_CHAT_KEY, JSON.stringify(list));
      }
      return null;
    }
    case 'clear_chat_history': {
      localStorage.removeItem(LS_CHAT_KEY);
      return null;
    }
    case 'get_system_info': {
      return {
        name: 'KANF V0',
        version: '0.1.0',
        status: 'System Ready',
        os: 'windows',
        arch: 'x86_64',
      };
    }
    default:
      return null;
  }
}

// Public API
export const api = {
  // Settings
  async getAllSettings(): Promise<Record<string, string>> {
    const raw = await invokeBackend<{ key: string; value: string }[]>('get_all_settings');
    const result: Record<string, string> = {};
    if (Array.isArray(raw)) {
      for (const item of raw) {
        result[item.key] = item.value;
      }
    }
    return result;
  },

  async saveSetting(key: string, value: string): Promise<void> {
    await invokeBackend<void>('save_setting', { key, value });
  },

  // Model Providers
  async getModelProviders(): Promise<ModelProvider[]> {
    const data = await invokeBackend<ModelProvider[]>('get_model_providers');
    // Ensure all standard providers exist
    const map = new Map<string, ModelProvider>();
    for (const def of defaultProviders) {
      map.set(def.id, def);
    }
    if (Array.isArray(data)) {
      for (const p of data) {
        const def = map.get(p.id);
        map.set(p.id, { ...def, ...p, name: def?.name || p.name, description: def?.description || '' });
      }
    }
    return Array.from(map.values());
  },

  async saveModelProvider(provider: ModelProvider): Promise<void> {
    await invokeBackend<void>('save_model_provider', { provider });
  },

  async deleteModelProvider(id: string): Promise<void> {
    await invokeBackend<void>('delete_model_provider', { id });
  },

  // Chat
  async getChatHistory(limit = 100): Promise<ChatMessage[]> {
    const data = await invokeBackend<ChatMessage[]>('get_chat_history', { limit });
    return Array.isArray(data) ? data : [];
  },

  async saveChatMessage(msg: ChatMessage): Promise<void> {
    await invokeBackend<void>('save_chat_message', { msg });
  },

  async clearChatHistory(): Promise<void> {
    await invokeBackend<void>('clear_chat_history');
  },

  async getSystemInfo() {
    return await invokeBackend<{ name: string; version: string; status: string; os: string; arch: string }>('get_system_info');
  },
};
