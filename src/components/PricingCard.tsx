import React from 'react';
import { motion } from 'motion/react';
import { PricingTier, CurrencyCode, AgencySettings } from '../types';
import { CURRENCY_RATES } from '../data/pricingData';
import { 
  Check, 
  ArrowRight, 
  MessageSquare, 
  Clock, 
  FileCheck, 
  Sparkles,
  Eye
} from 'lucide-react';

interface PricingCardProps {
  tier: PricingTier;
  activeCurrency: CurrencyCode;
  agencySettings: AgencySettings;
  isSelected?: boolean;
  onSelect: (tier: PricingTier) => void;
  onOpenPreview: (tier: PricingTier) => void;
  onDirectWhatsApp: (tier: PricingTier) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  activeCurrency,
  agencySettings,
  isSelected = false,
  onSelect,
  onOpenPreview,
  onDirectWhatsApp,
}) => {
  const currencyHelper = CURRENCY_RATES[activeCurrency];
  const formattedPrice = currencyHelper.format(tier.price);
  const formattedOriginalPrice = tier.originalPrice ? currencyHelper.format(tier.originalPrice) : null;

  return (
    <motion.div
      id={`tier-${tier.id}`}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-300 backdrop-blur-xl ${
        tier.isPopular || tier.isRecommended
          ? 'bg-white dark:bg-slate-900/90 border-2 border-indigo-500/90 shadow-xl shadow-indigo-500/10 dark:shadow-indigo-500/20'
          : 'bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700/90 hover:shadow-lg dark:hover:shadow-cyan-500/5'
      } ${isSelected ? 'ring-2 ring-cyan-500 border-cyan-500' : ''}`}
    >
      {/* Top ambient glow for popular tier */}
      {(tier.isPopular || tier.isRecommended) && (
        <div 
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-32 blur-3xl pointer-events-none rounded-full opacity-60 dark:opacity-100"
          style={{ backgroundColor: tier.glowColor }}
        />
      )}

      {/* Floating Badge */}
      {tier.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold font-mono tracking-wider shadow-md ${
            tier.isPopular
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white dark:text-slate-950'
              : tier.isRecommended
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white dark:text-slate-950'
              : 'bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white'
          }`}>
            <Sparkles className="w-3 h-3" />
            {tier.badge}
          </span>
        </div>
      )}

      <div>
        {/* Tier Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              {tier.maxPages}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
              {tier.name}
            </h3>
          </div>

          <button
            onClick={() => onOpenPreview(tier)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            title="Preview sample page layout"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Short Subtitle */}
        <p className="text-xs text-slate-600 dark:text-slate-300 min-h-[34px] leading-relaxed">
          {tier.subtitle}
        </p>

        {/* Pricing Display */}
        <div className="mt-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-xs sm:text-sm text-slate-400 line-through font-mono">
                {formattedOriginalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              {tier.deliveryDays}
            </span>
            <span className="flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {tier.revisions}
            </span>
          </div>
        </div>

        {/* Deliverables / Key Highlights */}
        <div className="mt-4 mb-5">
          <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-indigo-600 dark:text-indigo-400">
            Included Deliverables
          </span>
          <ul className="mt-2.5 space-y-2 text-xs text-slate-700 dark:text-slate-200">
            {tier.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="mt-0.5 rounded-full p-0.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 border border-indigo-200 dark:border-indigo-500/20 shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Best For Tag */}
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">Ideal For: </span>
          {tier.idealFor}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
        
        {/* Main Select Button */}
        <button
          onClick={() => onSelect(tier)}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
            tier.isPopular || tier.isRecommended
              ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-md shadow-indigo-500/25'
              : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-white border border-slate-800 dark:border-slate-700'
          }`}
        >
          <span>Select & Customize Proposal</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Direct WhatsApp Instant Consultation */}
        <button
          onClick={() => onDirectWhatsApp(tier)}
          className="w-full py-2 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Quick WhatsApp Inquiry</span>
        </button>

      </div>
    </motion.div>
  );
};
