import React from 'react';
import { AgencySettings } from '../types';
import { 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Zap,
  Mail
} from 'lucide-react';

interface BottomCtaSectionProps {
  agencySettings: AgencySettings;
  onOpenProposalModal: () => void;
  onDirectWhatsApp: (msg: string) => void;
  onDirectEmail?: () => void;
}

export const BottomCtaSection: React.FC<BottomCtaSectionProps> = ({
  agencySettings,
  onOpenProposalModal,
  onDirectWhatsApp,
  onDirectEmail,
}) => {
  const handleCustomConsult = () => {
    const msg = `Hello ${agencySettings.agencyName}! 👋\nI have a custom web project in mind for my business. Can we discuss?`;
    onDirectWhatsApp(msg);
  };

  const handleEmailClick = () => {
    if (onDirectEmail) {
      onDirectEmail();
    } else {
      const subject = encodeURIComponent(`Website Project Inquiry - ${agencySettings.agencyName}`);
      const body = encodeURIComponent(`Hello ${agencySettings.agencyName},\n\nI would like to request a quote and consultation for my website project.\n\nBusiness Name:\nExpected Scope:\nBudget Range:\n\nThank you!`);
      window.location.href = `mailto:pinnaclecrypt@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/5 dark:via-indigo-950/20 to-slate-100 dark:to-slate-950 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="p-8 sm:p-14 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-slate-900/90 dark:via-slate-900/60 dark:to-slate-950 border border-slate-200 dark:border-slate-800/90 shadow-xl dark:shadow-2xl backdrop-blur-xl">
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-bold tracking-wider mb-6">
            <Sparkles className="w-4 h-4" />
            CUSTOM TAILORED ARCHITECTURE
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Have something specific in mind?
          </h2>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto font-normal leading-relaxed">
            Every business is different. Let's build a package around your actual needs, timeline, and growth goals.
          </p>

          {/* Quick value trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              100% Guaranteed Delivery
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
              <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              No Long-Term Builder Lock-in
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
              <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Full Source Code Handover
            </span>
          </div>

          {/* Action buttons */}
          <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            <button
              onClick={onOpenProposalModal}
              className="flex-1 px-6 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap min-h-[52px]"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              onClick={handleCustomConsult}
              className="flex-1 px-5 py-3.5 sm:py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-all shadow-md shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap min-h-[52px]"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>WhatsApp Us</span>
              <span className="hidden xl:inline text-xs font-mono opacity-90 font-normal">(+234 816 681 8076)</span>
            </button>

            <button
              onClick={handleEmailClick}
              className="flex-1 px-5 py-3.5 sm:py-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap min-h-[52px]"
            >
              <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>Email Us</span>
              <span className="hidden xl:inline text-xs font-mono opacity-90 font-normal">(pinnaclecrypt@gmail.com)</span>
            </button>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-500 mt-6 font-mono">
            Typical response time: Under 15 minutes during business hours.
          </p>

        </div>

      </div>
    </section>
  );
};
