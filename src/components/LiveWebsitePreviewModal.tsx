import React, { useState } from 'react';
import { PricingTier, CurrencyCode } from '../types';
import { CURRENCY_RATES } from '../data/pricingData';
import { 
  X, 
  Smartphone, 
  Monitor, 
  ArrowRight, 
  Star, 
  ShoppingBag
} from 'lucide-react';

interface LiveWebsitePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: PricingTier | null;
  activeCurrency: CurrencyCode;
  onSelectTier: (tier: PricingTier) => void;
}

export const LiveWebsitePreviewModal: React.FC<LiveWebsitePreviewModalProps> = ({
  isOpen,
  onClose,
  tier,
  activeCurrency,
  onSelectTier,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'services' | 'catalog' | 'blog' | 'contact'>('home');

  if (!isOpen || !tier) return null;

  const currencyHelper = CURRENCY_RATES[activeCurrency];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 dark:bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-6 max-h-[95vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-cyan-400 uppercase">
                {tier.maxPages} Wireframe Blueprint
              </span>
              <h2 className="text-lg sm:text-xl font-display font-black text-slate-900 dark:text-white">
                {tier.name} Package Preview ({currencyHelper.format(tier.price)})
              </h2>
            </div>
          </div>

          {/* Viewport switch & Close */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded flex items-center gap-1 transition-all ${
                  deviceMode === 'desktop' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 rounded flex items-center gap-1 transition-all ${
                  deviceMode === 'mobile' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Simulated Browser Frame */}
        <div className="my-4 flex-1 flex justify-center overflow-y-auto bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 p-3 sm:p-6">
          <div className={`transition-all duration-300 ${
            deviceMode === 'desktop' ? 'w-full max-w-4xl' : 'w-[360px]'
          } bg-white dark:bg-[#0e1320] rounded-xl border border-slate-300 dark:border-slate-700/80 shadow-2xl overflow-hidden flex flex-col`}>
            
            {/* Simulated Browser Chrome Bar */}
            <div className="bg-slate-100 dark:bg-slate-900 px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="bg-white dark:bg-slate-950 px-4 py-0.5 rounded-md text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                https://yourclientbusiness.com
              </div>
              <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                SSL
              </div>
            </div>

            {/* Simulated Website Navigation */}
            <div className="bg-white/90 dark:bg-slate-900/90 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-display font-bold text-slate-900 dark:text-white tracking-tight text-sm">
                BRANDNAME<span className="text-indigo-600 dark:text-cyan-400">.</span>
              </span>

              <div className="flex items-center gap-3 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                <span className={`cursor-pointer ${activeTab === 'home' ? 'text-indigo-600 dark:text-cyan-400 font-bold' : ''}`} onClick={() => setActiveTab('home')}>Home</span>
                {tier.id !== 'starter' && (
                  <>
                    <span className={`cursor-pointer ${activeTab === 'about' ? 'text-indigo-600 dark:text-cyan-400 font-bold' : ''}`} onClick={() => setActiveTab('about')}>About</span>
                    <span className={`cursor-pointer ${activeTab === 'services' ? 'text-indigo-600 dark:text-cyan-400 font-bold' : ''}`} onClick={() => setActiveTab('services')}>Services</span>
                  </>
                )}
                {['professional', 'business-pro', 'premium'].includes(tier.id) && (
                  <>
                    <span className={`cursor-pointer ${activeTab === 'catalog' ? 'text-indigo-600 dark:text-cyan-400 font-bold' : ''}`} onClick={() => setActiveTab('catalog')}>Catalog</span>
                    <span className={`cursor-pointer ${activeTab === 'blog' ? 'text-indigo-600 dark:text-cyan-400 font-bold' : ''}`} onClick={() => setActiveTab('blog')}>Blog</span>
                  </>
                )}
                {tier.id !== 'starter' && (
                  <span className={`cursor-pointer ${activeTab === 'contact' ? 'text-indigo-600 dark:text-cyan-400 font-bold' : ''}`} onClick={() => setActiveTab('contact')}>Contact</span>
                )}
              </div>

              <div className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-500/30">
                WhatsApp Us
              </div>
            </div>

            {/* Simulated Website Body Content */}
            <div className="p-5 sm:p-8 space-y-6 overflow-y-auto text-left">
              
              {/* Hero Banner inside sample */}
              <div className="p-6 rounded-xl bg-gradient-to-tr from-indigo-50 via-slate-50 to-white dark:from-indigo-950/60 dark:via-slate-900 dark:to-slate-950 border border-indigo-200 dark:border-indigo-500/20">
                <span className="text-[10px] uppercase font-mono font-bold text-indigo-700 dark:text-cyan-400 bg-indigo-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded border border-indigo-200 dark:border-cyan-800/40">
                  {tier.name} Showcase Layout
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white mt-2">
                  Modern Solutions For Ambitious Brands
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 max-w-md">
                  Delivering unmatched value, trusted by over 200+ clients across the country with lightning fast responsiveness.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold">
                    Order Services
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-transparent">
                    Learn More
                  </div>
                </div>
              </div>

              {/* Services or Features Grid */}
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                  Featured Capabilities
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                    <div className="w-6 h-6 rounded bg-indigo-50 dark:bg-cyan-500/20 text-indigo-700 dark:text-cyan-400 font-bold flex items-center justify-center text-xs mb-2">01</div>
                    <h5 className="font-bold text-xs text-slate-900 dark:text-white">Core Offerings</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Highlighted business sectors with high-converting CTAs.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                    <div className="w-6 h-6 rounded bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-xs mb-2">02</div>
                    <h5 className="font-bold text-xs text-slate-900 dark:text-white">Direct WhatsApp</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Instant 1-tap customer ordering and inquiries.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                    <div className="w-6 h-6 rounded bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold flex items-center justify-center text-xs mb-2">03</div>
                    <h5 className="font-bold text-xs text-slate-900 dark:text-white">Lightning Fast</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Sub-second page load times with global edge CDN.</p>
                  </div>
                </div>
              </div>

              {/* Testimonials & Proof (if Business Plus+) */}
              {['business-plus', 'professional', 'business-pro', 'premium'].includes(tier.id) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-emerald-300 dark:border-emerald-500/30">
                  <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 ml-1">5.0 / 5.0 (48 Reviews)</span>
                  </div>
                  <p className="text-xs italic text-slate-700 dark:text-slate-200">
                    "This website generated 3x more customer phone calls in our first month alone. Outstanding craftsmanship!"
                  </p>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-cyan-400 mt-1 block">
                    — Managing Director, Zenith Dynamics
                  </span>
                </div>
              )}

              {/* Searchable Catalog Mockup (if Professional+) */}
              {['professional', 'business-pro', 'premium'].includes(tier.id) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-indigo-200 dark:border-indigo-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      Dynamic Product & Service Catalog
                    </span>
                    <span className="text-[10px] font-mono text-indigo-600 dark:text-cyan-300 font-bold">Search & Filter Ready</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-white dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">Commercial Package A</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">₦85,000 / unit</span>
                    </div>
                    <div className="p-2 bg-white dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">Enterprise Service B</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Custom Quote</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 shrink-0 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            <span>Includes </span>
            <strong className="text-slate-900 dark:text-white">{tier.deliveryDays}</strong> turnaround and{' '}
            <strong className="text-indigo-600 dark:text-cyan-300">{tier.revisions}</strong>.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => {
                onSelectTier(tier);
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>Choose This Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
