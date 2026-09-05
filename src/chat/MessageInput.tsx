import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

export const MessageInput: React.FC = () => {
  const [text, setText] = useState('');
  const { sendMessage, isThinking } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!text.trim() || isThinking) return;
    sendMessage(text);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  return (
    <div className="p-3 border-t border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 bg-[#0f1011] dark:bg-[#0f1011] light:bg-[#f9fafb]">
      <div className="relative flex flex-col bg-[#141517] dark:bg-[#141517] light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 rounded-lg focus-within:border-neutral-600 dark:focus-within:border-neutral-600 light:focus-within:border-neutral-500 transition-colors">
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask KANF anything..."
          className="w-full px-3 py-2.5 text-xs bg-transparent text-neutral-200 dark:text-neutral-200 light:text-neutral-900 placeholder:text-neutral-500 dark:placeholder:text-neutral-500 light:placeholder:text-neutral-400 focus:outline-none resize-none max-h-32"
        />

        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          <button
            type="button"
            title="Voice input (Phase 2 capability placeholder)"
            className="text-neutral-500 hover:text-neutral-300 dark:hover:text-neutral-300 light:hover:text-neutral-700 p-1 rounded transition-colors cursor-not-allowed opacity-50"
            disabled
          >
            <Mic className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim() || isThinking}
            className="inline-flex items-center justify-center p-1.5 rounded-md bg-neutral-200 text-neutral-900 dark:bg-neutral-200 dark:text-neutral-900 light:bg-neutral-900 light:text-white hover:bg-white dark:hover:bg-white light:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="text-[10px] text-neutral-500 dark:text-neutral-500 light:text-neutral-400 text-center mt-1.5 font-mono">
        Shift + Enter for new line
      </div>
    </div>
  );
};
