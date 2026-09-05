import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { Trash2 } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

export const ChatPanel: React.FC = () => {
  const { clearHistory, messages } = useChatStore();

  return (
    <aside className="w-80 bg-[#0c0d0e] dark:bg-[#0c0d0e] light:bg-[#ffffff] border-l border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 flex flex-col justify-between shrink-0 select-none">
      {/* Header */}
      <div className="h-10 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 px-3.5 flex items-center justify-between shrink-0 bg-[#0f1011] dark:bg-[#0f1011] light:bg-[#f9fafb]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-neutral-200 dark:text-neutral-200 light:text-neutral-900 tracking-wide">
            KANF
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 dark:text-emerald-400 light:text-emerald-700 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Ready
          </span>
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearHistory}
            title="Clear conversation"
            className="text-neutral-500 hover:text-neutral-300 dark:hover:text-neutral-300 light:hover:text-neutral-700 p-1 rounded hover:bg-neutral-800/60 dark:hover:bg-neutral-800/60 light:hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <MessageList />

      {/* Input */}
      <MessageInput />
    </aside>
  );
};
