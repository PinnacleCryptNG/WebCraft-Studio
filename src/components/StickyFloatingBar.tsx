import React from 'react';
import { PricingTier, CurrencyCode, AgencySettings } from '../types';
import { CURRENCY_RATES } from '../data/pricingData';
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

interface StickyFloatingBarProps {
  selectedTier: PricingTier;
  selectedAddonIds: string[];
  activeCurrency: CurrencyCode;
  agencySettings: AgencySettings;
  onOpenProposalModal: () => void;
  onDirectWhatsApp: (tier: PricingTier) => void;
}

export const StickyFloatingBar: React.FC<StickyFloatingBarProps> = ({
  selectedTier,
  selectedAddonIds,
  activeCurrency,
  agencySettings,
  onOpenProposalModal,
  onDirectWhatsApp,
}) => {
  const currencyHelper = CURRENCY_RATES[activeCurrency];

  return (
    <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-indigo-200 dark:border-indigo-500/40 rounded-2xl p-2.5 sm:p-4 shadow-xl dark:shadow-2xl shadow-slate-900/10 dark:shadow-indigo-950/80 flex items-center justify-between gap-2 sm:gap-3 transition-colors">
        
        {/* Selected Tier Info */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-cyan-400 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                {selectedTier.name}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-semibold shrink-0">
                {selectedTier.maxPages}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono font-black text-xs sm:text-sm text-indigo-600 dark:text-cyan-300">
                {currencyHelper.format(selectedTier.price)}
              </span>
              {selectedAddonIds.length > 0 && (
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  +{selectedAddonIds.length} add-on{selectedAddonIds.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          <button
            onClick={() => onDirectWhatsApp(selectedTier)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-semibold transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>WhatsApp Us</span>
          </button>

          <button
            onClick={onOpenProposalModal}
            className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
          >
            <span>Generate Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </div>
  );
};
