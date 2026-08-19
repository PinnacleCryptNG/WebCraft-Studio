import React, { useState } from 'react';
import { PricingTier, CurrencyCode, AgencySettings } from '../types';
import { PricingCard } from './PricingCard';
import { 
  SlidersHorizontal, 
  Sparkles, 
  CheckCheck
} from 'lucide-react';

interface PricingGridProps {
  tiers: PricingTier[];
  activeCurrency: CurrencyCode;
  agencySettings: AgencySettings;
  selectedTierId: string;
  onSelectTier: (tier: PricingTier) => void;
  onOpenPreview: (tier: PricingTier) => void;
  onDirectWhatsApp: (tier: PricingTier) => void;
  onOpenComparison: () => void;
}

export const PricingGrid: React.FC<PricingGridProps> = ({
  tiers,
  activeCurrency,
  agencySettings,
  selectedTierId,
  onSelectTier,
  onOpenPreview,
  onDirectWhatsApp,
  onOpenComparison,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'starter' | 'growth' | 'enterprise'>('all');

  const filteredTiers = tiers.filter(tier => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'starter') return tier.category === 'starter';
    if (filterCategory === 'growth') return tier.category === 'growth' || tier.category === 'pro';
    if (filterCategory === 'enterprise') return tier.category === 'enterprise' || tier.category === 'pro';
    return true;
  });

  return (
    <section id="pricing-plans" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-xs font-mono text-indigo-700 dark:text-cyan-400 font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Complete SMB Rate Card
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight">
              Pick the right tier for your current stage.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              All plans include mobile responsiveness, SSL security, cloud hosting setup, and full code handover. Upgrade at any time seamlessly.
            </p>
          </div>

          {/* Action Bar: Compare Table Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenComparison}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white border border-slate-200 dark:border-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <CheckCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Compare All 6 Plans</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200 dark:border-slate-800/80">
          <span className="text-xs text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter by Scope:
          </span>

          {[
            { key: 'all', label: 'All 6 Packages' },
            { key: 'starter', label: 'Starter & 3-Page Basic (₦35K – ₦50K)' },
            { key: 'growth', label: 'Growth & Business Pro (₦75K – ₦125K)' },
            { key: 'enterprise', label: 'Flagship Corporate (₦150K)' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilterCategory(tab.key as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterCategory === tab.key
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 6-Grid of Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              activeCurrency={activeCurrency}
              agencySettings={agencySettings}
              isSelected={selectedTierId === tier.id}
              onSelect={onSelectTier}
              onOpenPreview={onOpenPreview}
              onDirectWhatsApp={onDirectWhatsApp}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
