import React, { useState, useEffect } from 'react';
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
  Package,
  ChevronRight
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
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track scroll position to set active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'proof-of-work', 'pricing-plans', 'pay-as-you-build', 'addons', 'faqs'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    {
      id: 'proof-of-work',
      label: 'Proof of Work',
      subtitle: 'Tailory, Memory, Margin',
      icon: <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />,
      badge: 'Live',
    },
    {
      id: 'pricing-plans',
      label: 'Pricing Tiers',
      subtitle: '6 Ready SMB Packages',
      icon: <Package className="w-3.5 h-3.5 text-cyan-500 shrink-0" />,
      badge: null,
    },
    {
      id: 'pay-as-you-build',
      label: 'Pay-As-You-Build',
      subtitle: 'Stage-by-stage roadmap',
      icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />,
      badge: null,
    },
    {
      id: 'addons',
      label: 'Add-ons',
      subtitle: 'Hosting & Gateways',
      icon: <Layers className="w-3.5 h-3.5 text-purple-500 shrink-0" />,
      badge: null,
    },
    {
      id: 'faqs',
      label: 'FAQs',
      subtitle: 'Timelines & Terms',
      icon: <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />,
      badge: null,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/95 dark:bg-[#080b12]/95 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
          <div className="h-16 sm:h-18 flex items-center justify-between gap-2">
            
            {/* Left: Brand Logo & Title */}
            <div 
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0 py-1" 
              onClick={() => handleNavClick('hero')}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-md shadow-indigo-500/20 shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-sm sm:text-base lg:text-lg text-slate-900 dark:text-white tracking-tight leading-none whitespace-nowrap">
                    {agencySettings.agencyName}
                  </span>
                  <span className="text-[9px] uppercase font-mono tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 shrink-0 hidden xs:inline-block">
                    Rate Card
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 hidden xl:block truncate max-w-[200px] mt-0.5 font-normal">
                  {agencySettings.tagline}
                </p>
              </div>
            </div>

            {/* Center: Desktop Navigation Links (Visible on xl screens: >= 1280px) */}
            <nav className="hidden xl:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/70 p-1 rounded-full border border-slate-200/80 dark:border-slate-800/80 text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-cyan-400 shadow-xs font-bold border border-slate-200/80 dark:border-slate-700/80'
                        : 'hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Always fits comfortably without overflowing */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* Currency Switcher (3-code pills on md+, cycle button on mobile) */}
              <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono shrink-0">
                {(['NGN', 'USD', 'GBP'] as CurrencyCode[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => onCurrencyChange(code)}
                    className={`px-1.5 lg:px-2 py-1 rounded-md transition-all font-semibold cursor-pointer whitespace-nowrap ${
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

              {/* Mobile Quick Currency Toggle (< sm) */}
              <button
                onClick={() => {
                  const order: CurrencyCode[] = ['NGN', 'USD', 'GBP'];
                  const nextIdx = (order.indexOf(activeCurrency) + 1) % order.length;
                  onCurrencyChange(order[nextIdx]);
                }}
                className="sm:hidden px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-[11px] font-mono font-bold shrink-0 cursor-pointer active:scale-95"
                title="Tap to switch currency"
              >
                {activeCurrency === 'NGN' ? '₦ NGN' : activeCurrency === 'USD' ? '$ USD' : '£ GBP'}
              </button>

              {/* ☀️ / 🌙 THEME TOGGLE BUTTON - High Contrast & Always Visible */}
              <button
                onClick={onToggleTheme}
                className="p-2 sm:px-2.5 sm:py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer text-xs font-semibold shrink-0 flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme mode"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400 shrink-0 animate-in spin-in-180 duration-300" />
                    <span className="hidden 2xl:inline text-[11px] font-semibold text-slate-300">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-600 shrink-0 animate-in spin-in-180 duration-300" />
                    <span className="hidden 2xl:inline text-[11px] font-semibold text-slate-700">Dark</span>
                  </>
                )}
              </button>

              {/* Direct WhatsApp Quick Chat (Desktop & Tablet) */}
              <button
                onClick={() => onDirectWhatsApp()}
                className="hidden md:flex p-2 lg:px-2.5 lg:py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 transition-colors cursor-pointer items-center gap-1.5 text-xs font-semibold shrink-0 whitespace-nowrap"
                title="Chat directly on WhatsApp (+2348166818076)"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="hidden 2xl:inline whitespace-nowrap">WhatsApp</span>
              </button>

              {/* Direct Email CTA (Large Screens) */}
              <button
                onClick={onDirectEmail}
                className="hidden lg:flex p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer items-center justify-center shrink-0"
                title="Send email to pinnaclecrypt@gmail.com"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              </button>

              {/* Agency Customizer Gear Tool */}
              <button
                onClick={onOpenCustomizer}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer shrink-0 flex items-center justify-center"
                title="Customize agency branding & settings"
                aria-label="Agency settings"
              >
                <Settings2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              </button>

              {/* Custom Quote Primary CTA */}
              <button
                onClick={onOpenProposalModal}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold shadow-sm shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0 whitespace-nowrap"
              >
                <span>Get Quote</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              {/* Hamburger Button (Visible on screens < 1280px / xl) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg bg-indigo-600 text-white dark:bg-indigo-600 dark:text-white border border-indigo-500 cursor-pointer shrink-0 active:scale-95 flex items-center justify-center"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Full-Screen Accessible Navigation Drawer (< 1280px) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden animate-in fade-in duration-200">
          
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white dark:bg-[#0c101d] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between z-10 overflow-y-auto animate-in slide-in-from-right duration-300">
            
            {/* Top Drawer Header */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center p-[1px]">
                    <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-slate-900 dark:text-white">
                      {agencySettings.agencyName}
                    </h3>
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                      Navigation & Quick Tools
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Currency & Theme Selection Grid in Drawer */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-2">
                
                {/* 3-Currency Selector */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono flex-1">
                  {(['NGN', 'USD', 'GBP'] as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => onCurrencyChange(code)}
                      className={`flex-1 py-1.5 rounded-lg font-bold text-center transition-all ${
                        activeCurrency === code
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {code === 'NGN' ? '₦ NGN' : code === 'USD' ? '$ USD' : '£ GBP'}
                    </button>
                  ))}
                </div>

                {/* Dark / Light Toggle in Drawer */}
                <button
                  onClick={onToggleTheme}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>

              </div>
            </div>

            {/* Navigation Directory Links */}
            <div className="p-4 space-y-2 flex-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 block mb-2">
                Page Sections
              </span>

              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-800 text-slate-900 dark:text-white shadow-xs'
                        : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/80">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Bottom Drawer Actions & Direct Contacts */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2 bg-slate-50/50 dark:bg-slate-950/50">
              
              {/* Direct WhatsApp Callout */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onDirectWhatsApp();
                }}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>WhatsApp: +234 816 681 8076</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-700/80 text-emerald-100">
                  Instant
                </span>
              </button>

              {/* Direct Email Brief */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onDirectEmail();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Email: pinnaclecrypt@gmail.com</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Custom Quote & Agency Settings Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCustomizer();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer"
                >
                  <Settings2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Agency Settings</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenProposalModal();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold shadow-sm shadow-indigo-500/20 cursor-pointer"
                >
                  <span>Get Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
