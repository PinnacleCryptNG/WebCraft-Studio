import React, { useState } from 'react';
import { ProofOfWorkProject, CurrencyCode, AgencySettings } from '../types';
import { PROOF_OF_WORK_PROJECTS, CURRENCY_RATES } from '../data/pricingData';
import { 
  Sparkles, 
  ExternalLink, 
  Eye, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  Zap, 
  ShoppingBag, 
  BookOpen, 
  Calculator,
  MessageSquare
} from 'lucide-react';

interface ProofOfWorkSectionProps {
  activeCurrency: CurrencyCode;
  agencySettings: AgencySettings;
  onOpenProjectModal: (project: ProofOfWorkProject) => void;
  onSelectTierById: (tierId: string) => void;
  onDirectWhatsApp: (msg?: string) => void;
}

export const ProofOfWorkSection: React.FC<ProofOfWorkSectionProps> = ({
  activeCurrency,
  agencySettings,
  onOpenProjectModal,
  onSelectTierById,
  onDirectWhatsApp,
}) => {
  const [filter, setFilter] = useState<'all' | 'ecommerce' | 'interactive' | 'fintech'>('all');

  const currencyHelper = CURRENCY_RATES[activeCurrency];

  const projects = PROOF_OF_WORK_PROJECTS.map(p => {
    // Check if user has overridden the URL in agencySettings
    let liveUrl = p.liveUrl;
    if (p.id === 'tailory' && agencySettings.tailoryUrl) liveUrl = agencySettings.tailoryUrl;
    if (p.id === 'memory' && agencySettings.memoryUrl) liveUrl = agencySettings.memoryUrl;
    if (p.id === 'margin' && agencySettings.marginUrl) liveUrl = agencySettings.marginUrl;
    return { ...p, liveUrl };
  });

  const filteredProjects = projects.filter(p => {
    if (filter === 'ecommerce') return p.id === 'tailory';
    if (filter === 'interactive') return p.id === 'memory';
    if (filter === 'fintech') return p.id === 'margin';
    return true;
  });

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'tailory':
        return <ShoppingBag className="w-5 h-5 text-amber-500" />;
      case 'memory':
        return <BookOpen className="w-5 h-5 text-indigo-400" />;
      case 'margin':
        return <Calculator className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="proof-of-work" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-semibold mb-4">
          <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
          <span>PROVEN CLIENT BUILDS & CASE STUDIES</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Proof of Work.{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 dark:from-indigo-400 dark:via-cyan-400 dark:to-emerald-400">
            Real Sites Built in Days.
          </span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore recent commercial platforms and web applications delivered with sub-second page speeds, custom interactive UX, and direct WhatsApp lead generation.
        </p>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            All Recent Projects ({projects.length})
          </button>
          <button
            onClick={() => setFilter('ecommerce')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'ecommerce'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Tailory (Bespoke Fashion)
          </button>
          <button
            onClick={() => setFilter('interactive')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'interactive'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Memory (Visual Archive)
          </button>
          <button
            onClick={() => setFilter('fintech')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'fintech'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Margin (Profit Engine)
          </button>
        </div>
      </div>

      {/* Projects Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-2xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-slate-800/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
          >
            
            {/* Top Glowing Ambient Accents */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${
              project.id === 'tailory' ? 'from-amber-400 to-orange-500' :
              project.id === 'memory' ? 'from-indigo-500 to-purple-500' :
              'from-emerald-400 to-teal-500'
            }`} />

            <div className="p-6 sm:p-7 flex-1 flex flex-col">
              
              {/* Badge & Category Header */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    {getProjectIcon(project.mockupType)}
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl text-slate-900 dark:text-white tracking-tight">
                      {project.title}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                      {project.category}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                  {project.deliveryTime}
                </span>
              </div>

              {/* Tagline & Target Audience */}
              <p className="mt-3.5 text-sm font-bold text-slate-900 dark:text-white leading-snug">
                {project.tagline}
              </p>
              
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-[11px] font-medium text-indigo-700 dark:text-cyan-400 border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-slate-500 dark:text-slate-400">Target:</span>
                <span>{project.targetAudience}</span>
              </div>

              <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                {project.description}
              </p>

              {/* Metrics Grid */}
              <div className="my-4 grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                {project.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx}>
                    <span className="text-[9px] font-mono uppercase text-slate-500 block">{m.label}</span>
                    <span className="text-sm font-display font-black text-slate-900 dark:text-white">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Highlight Features */}
              <div className="space-y-1.5 flex-1 mb-4">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                  What This Does For Your Business:
                </span>
                {project.features.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Product Feature Badges (NO DEV JARGON) */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.highlights.map((item, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[10px] font-semibold border border-slate-200 dark:border-slate-800">
                    {item}
                  </span>
                ))}
              </div>

              {/* Tier & Price reference */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 mb-4">
                <span>Equivalent Tier:</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">
                  {currencyHelper.format(project.estimatedPriceNGN)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => onOpenProjectModal(project)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Eye className="w-4 h-4" />
                  <span>Test Interactive Demo</span>
                </button>

                <button
                  onClick={() => {
                    onSelectTierById(project.packageTierId);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Build A Site Like {project.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Proof of Work Bottom Banner */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-900/10 via-slate-900/5 to-cyan-900/10 dark:from-indigo-950/40 dark:via-slate-900/60 dark:to-cyan-950/40 border border-indigo-200 dark:border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h4 className="font-display font-black text-lg sm:text-xl text-slate-900 dark:text-white">
            Have a custom concept or specific requirements?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            We build custom SaaS tools, e-commerce storefronts, and bespoke business websites tailored to your exact industry.
          </p>
        </div>

        <button
          onClick={() => onDirectWhatsApp(`Hello! 👋 I saw your recent builds (Tailory, Memory, Margin) and would like to discuss a custom web project.`)}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 shrink-0 transition-all cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Discuss Your Custom Project</span>
        </button>
      </div>

    </section>
  );
};
