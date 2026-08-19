import React from 'react';
import { AgencySettings } from '../types';
import { Sparkles, MessageSquare, Mail, Heart } from 'lucide-react';

interface FooterProps {
  agencySettings: AgencySettings;
  onOpenCustomizer: () => void;
  onOpenProposalModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  agencySettings,
  onOpenCustomizer,
}) => {
  return (
    <footer className="pt-16 pb-28 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-[#06080e] text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200 dark:border-slate-800/60">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
                {agencySettings.agencyName}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {agencySettings.tagline}. Handcrafted modern websites engineered for high conversions, lightning speed, and rapid business expansion.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-slate-700 dark:text-slate-300">
              <a 
                href="mailto:pinnaclecrypt@gmail.com"
                className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>pinnaclecrypt@gmail.com</span>
              </a>
              <a 
                href="https://wa.me/2348166818076"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>+234 816 681 8076</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono font-bold text-xs uppercase text-slate-900 dark:text-slate-200 mb-3">
              Rate Card Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#proof-of-work" className="text-indigo-600 dark:text-cyan-400 font-semibold hover:text-indigo-700 dark:hover:text-white transition-colors">
                  ✦ Proof of Work (Recent Builds)
                </a>
              </li>
              <li>
                <a href="#pricing-plans" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  All 6 Pricing Tiers (₦35K–₦150K)
                </a>
              </li>
              <li>
                <a href="#pay-as-you-build" className="text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 font-medium transition-colors">
                  Pay-As-You-Build Roadmap
                </a>
              </li>
              <li>
                <a href="#addons" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Add-on Powerups & Hosting
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  FAQs & Payment Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Reusable Sales Tool Control */}
          <div>
            <h4 className="font-mono font-bold text-xs uppercase text-slate-900 dark:text-slate-200 mb-3">
              Developer & Agency Tool
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              You can customize and configure agency settings or currencies for client presentations.
            </p>
            <button
              onClick={onOpenCustomizer}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Configure Agency Settings
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {agencySettings.agencyName}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" />
            <span>for Nigerian & Global SMB Founders.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
