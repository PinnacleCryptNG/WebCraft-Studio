import React, { useState } from 'react';
import { AgencySettings, CurrencyCode } from '../types';
import { 
  X, 
  Save, 
  RotateCcw, 
  Sparkles, 
  Settings2, 
  MessageSquare, 
  Mail, 
  Tag, 
  Check,
  Building2
} from 'lucide-react';

interface AgencyCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  agencySettings: AgencySettings;
  onSaveSettings: (settings: AgencySettings) => void;
  onResetDefaults: () => void;
  activeCurrency: CurrencyCode;
}

export const AgencyCustomizerDrawer: React.FC<AgencyCustomizerDrawerProps> = ({
  isOpen,
  onClose,
  agencySettings,
  onSaveSettings,
  onResetDefaults,
}) => {
  const [formState, setFormState] = useState<AgencySettings>({ ...agencySettings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formState);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 dark:bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-lg h-full bg-white dark:bg-[#090d16] border-l border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-cyan-400 flex items-center justify-center">
                <Settings2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Agency & Rate Card Config
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Reusable sales tool settings for your freelance business
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSave} className="my-6 space-y-4">
            
            {/* Agency Name */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Agency / Studio Brand Name
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={formState.agencyName}
                  onChange={(e) => setFormState({ ...formState, agencyName: e.target.value })}
                  placeholder="e.g. Pinnacle Web Solutions"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg text-xs focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400"
                  required
                />
              </div>
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Sub-Headline / Tagline
              </label>
              <input
                type="text"
                value={formState.tagline}
                onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                placeholder="e.g. Websites that grow with your business"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg text-xs focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400"
              />
            </div>

            {/* WhatsApp Routing Number */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                WhatsApp Phone Number (with Country Code)
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-emerald-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={formState.whatsappNumber}
                  onChange={(e) => setFormState({ ...formState, whatsappNumber: e.target.value })}
                  placeholder="e.g. 2348166818076"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg text-xs focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400 font-mono"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                All client proposals and quick inquiry clicks will route directly to this WhatsApp.
              </p>
            </div>

            {/* Official Contact Email */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Official Agency Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="e.g. pinnaclecrypt@gmail.com"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg text-xs focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400"
                  required
                />
              </div>
            </div>

            {/* Upfront Payment Discount Percent */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Upfront Full Payment Discount (%)
              </label>
              <div className="relative">
                <Tag className="w-4 h-4 text-indigo-600 dark:text-cyan-400 absolute left-3 top-3" />
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={formState.customDiscountPercent}
                  onChange={(e) => setFormState({ ...formState, customDiscountPercent: Number(e.target.value) })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg text-xs focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400 font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Applied when client selects 100% upfront in the proposal builder.
              </p>
            </div>

            {/* Proof of Work Live URLs */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="block text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase">
                Proof of Work Live URLs (Optional)
              </span>
              
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Tailory Live Link:</label>
                <input
                  type="url"
                  value={formState.tailoryUrl || ''}
                  onChange={(e) => setFormState({ ...formState, tailoryUrl: e.target.value })}
                  placeholder="e.g. https://tailory.app or vercel url"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Memory Live Link:</label>
                <input
                  type="url"
                  value={formState.memoryUrl || ''}
                  onChange={(e) => setFormState({ ...formState, memoryUrl: e.target.value })}
                  placeholder="e.g. https://memory-vault.app"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Margin Live Link:</label>
                <input
                  type="url"
                  value={formState.marginUrl || ''}
                  onChange={(e) => setFormState({ ...formState, marginUrl: e.target.value })}
                  placeholder="e.g. https://margin-calc.app"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Reusability Information Box */}
            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-cyan-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Reusable Freelance Rate Card</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Changes made here persist automatically on your device. You can share this link with SMB prospects or deploy it as your official agency rate card!
              </p>
            </div>

            {/* Submit Actions */}
            <div className="pt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  onResetDefaults();
                  setFormState({ ...agencySettings });
                }}
                className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Settings</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
          <span>WebCraft SMB Rate Card Architecture • v2.6</span>
        </div>

      </div>
    </div>
  );
};
