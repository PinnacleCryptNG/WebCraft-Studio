import React from 'react';
import { AddOnService, CurrencyCode } from '../types';
import { ADDON_SERVICES, CURRENCY_RATES } from '../data/pricingData';
import { 
  Globe, 
  CreditCard, 
  Sparkles, 
  PenTool, 
  MessageSquare, 
  ShieldCheck, 
  Plus, 
  Check,
  Zap
} from 'lucide-react';

interface AddOnsSectionProps {
  activeCurrency: CurrencyCode;
  selectedAddonIds: string[];
  onToggleAddon: (addonId: string) => void;
  onOpenCustomQuote: () => void;
}

export const AddOnsSection: React.FC<AddOnsSectionProps> = ({
  activeCurrency,
  selectedAddonIds,
  onToggleAddon,
  onOpenCustomQuote,
}) => {
  const currencyHelper = CURRENCY_RATES[activeCurrency];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
      case 'PenTool': return <PenTool className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      default: return <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
    }
  };

  return (
    <section id="addons" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold mb-3">
            <Plus className="w-3.5 h-3.5" />
            OPTIONAL POWER-UPS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            Tailor-Made Add-On Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Supercharge any website tier with optional domain hosting, payment gateways, automated bots, and branding.
          </p>
        </div>

        {/* Add-ons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADDON_SERVICES.map((addon) => {
            const isSelected = selectedAddonIds.includes(addon.id);
            const formattedPrice = currencyHelper.format(addon.priceNGN);

            return (
              <div
                key={addon.id}
                onClick={() => onToggleAddon(addon.id)}
                className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-200 backdrop-blur-xl border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-50/70 dark:bg-slate-900/90 border-cyan-500 dark:border-cyan-400/80 shadow-md dark:shadow-lg shadow-cyan-500/10 ring-2 ring-cyan-500 dark:ring-cyan-400/50'
                    : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50 shadow-xs'
                }`}
              >
                <div>
                  {/* Top Icon & Popular Badge Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                      {getIcon(addon.iconName)}
                    </div>
                    {addon.popular && (
                      <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 shrink-0">
                        Popular Add-on
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <div className="mb-2.5">
                    <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                      {addon.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 mt-1 block">
                      {formattedPrice}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {addon.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {isSelected ? 'Included in quote' : 'Click to add to quote'}
                  </span>

                  <button
                    type="button"
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-white dark:text-slate-950 font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Add-ons Bar */}
        {selectedAddonIds.length > 0 && (
          <div className="mt-8 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>
                <strong>{selectedAddonIds.length} add-on{selectedAddonIds.length > 1 ? 's' : ''}</strong> selected for your custom proposal.
              </span>
            </div>

            <button
              onClick={onOpenCustomQuote}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              View Full Quote Breakdown →
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
