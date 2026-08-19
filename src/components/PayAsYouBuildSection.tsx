import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CurrencyCode, AgencySettings } from '../types';
import { PAY_AS_YOU_BUILD_STAGES, CURRENCY_RATES } from '../data/pricingData';
import { 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Calculator, 
  MessageSquare
} from 'lucide-react';

interface PayAsYouBuildProps {
  activeCurrency: CurrencyCode;
  agencySettings: AgencySettings;
  onSelectTierById: (tierId: string) => void;
  onDirectWhatsAppMessage: (msg: string) => void;
}

export const PayAsYouBuildSection: React.FC<PayAsYouBuildProps> = ({
  activeCurrency,
  agencySettings,
  onSelectTierById,
  onDirectWhatsAppMessage,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [startStageIdx, setStartStageIdx] = useState<number>(0);
  const [targetStageIdx, setTargetStageIdx] = useState<number>(3); // Professional by default

  const currencyHelper = CURRENCY_RATES[activeCurrency];
  const activeStage = PAY_AS_YOU_BUILD_STAGES[activeStageIndex];

  // Calculation for upgrade simulator
  const startStage = PAY_AS_YOU_BUILD_STAGES[startStageIdx];
  const targetStage = PAY_AS_YOU_BUILD_STAGES[targetStageIdx];
  const startPrice = startStage.priceNGN;
  const targetPrice = targetStage.priceNGN;
  const upgradeDifference = Math.max(0, targetPrice - startPrice);

  const tierIdMap: Record<string, string> = {
    'stage-1': 'starter',
    'stage-2': 'business-basic',
    'stage-3': 'business-plus',
    'stage-4': 'professional',
    'stage-5': 'business-pro',
    'stage-6': 'premium',
  };

  const handleStartInquiry = () => {
    const message = `Hello ${agencySettings.agencyName}! 👋\nI want to start with the *Pay-As-You-Build* model at *${startStage.name} (${currencyHelper.format(startPrice)})* and eventually scale to *${targetStage.name} (${currencyHelper.format(targetPrice)})*.\n\nCan we discuss the project roadmap?`;
    onDirectWhatsAppMessage(message);
  };

  return (
    <section id="pay-as-you-build" className="py-20 sm:py-24 relative overflow-hidden bg-slate-50 dark:bg-[#070a10] border-y border-slate-200 dark:border-slate-800/80 transition-colors">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-bold tracking-wider mb-4 shadow-xs">
            <TrendingUp className="w-4 h-4" />
            THE CLIENT-FAVORITE MODEL
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Don't have the full budget? <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-600 via-indigo-600 to-indigo-500 dark:from-cyan-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Build it in stages.
            </span>
          </h2>
          
          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Launch today with our ₦35K Starter website to start generating revenue. As your business grows, simply pay the difference to unlock new pages, catalogues, and blogs. 
            <strong className="text-slate-900 dark:text-white font-semibold"> Never discard your initial investment.</strong>
          </p>
        </div>

        {/* The 6-Stage Timeline Pipeline Stepper */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {PAY_AS_YOU_BUILD_STAGES.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              const formattedStagePrice = currencyHelper.format(stage.priceNGN);
              const formattedUpgradeCost = idx === 0 
                ? 'Base Start' 
                : `+${currencyHelper.format(stage.upgradeCostNGN)}`;

              return (
                <motion.div
                  key={stage.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 text-left border ${
                    isActive
                      ? 'bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border-cyan-500 dark:border-cyan-400 shadow-lg dark:shadow-xl shadow-cyan-500/10 dark:shadow-cyan-500/15 ring-2 ring-cyan-500 dark:ring-cyan-400'
                      : 'bg-white/80 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      STAGE 0{stage.step}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                      idx === 0 
                        ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30'
                        : 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                    }`}>
                      {formattedUpgradeCost}
                    </span>
                  </div>

                  <div className="mt-2.5">
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      {stage.action}
                    </span>
                    <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5">
                      {stage.name}
                    </h4>
                    <span className="font-mono text-sm font-extrabold text-cyan-700 dark:text-cyan-300 mt-1 block">
                      {formattedStagePrice}
                    </span>
                  </div>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeStageIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 dark:from-cyan-400 dark:to-indigo-500 rounded-full"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Interactive Active Stage Deep-Dive Card + Visual Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          
          {/* Left: Stage Details & Unlocks */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-lg dark:shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-700 dark:text-cyan-400 text-sm">
                    {activeStage.step}
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      Stage {activeStage.step}: {activeStage.name}
                    </h3>
                    <span className="text-xs text-cyan-700 dark:text-cyan-400 font-mono font-semibold">
                      {activeStage.action} • {activeStage.pageCount}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-display font-black text-slate-900 dark:text-white">
                    {currencyHelper.format(activeStage.priceNGN)}
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Est. Build: {activeStage.turnaround}
                  </span>
                </div>
              </div>

              {/* Headline & Summary */}
              <div className="mt-5">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                  {activeStage.headline}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {activeStage.summary}
                </p>
              </div>

              {/* What You Unlock In This Stage */}
              <div className="mt-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-3">
                  Unlocked Capabilities at this Milestone:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStage.keyUnlocks.map((unlock, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-950/50 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800/80">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{unlock}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => onSelectTierById(tierIdMap[activeStage.id])}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Select {activeStage.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-slate-500 dark:text-slate-400">
                Next Stage upgrade: <strong className="text-cyan-700 dark:text-cyan-300">
                  {activeStageIndex < PAY_AS_YOU_BUILD_STAGES.length - 1 
                    ? `+${currencyHelper.format(PAY_AS_YOU_BUILD_STAGES[activeStageIndex + 1].upgradeCostNGN)} only` 
                    : 'Maximum Tier Reached!'}
                </strong>
              </span>
            </div>
          </div>

          {/* Right: Visual Architecture Diagram */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-950/80 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-lg dark:shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  Visual Sitemap Growth
                </span>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/50">
                  {activeStage.visualTag}
                </span>
              </div>

              {/* Wireframe Mockup Visualizer */}
              <div className="bg-slate-100 dark:bg-[#0b0f19] rounded-xl p-4 border border-slate-200 dark:border-slate-800/80 space-y-2.5">
                
                {/* Header Bar */}
                <div className="h-6 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between px-2 text-[10px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-[9px] text-slate-500 dark:text-slate-400">yourbrand.com</span>
                </div>

                {/* Hero Block */}
                <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30">
                  <div className="h-3 w-1/2 bg-indigo-400/50 dark:bg-indigo-400/30 rounded mb-1.5" />
                  <div className="h-2 w-3/4 bg-slate-300 dark:bg-slate-700/40 rounded" />
                </div>

                {/* Stage 1: Single Page Blocks */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">About Us</span>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">Services</span>
                  </div>
                </div>

                {/* Stage 2+ : Sub-pages & Maps */}
                <div className={`p-2 rounded border transition-all ${
                  activeStageIndex >= 1
                    ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 font-semibold'
                    : 'bg-slate-200/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/40 text-slate-400 dark:text-slate-600 opacity-40'
                }`}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span>+ Contact & Interactive Google Maps</span>
                    <span className="text-[9px] font-mono">{activeStageIndex >= 1 ? 'ACTIVE' : 'LOCKED'}</span>
                  </div>
                </div>

                {/* Stage 3+ : Gallery & Testimonials */}
                <div className={`p-2 rounded border transition-all ${
                  activeStageIndex >= 2
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-semibold'
                    : 'bg-slate-200/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/40 text-slate-400 dark:text-slate-600 opacity-40'
                }`}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span>+ Testimonial Slider & Image Gallery</span>
                    <span className="text-[9px] font-mono">{activeStageIndex >= 2 ? 'ACTIVE' : 'LOCKED'}</span>
                  </div>
                </div>

                {/* Stage 4+ : Searchable Catalog & Blog */}
                <div className={`p-2 rounded border transition-all ${
                  activeStageIndex >= 3
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-300 font-semibold'
                    : 'bg-slate-200/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/40 text-slate-400 dark:text-slate-600 opacity-40'
                }`}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span>+ Searchable Catalog & Dynamic Blog Engine</span>
                    <span className="text-[9px] font-mono">{activeStageIndex >= 3 ? 'ACTIVE' : 'LOCKED'}</span>
                  </div>
                </div>

                {/* Stage 5+ : Downloadable PDFs & Calendly */}
                <div className={`p-2 rounded border transition-all ${
                  activeStageIndex >= 4
                    ? 'bg-purple-50 dark:bg-violet-950/40 border-purple-300 dark:border-violet-500/40 text-purple-800 dark:text-violet-300 font-semibold'
                    : 'bg-slate-200/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/40 text-slate-400 dark:text-slate-600 opacity-40'
                }`}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span>+ PDF Vault, Calendly & CRM Sync</span>
                    <span className="text-[9px] font-mono">{activeStageIndex >= 4 ? 'ACTIVE' : 'LOCKED'}</span>
                  </div>
                </div>

                {/* Stage 6 : Full Multi-Division Corporate Portal */}
                <div className={`p-2 rounded border transition-all ${
                  activeStageIndex >= 5
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-500/40 text-rose-800 dark:text-rose-300 font-semibold'
                    : 'bg-slate-200/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/40 text-slate-400 dark:text-slate-600 opacity-40'
                }`}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span>+ 15-Page Flagship & 30-Day VIP Retainer</span>
                    <span className="text-[9px] font-mono">{activeStageIndex >= 5 ? 'ACTIVE' : 'LOCKED'}</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Code Base: 100% Retained</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">Zero Code Waste</span>
            </div>
          </div>

        </div>

        {/* Upgrade Journey Calculator Widget */}
        <div className="bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-indigo-500/30 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-bold mb-2">
                <Calculator className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                UPGRADE DIFFERENTIAL SIMULATOR
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Calculate your stage-by-stage path
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Choose where you want to start today, and what you aim to expand into down the road.
              </p>
            </div>

            {/* Discuss Roadmap Button */}
            <button
              onClick={handleStartInquiry}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 whitespace-nowrap self-start lg:self-center"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>Discuss This Roadmap</span>
            </button>
          </div>

          {/* Interactive Calculator Controls Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50 dark:bg-slate-950/80 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            
            {/* Start Stage Dropdown */}
            <div className="md:col-span-4">
              <label className="block text-[11px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                Start Stage Today:
              </label>
              <div className="relative">
                <select
                  value={startStageIdx}
                  onChange={(e) => {
                    const newStart = Number(e.target.value);
                    setStartStageIdx(newStart);
                    if (targetStageIdx < newStart) setTargetStageIdx(newStart);
                  }}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer shadow-xs"
                >
                  {PAY_AS_YOU_BUILD_STAGES.map((s, idx) => (
                    <option key={s.id} value={idx}>
                      Stage 0{s.step}: {s.name} ({currencyHelper.format(s.priceNGN)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Arrow separator */}
            <div className="hidden md:flex md:col-span-1 items-center justify-center pt-5">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>

            {/* Target Stage Dropdown */}
            <div className="md:col-span-4">
              <label className="block text-[11px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                Target Future Stage:
              </label>
              <div className="relative">
                <select
                  value={targetStageIdx}
                  onChange={(e) => setTargetStageIdx(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer shadow-xs"
                >
                  {PAY_AS_YOU_BUILD_STAGES.map((s, idx) => (
                    <option key={s.id} value={idx} disabled={idx < startStageIdx}>
                      Stage 0{s.step}: {s.name} ({currencyHelper.format(s.priceNGN)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calculated Upgrade Difference Output */}
            <div className="md:col-span-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center md:text-right">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400 block">
                Future Upgrade Cost:
              </span>
              <div className="text-xl sm:text-2xl font-display font-black text-cyan-700 dark:text-cyan-400 my-0.5">
                +{currencyHelper.format(upgradeDifference)}
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                {startStageIdx === targetStageIdx ? 'Current base stage' : 'Pay only the exact gap!'}
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
