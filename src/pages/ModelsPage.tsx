import React, { useState, useEffect } from 'react';
import { useModelStore } from '../store/useModelStore';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Cpu, Check } from 'lucide-react';

export const ModelsPage: React.FC = () => {
  const {
    providers,
    activeConfigModalProvider,
    openConfigModal,
    closeConfigModal,
    saveProviderConfig,
    disconnectProvider,
  } = useModelStore();

  const [apiKeyInput, setApiKeyInput] = useState('');
  const [baseUrlInput, setBaseUrlInput] = useState('');
  const [defaultModelInput, setDefaultModelInput] = useState('');

  // Sync modal inputs when modal opens
  useEffect(() => {
    if (activeConfigModalProvider) {
      setApiKeyInput(activeConfigModalProvider.api_key_masked || '');
      setBaseUrlInput(activeConfigModalProvider.base_url || '');
      setDefaultModelInput(activeConfigModalProvider.default_model || '');
    }
  }, [activeConfigModalProvider]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConfigModalProvider) return;
    await saveProviderConfig(
      activeConfigModalProvider.id,
      apiKeyInput,
      baseUrlInput,
      defaultModelInput
    );
  };

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            Models
          </h1>
          <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-1">
            Connect AI inference providers. KANF remains model-agnostic.
          </p>
        </div>

        <div className="text-right">
          <Badge status={providers.some((p) => p.is_connected) ? 'ready' : 'inactive'}>
            {providers.filter((p) => p.is_connected).length} Connected
          </Badge>
        </div>
      </div>

      {/* Provider Cards */}
      <div className="space-y-3 mt-6">
        {providers.map((provider) => {
          const isConnected = provider.is_connected;

          return (
            <div
              key={provider.id}
              className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                isConnected
                  ? 'bg-[#121417] dark:bg-[#121417] light:bg-emerald-50/40 border-emerald-500/30'
                  : 'bg-[#111214] dark:bg-[#111214] light:bg-white border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                    isConnected
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border-neutral-800 dark:border-neutral-800 light:border-neutral-200 text-neutral-400'
                  }`}
                >
                  <Cpu className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-semibold text-neutral-200 dark:text-neutral-200 light:text-neutral-900">
                      {provider.name}
                    </h3>
                    <Badge status={isConnected ? 'ready' : 'inactive'}>
                      {isConnected ? 'Connected' : 'Not Connected'}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-neutral-400 dark:text-neutral-400 light:text-neutral-500 mt-0.5">
                    {provider.description}
                  </p>
                  {isConnected && provider.default_model && (
                    <div className="text-[10px] text-neutral-400 font-mono mt-1">
                      Model: <span className="text-neutral-300 dark:text-neutral-300 light:text-neutral-700">{provider.default_model}</span>
                      {provider.api_key_masked && (
                        <span className="ml-2">Key: {provider.api_key_masked}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isConnected ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openConfigModal(provider)}
                    >
                      Configure
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => disconnectProvider(provider.id)}
                    >
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => openConfigModal(provider)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Connect / Configure Modal */}
      {activeConfigModalProvider && (
        <Modal
          isOpen={true}
          onClose={closeConfigModal}
          title={`Configure ${activeConfigModalProvider.name}`}
          description="Credentials are encrypted locally and not sent to external servers in Phase 1."
        >
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Provider"
              value={activeConfigModalProvider.name}
              disabled
              className="opacity-70 cursor-not-allowed"
            />

            <Input
              label="API Key"
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="sk-..."
              helperText={
                activeConfigModalProvider.id === 'local_ai'
                  ? 'API Key is optional for local providers.'
                  : 'Keys are masked immediately upon saving.'
              }
            />

            <Input
              label="Base URL (Optional)"
              value={baseUrlInput}
              onChange={(e) => setBaseUrlInput(e.target.value)}
              placeholder={
                activeConfigModalProvider.id === 'local_ai'
                  ? 'http://localhost:11434/v1'
                  : 'https://api.openai.com/v1'
              }
              helperText="Specify custom proxy or local inference port if applicable."
            />

            <Input
              label="Default Model"
              value={defaultModelInput}
              onChange={(e) => setDefaultModelInput(e.target.value)}
              placeholder="e.g., gpt-4o, claude-3-7-sonnet"
            />

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200">
              <Button type="button" variant="ghost" size="md" onClick={closeConfigModal}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md" icon={<Check className="w-3.5 h-3.5" />}>
                Save Connection
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
