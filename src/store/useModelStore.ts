import { create } from 'zustand';
import { ModelProvider } from '../types';
import { api } from '../utils/tauriBridge';
import { useAppStore } from './useAppStore';

interface ModelStoreState {
  providers: ModelProvider[];
  isLoading: boolean;
  activeConfigModalProvider: ModelProvider | null;
  loadProviders: () => Promise<void>;
  openConfigModal: (provider: ModelProvider) => void;
  closeConfigModal: () => void;
  saveProviderConfig: (
    id: string,
    apiKey: string,
    baseUrl?: string,
    defaultModel?: string
  ) => Promise<void>;
  disconnectProvider: (id: string) => Promise<void>;
}

// Utility to mask API key: e.g. "sk-abc...xyz" or "••••••••••••1234"
export function maskApiKey(rawKey: string): string {
  if (!rawKey || rawKey.trim().length === 0) return '';
  const trimmed = rawKey.trim();
  if (trimmed.length <= 8) {
    return '••••••••';
  }
  const prefix = trimmed.slice(0, 4);
  const suffix = trimmed.slice(-4);
  return `${prefix}••••••••${suffix}`;
}

export const useModelStore = create<ModelStoreState>((set, get) => ({
  providers: [],
  isLoading: true,
  activeConfigModalProvider: null,

  loadProviders: async () => {
    try {
      const list = await api.getModelProviders();
      set({ providers: list, isLoading: false });

      // Check if any provider is connected and update system status
      const hasConnected = list.some((p) => p.is_connected);
      useAppStore.getState().updateStatus('models', hasConnected);
    } catch (err) {
      console.error('Failed to load model providers:', err);
      set({ isLoading: false });
    }
  },

  openConfigModal: (provider) => {
    set({ activeConfigModalProvider: provider });
  },

  closeConfigModal: () => {
    set({ activeConfigModalProvider: null });
  },

  saveProviderConfig: async (id, apiKey, baseUrl, defaultModel) => {
    const existing = get().providers.find((p) => p.id === id);
    if (!existing) return;

    // Mask key if a new one was provided, otherwise keep existing masked
    let masked = existing.api_key_masked;
    if (apiKey && !apiKey.includes('••••')) {
      masked = maskApiKey(apiKey);
    }

    const isConnected = !!(masked && masked.length > 0) || id === 'local_ai';

    const updated: ModelProvider = {
      ...existing,
      api_key_masked: masked,
      base_url: baseUrl?.trim() || existing.base_url || '',
      default_model: defaultModel?.trim() || existing.default_model || '',
      is_connected: isConnected,
      updated_at: Date.now(),
    };

    const newProviders = get().providers.map((p) => (p.id === id ? updated : p));
    set({ providers: newProviders, activeConfigModalProvider: null });

    const hasConnected = newProviders.some((p) => p.is_connected);
    useAppStore.getState().updateStatus('models', hasConnected);

    try {
      await api.saveModelProvider(updated);
    } catch (err) {
      console.error('Failed to persist model provider:', err);
    }
  },

  disconnectProvider: async (id) => {
    const existing = get().providers.find((p) => p.id === id);
    if (!existing) return;

    const updated: ModelProvider = {
      ...existing,
      api_key_masked: '',
      is_connected: false,
      updated_at: Date.now(),
    };

    const newProviders = get().providers.map((p) => (p.id === id ? updated : p));
    set({ providers: newProviders });

    const hasConnected = newProviders.some((p) => p.is_connected);
    useAppStore.getState().updateStatus('models', hasConnected);

    try {
      await api.saveModelProvider(updated);
    } catch (err) {
      console.error('Failed to disconnect provider:', err);
    }
  },
}));
