import React, { useState } from 'react';
import { CurrencyCode, AgencySettings } from '../types';
import { 
  Sparkles, 
  Settings2, 
  MessageSquare, 
  ArrowRight,
  TrendingUp,
  Sun,
  Moon,
  Menu,
  X,
  Mail,
  Layers,
  HelpCircle,
  Package
} from 'lucide-react';

interface NavbarProps {
  agencySettings: AgencySettings;
  activeCurrency: CurrencyCode;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onCurrencyChange: (curr: CurrencyCode) => void;
  onOpenCustomizer: () => void;
  onOpenProposalModal: () => void;
  onScrollToSection: (sectionId: string) => void;
  onDirectWhatsApp: (msg?: string) => void;
  onDirectEmail: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  agencySettings,
  activeCurrency,
  theme,
  onToggleTheme,
  onCurrencyChange,
  onOpenCustomizer,
  onOpenProposalModal,
  onScrollToSection,
  onDirectWhatsApp,
  onDirectEmail,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 dark:bg-[#080b12]/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-18 flex items-center justify-between gap-2">
          
          {/* Brand Logo & Title */}
          <div 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink-0" 
            onClick={() => handleNavClick('hero')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-md shadow-indigo-500/20 shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-base sm:text-lg text-slate-900 dark:text-white tracking-tight leading-none">
                  {agencySettings.agencyName}
                </span>
                <span className="text-[9px] uppercase font-mono tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 shrink-0">
                  Rate Card
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block truncate max-w-[200px] lg:max-w-xs mt-0.5 font-normal">
                {agencySettings.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button 
              onClick={() => handleNavClick('pricing-plans')}
              className="hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              Pricing Tiers
            </button>
            <button 
              onClick={() => handleNavClick('pay-as-you-build')}
              className="flex items-center gap-1.5 text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 font-semibold transition-colors cursor-pointer bg-cyan-50 dark:bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-800/40"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Pay-As-You-Build
            </button>
            <button 
              onClick={() => handleNavClick('addons')}
              className="hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              Add-ons
            </button>
            <button 
              onClick={() => handleNavClick('faqs')}
              className="hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Right Controls: Desktop */}
          <div className="hidden md:flex items-center gap-2 lg:gap-2.5">
            
            {/* Currency Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono">
              {(['NGN', 'USD', 'GBP'] as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  onClick={() => onCurrencyChange(code)}
                  className={`px-2 py-1 rounded-md transition-all font-semibold cursor-pointer ${
                    activeCurrency === code
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                  title={`Switch currency to ${code}`}
                >
                  {code === 'NGN' ? '₦ NGN' : code === 'USD' ? '$ USD' : '£ GBP'}
                </button>
              ))}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer text-xs font-medium"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden xl:inline text-[11px] font-semibold text-slate-300">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden xl:inline text-[11px] font-semibold text-slate-700">Light</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Quick Chat */}
            <button
              onClick={() => onDirectWhatsApp()}
              className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Chat directly on WhatsApp (+2348166818076)"
            >
              <MessageSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className="hidden xl:inline">+234 816 681 8076</span>
            </button>

            {/* Direct Email CTA */}
            <button
              onClick={onDirectEmail}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Send email to pinnaclecrypt@gmail.com"
            >
              <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="hidden xl:inline">Email Us</span>
            </button>

            {/* Agency Customizer Tool */}
            <button
              onClick={onOpenCustomizer}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
              title="Customize agency branding & settings"
            >
              <Settings2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </button>

            {/* Custom Quote CTA */}
            <button
              onClick={onOpenProposalModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold shadow-sm shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
            >
              <span>Custom Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* Mobile Right Controls: Compact & Responsive */}
          <div className="flex items-center gap-1.5 md:hidden">
            
            {/* Quick Currency Toggle for Mobile */}
            <button
              onClick={() => {
                const order: CurrencyCode[] = ['NGN', 'USD', 'GBP'];
                const nextIdx = (order.indexOf(activeCurrency) + 1) % order.length;
                onCurrencyChange(order[nextIdx]);
              }}
              className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-[11px] font-mono font-bold"
              title="Click to cycle currency"
            >
              {activeCurrency === 'NGN' ? '₦ NGN' : activeCurrency === 'USD' ? '$ USD' : '£ GBP'}
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Quick WhatsApp icon button on mobile */}
            <button
              onClick={() => onDirectWhatsApp()}
              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              title="WhatsApp: +2348166818076"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 cursor-pointer"
              aria-label="Open mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Slide-Down Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#0c101d]/98 backdrop-blur-2xl px-4 py-5 shadow-2xl transition-all animate-in slide-in-from-top duration-200">
          <div className="space-y-4">
            
            {/* Quick Currency & Theme Bar in Drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Mode:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleTheme}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                >
                  {theme === 'dark' ? (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Light</span>
                    </>
                  )}
                </button>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono">
                  {(['NGN', 'USD', 'GBP'] as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => onCurrencyChange(code)}
                      className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                        activeCurrency === code
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Nav links */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick('pricing-plans')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-left"
              >
                <Package className="w-4 h-4 text-indigo-500" />
                <span>6 Pricing Tiers</span>
              </button>

              <button
                onClick={() => handleNavClick('pay-as-you-build')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/60 text-xs font-semibold text-left"
              >
                <TrendingUp className="w-4 h-4 text-cyan-500" />
                <span>Pay-As-You-Build</span>
              </button>

              <button
                onClick={() => handleNavClick('addons')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-left"
              >
                <Layers className="w-4 h-4 text-purple-500" />
                <span>Add-on Powerups</span>
              </button>

              <button
                onClick={() => handleNavClick('faqs')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-left"
              >
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>FAQs & Terms</span>
              </button>
            </div>

            {/* Direct Contact CTAs */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              
              {/* WhatsApp CTA */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onDirectWhatsApp();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span>WhatsApp: +234 816 681 8076</span>
                </div>
                <span className="text-[10px] uppercase font-mono font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-600 dark:text-emerald-300">
                  Instant
                </span>
              </button>

              {/* Email CTA */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onDirectEmail();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-500" />
                  <span>Email: pinnaclecrypt@gmail.com</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCustomizer();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
              >
                <Settings2 className="w-4 h-4 text-slate-500" />
                <span>Agency Settings</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenProposalModal();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20"
              >
                <span>Custom Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
