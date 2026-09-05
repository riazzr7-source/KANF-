import React from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { ChatPanel } from '../chat/ChatPanel';
import { useAppStore } from '../store/useAppStore';
import { HomePage } from '../pages/HomePage';
import { TasksPage } from '../pages/TasksPage';
import { MemoryPage } from '../pages/MemoryPage';
import { ModelsPage } from '../pages/ModelsPage';
import { AppsPage } from '../pages/AppsPage';
import { SettingsPage } from '../pages/SettingsPage';

export const AppLayout: React.FC = () => {
  const { activeTab } = useAppStore();

  const renderCanvasContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'tasks':
        return <TasksPage />;
      case 'memory':
        return <MemoryPage />;
      case 'models':
        return <ModelsPage />;
      case 'apps':
        return <AppsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0c0d0e] dark:bg-[#0c0d0e] light:bg-[#fbfbfb] text-neutral-200 dark:text-neutral-200 light:text-neutral-800 overflow-hidden font-sans select-none">
      {/* 1. TOP BAR */}
      <TopBar />

      {/* 2. MAIN 3-COLUMN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center Dynamic Canvas */}
        <main className="flex-1 flex flex-col bg-[#0c0d0e] dark:bg-[#0c0d0e] light:bg-[#fbfbfb] overflow-hidden relative">
          {renderCanvasContent()}
        </main>

        {/* Right Chat Panel */}
        <ChatPanel />
      </div>

      {/* 3. BOTTOM STATUS BAR */}
      <StatusBar />
    </div>
  );
};
