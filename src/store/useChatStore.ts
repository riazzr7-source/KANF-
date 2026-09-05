import { create } from 'zustand';
import { ChatMessage } from '../types';
import { api } from '../utils/tauriBridge';
import { useModelStore } from './useModelStore';

interface ChatStoreState {
  messages: ChatMessage[];
  isLoading: boolean;
  isThinking: boolean;
  loadMessages: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  clearHistory: () => Promise<void>;
}

export const useChatStore = create<ChatStoreState>((set, get) => ({
  messages: [],
  isLoading: true,
  isThinking: false,

  loadMessages: async () => {
    try {
      const msgs = await api.getChatHistory(200);
      set({ messages: msgs, isLoading: false });
    } catch (err) {
      console.error('Failed to load chat history:', err);
      set({ isLoading: false });
    }
  },

  sendMessage: async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      role: 'user',
      content: trimmed,
      created_at: Date.now(),
    };

    // Update state immediately
    const updatedMessages = [...get().messages, userMsg];
    set({ messages: updatedMessages, isThinking: true });

    try {
      await api.saveChatMessage(userMsg);
    } catch (e) {
      console.error('Failed to save user message:', e);
    }

    // Generate Phase 1 mock response with subtle typing delay
    setTimeout(async () => {
      const providers = useModelStore.getState().providers;
      const connected = providers.find((p) => p.is_connected);

      let replyContent = 'KANF V0 is not connected to an AI model yet. Configure a model from Settings → Models.';
      if (connected) {
        replyContent = `KANF V0 (Phase 1 Shell) received your message. Model '${connected.name}' is configured. Live execution and tool automation will be enabled in subsequent phases.`;
      }

      const assistantMsg: ChatMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        role: 'assistant',
        content: replyContent,
        created_at: Date.now(),
      };

      const finalMessages = [...get().messages, assistantMsg];
      set({ messages: finalMessages, isThinking: false });

      try {
        await api.saveChatMessage(assistantMsg);
      } catch (e) {
        console.error('Failed to save assistant message:', e);
      }
    }, 450);
  },

  clearHistory: async () => {
    set({ messages: [] });
    try {
      await api.clearChatHistory();
    } catch (e) {
      console.error('Failed to clear chat history:', e);
    }
  },
}));
