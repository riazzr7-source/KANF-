import React, { useEffect } from 'react';
import { AppLayout } from './layout/AppLayout';
import { useSettingsStore } from './store/useSettingsStore';
import { useModelStore } from './store/useModelStore';
import { useChatStore } from './store/useChatStore';

export const App: React.FC = () => {
  const { loadSettings } = useSettingsStore();
  const { loadProviders } = useModelStore();
  const { loadMessages } = useChatStore();

  useEffect(() => {
    // Initial data hydration from SQLite/storage
    loadSettings();
    loadProviders();
    loadMessages();
  }, [loadSettings, loadProviders, loadMessages]);

  return <AppLayout />;
};

export default App;
