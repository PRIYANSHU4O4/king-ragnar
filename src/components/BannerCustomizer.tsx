import React, { useState } from 'react';
import { BannerConfig } from '../types';
import { DEFAULT_BANNER_CONFIG } from '../defaultConfig';
import { X, RefreshCw, Copy, Check, Sliders, Type, Image as ImageIcon, Sparkles, Layers } from 'lucide-react';

interface BannerCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  config: BannerConfig;
  onChange: (updated: BannerConfig) => void;
}

export const BannerCustomizer: React.FC<BannerCustomizerProps> = ({
  isOpen,
  onClose,
  config,
  onChange,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleTextChange = (field: keyof BannerConfig, value: any) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const handleReset = () => {
    onChange(DEFAULT_BANNER_CONFIG);
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const backgroundPresets = [
    { label: "User Request Image (ibb.co/SX6VXM8F)", url: "https://ibb.co/SX6VXM8F" },
    { label: "Dark Industrial Wall", url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80" },
    { label: "Concrete Metal Grunge", url: "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&w=1920&q=80" },
    { label: "Dark Arena Spotlight", url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80" },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end transition-opacity">
      <div className="w-full max-w-lg bg-zinc-950 border-l border-zinc-800 h-full flex flex-col shadow-2xl overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-zinc-900/90 backdrop-blur px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-yellow-400" />
            <h2 className="font-montserrat font-bold text-lg text-white">Banner Studio Editor</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-8 flex-1">
          
          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={handleCopyConfig}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied JSON!' : 'Copy Config'}</span>
            </button>
          </div>

          {/* Background Settings */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span>Background Image & Texture</span>
            </h3>

            <div className="space-y-2">
              <label className="text-xs text-zinc-400 font-medium">Background Image URL</label>
              <input
                type="text"
                value={config.bgImageUrl}
                onChange={(e) => handleTextChange('bgImageUrl', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-yellow-500"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-zinc-400 font-medium">Background Presets</label>
              <div className="grid grid-cols-1 gap-1.5">
                {backgroundPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTextChange('bgImageUrl', preset.url)}
                    className={`text-left px-3 py-2 rounded-lg text-xs transition-colors border ${
                      config.bgImageUrl === preset.url
                        ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400 font-bold'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Overlay Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
              <div>
                <span className="text-xs text-zinc-300 font-medium block">Show Typography Overlays</span>
                <span className="text-[10px] text-zinc-500">Enable if image lacks built-in event typography</span>
              </div>
              <input
                type="checkbox"
                checked={config.showTextOverlays}
                onChange={(e) => handleTextChange('showTextOverlays', e.target.checked)}
                className="w-4 h-4 accent-yellow-500 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Left Text Block */}
          <div className="space-y-4 pt-4 border-t border-zinc-900">
            <h3 className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-2">
              <Type className="w-4 h-4" />
              <span>Left Block ("HI, I'M")</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400">Title Line 1</label>
                <input
                  type="text"
                  value={config.leftTitleLine1}
                  onChange={(e) => handleTextChange('leftTitleLine1', e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400">Title Line 2</label>
                <input
                  type="text"
                  value={config.leftTitleLine2}
                  onChange={(e) => handleTextChange('leftTitleLine2', e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-zinc-400">Taglines (3 Lines)</label>
              <input
                type="text"
                value={config.leftTagline1}
                onChange={(e) => handleTextChange('leftTagline1', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200"
              />
              <input
                type="text"
                value={config.leftTagline2}
                onChange={(e) => handleTextChange('leftTagline2', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200"
              />
              <input
                type="text"
                value={config.leftTagline3}
                onChange={(e) => handleTextChange('leftTagline3', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400">Button Label</label>
              <input
                type="text"
                value={config.leftButtonText}
                onChange={(e) => handleTextChange('leftButtonText', e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
              />
            </div>
          </div>

          {/* Right Text Block */}
          <div className="space-y-4 pt-4 border-t border-zinc-900">
            <h3 className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Right Block ("KING RAGNAR")</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400">Title Line 1</label>
                <input
                  type="text"
                  value={config.rightTitleLine1}
                  onChange={(e) => handleTextChange('rightTitleLine1', e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400">Title Line 2</label>
                <input
                  type="text"
                  value={config.rightTitleLine2}
                  onChange={(e) => handleTextChange('rightTitleLine2', e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-zinc-400">Crown Taglines</label>
              <input
                type="text"
                value={config.rightTagline1}
                onChange={(e) => handleTextChange('rightTagline1', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200"
              />
              <input
                type="text"
                value={config.rightTagline2}
                onChange={(e) => handleTextChange('rightTagline2', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200"
              />
            </div>

            {/* Drips Toggle */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-zinc-300 font-medium">Gold Paint Drips Effect</span>
              <input
                type="checkbox"
                checked={config.enableDrips}
                onChange={(e) => handleTextChange('enableDrips', e.target.checked)}
                className="w-4 h-4 accent-yellow-500 rounded"
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/80">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors"
          >
            Apply & Close Editor
          </button>
        </div>

      </div>
    </div>
  );
};
