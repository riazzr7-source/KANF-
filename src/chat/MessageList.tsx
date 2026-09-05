import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Bot, User } from 'lucide-react';

export const MessageList: React.FC = () => {
  const { messages, isThinking } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-neutral-500 dark:text-neutral-500 light:text-neutral-400">
        <div className="w-9 h-9 rounded-full bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 flex items-center justify-center mb-3">
          <Bot className="w-4 h-4 text-neutral-400 dark:text-neutral-400 light:text-neutral-600" />
        </div>
        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-400 light:text-neutral-700">
          KANF Conversation
        </p>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-500 light:text-neutral-400 max-w-[200px] mt-1">
          Direct communication channel with KANF execution framework.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3.5">
      {messages.map((msg) => {
        const isUser = msg.role === 'user';
        const formattedTime = new Date(msg.created_at).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        return (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                isUser
                  ? 'bg-neutral-800 text-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 light:bg-neutral-200 light:text-neutral-800'
                  : 'bg-blue-950/50 text-blue-400 border border-blue-800/40 dark:bg-blue-950/50 dark:text-blue-400 light:bg-blue-50 light:text-blue-700 light:border-blue-200'
              }`}
            >
              {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                isUser
                  ? 'bg-neutral-800 text-neutral-100 dark:bg-neutral-800 dark:text-neutral-100 light:bg-neutral-200 light:text-neutral-900'
                  : 'bg-[#141619] border border-neutral-800/80 text-neutral-300 dark:bg-[#141619] dark:border-neutral-800/80 dark:text-neutral-300 light:bg-white light:border-neutral-200 light:text-neutral-800 shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap break-words">{msg.content}</div>
              <div
                className={`text-[9px] mt-1 font-mono ${
                  isUser
                    ? 'text-neutral-400 text-right'
                    : 'text-neutral-500 dark:text-neutral-500 light:text-neutral-400 text-left'
                }`}
              >
                {formattedTime}
              </div>
            </div>
          </div>
        );
      })}

      {isThinking && (
        <div className="flex gap-2.5 flex-row items-center">
          <div className="w-6 h-6 rounded-md bg-blue-950/50 text-blue-400 border border-blue-800/40 flex items-center justify-center shrink-0">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div className="bg-[#141619] border border-neutral-800/80 rounded-lg px-3 py-2 text-xs text-neutral-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse delay-100" />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse delay-200" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};
