import { create } from 'zustand';
import { NavTab, SystemStatus } from '../types';

interface AppState {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  systemStatus: SystemStatus;
  updateStatus: (key: keyof SystemStatus, value: boolean) => void;
  chatCollapsed: boolean;
  setChatCollapsed: (collapsed: boolean) => void;
  toggleChatCollapsed: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
  systemStatus: {
    models: false,
    pc: false,
    browser: false,
    terminal: false,
    runtime: false,
  },
  updateStatus: (key, value) =>
    set((state) => ({
      systemStatus: {
        ...state.systemStatus,
        [key]: value,
      },
    })),
  chatCollapsed: false,
  setChatCollapsed: (collapsed) => set({ chatCollapsed: collapsed }),
  toggleChatCollapsed: () => set((state) => ({ chatCollapsed: !state.chatCollapsed })),
}));
