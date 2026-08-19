import React from 'react';
import { motion } from 'motion/react';
import { CurrencyCode, AgencySettings } from '../types';
import { CURRENCY_RATES } from '../data/pricingData';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  TrendingUp,
  Layers,
  ChevronRight,
  MessageSquare,
  Mail
} from 'lucide-react';

interface HeroSectionProps {
  agencySettings: AgencySettings;
  activeCurrency: CurrencyCode;
  onSelectTier: (tierId: string) => void;
  onScrollToSection: (sectionId: string) => void;
  onDirectWhatsApp: (msg?: string) => void;
  onDirectEmail: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  agencySettings,
  activeCurrency,
  onSelectTier,
  onScrollToSection,
  onDirectWhatsApp,
  onDirectEmail,
}) => {
  const currencyHelper = CURRENCY_RATES[activeCurrency];
  const startingPrice = currencyHelper.format(35000);

  const stagesFlow = [
    { label: 'STARTER', price: '₦35K', tierId: 'starter', color: 'from-blue-500 to-cyan-400', border: 'border-cyan-500/40 dark:border-cyan-500/40', tag: '1 Page Launch' },
    { label: 'BUSINESS', price: '₦50K–₦75K', tierId: 'business-plus', color: 'from-cyan-400 to-emerald-400', border: 'border-emerald-500/40 dark:border-emerald-500/40', tag: '3–5 Pages' },
    { label: 'PROFESSIONAL', price: '₦100K–₦125K', tierId: 'professional', color: 'from-emerald-400 to-amber-400', border: 'border-amber-500/40 dark:border-amber-500/40', tag: '7–10 Pages' },
    { label: 'PREMIUM', price: '₦150K', tierId: 'premium', color: 'from-amber-400 to-rose-400', border: 'border-rose-500/40 dark:border-rose-500/40', tag: '15 Pages Corporate' },
  ];

  return (
    <section id="hero" className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-500/10 via-cyan-500/10 to-emerald-500/10 dark:from-indigo-600/15 dark:via-cyan-500/15 dark:to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-500/5 dark:bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 shadow-sm backdrop-blur-md mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-semibold text-slate-900 dark:text-white">Recent Deployments Live</span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <button
            onClick={() => onScrollToSection('proof-of-work')}
            className="text-indigo-600 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailory, Memory & Margin (Proof of Work)</span>
          </button>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.1]"
        >
          Websites that <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 dark:from-cyan-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">grow with your business.</span>
        </motion.h1>

        {/* Subtitle with Starting Price */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-base sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed"
        >
          High-performance, bespoke business websites starting from{' '}
          <strong className="text-indigo-900 dark:text-white font-bold bg-indigo-50 dark:bg-indigo-500/20 px-2.5 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-cyan-300 inline-block mt-1 sm:mt-0">
            {startingPrice}
          </strong>
        </motion.p>

        {/* The Animated Line: STARTER → BUSINESS → PROFESSIONAL → PREMIUM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 sm:mt-10 max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl dark:shadow-2xl relative"
        >
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Website Evolution Pathway
            </span>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hidden sm:inline-block">
              Click any tier to view details
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {stagesFlow.map((stage, idx) => (
              <motion.button
                key={stage.label}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectTier(stage.tierId)}
                className={`relative flex flex-col items-start p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/70 border ${stage.border} text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer group`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-mono font-bold text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {stage.price}
                  </span>
                </div>
                
                <span className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-1.5 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
                  {stage.label}
                </span>

                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {stage.tag}
                </span>

                {/* Arrow indicator for pipeline */}
                {idx < stagesFlow.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Value Anchors Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium"
        >
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">
            <Smartphone className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>100% Mobile & Tablet Optimized</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">
            <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>48–72hr Ultra-Fast Turnaround</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>50/50 Safe Milestone Payment</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Pay-As-You-Build Flexibility</span>
          </div>
        </motion.div>

        {/* Action Buttons: Packages, WhatsApp & Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto"
        >
          <button
            onClick={() => onScrollToSection('pricing-plans')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Explore All 6 Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDirectWhatsApp()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </button>

          <button
            onClick={onDirectEmail}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Email Brief</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
