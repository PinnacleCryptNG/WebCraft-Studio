import React, { useState } from 'react';
import { ProofOfWorkProject, CurrencyCode } from '../types';
import { CURRENCY_RATES } from '../data/pricingData';
import { 
  X, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  ArrowRight, 
  ShoppingBag, 
  BookOpen, 
  Calculator, 
  Volume2, 
  Send,
  Sparkles,
  Sliders,
  DollarSign
} from 'lucide-react';

interface ProjectShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProofOfWorkProject | null;
  activeCurrency: CurrencyCode;
  onSelectProjectTier: (tierId: string) => void;
  onDirectWhatsApp: (msg?: string) => void;
}

export const ProjectShowcaseModal: React.FC<ProjectShowcaseModalProps> = ({
  isOpen,
  onClose,
  project,
  activeCurrency,
  onSelectProjectTier,
  onDirectWhatsApp,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Interactive mini-states for live interactive demo inside the modal
  // 1. Tailory Demo state
  const [selectedFabric, setSelectedFabric] = useState<'Cashmere Wool' | 'Irish Linen' | 'Raw Silk'>('Cashmere Wool');
  const [selectedFit, setSelectedFit] = useState<'Slim Sartorial' | 'Relaxed Bespoke'>('Slim Sartorial');
  const [tailoryClientName, setTailoryClientName] = useState('Emeka');
  
  // 2. Memory Demo state
  const [memoryFilter, setMemoryFilter] = useState<'all' | 'milestones' | 'travel' | 'archive'>('all');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // 3. Margin Demo state
  const [sellingPrice, setSellingPrice] = useState(35000);
  const [cogsCost, setCogsCost] = useState(18000);
  const [adSpend, setAdSpend] = useState(4000);

  if (!isOpen || !project) return null;

  const currencyHelper = CURRENCY_RATES[activeCurrency];

  // Price calculations for Tailory
  const fabricPrices = {
    'Cashmere Wool': 85000,
    'Irish Linen': 70000,
    'Raw Silk': 95000,
  };
  const currentTailoryPrice = fabricPrices[selectedFabric];

  // Calculations for Margin demo
  const netProfit = Math.max(0, sellingPrice - cogsCost - adSpend);
  const grossMarginPercent = sellingPrice > 0 ? Math.round(((sellingPrice - cogsCost) / sellingPrice) * 100) : 0;
  const netMarginPercent = sellingPrice > 0 ? Math.round((netProfit / sellingPrice) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 dark:bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3 sm:p-6 max-h-[96vh] flex flex-col my-auto">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/40 flex items-center justify-center text-indigo-600 dark:text-cyan-400 font-display font-black text-base sm:text-lg shrink-0">
              {project.title.slice(0, 1)}
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-cyan-950/60 text-indigo-700 dark:text-cyan-400 border border-indigo-200 dark:border-cyan-800/40">
                  {project.badge}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
                  • {project.category}
                </span>
              </div>
              <h2 className="text-base sm:text-lg md:text-xl font-display font-black text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2 mt-0.5">
                <span>{project.title}</span>
                <span className="font-normal text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate max-w-[150px] sm:max-w-xs">
                  — {project.tagline}
                </span>
              </h2>
            </div>
          </div>

          {/* Viewport switch & Close */}
          <div className="flex items-center gap-2">
            
            {/* Desktop / Mobile Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  deviceMode === 'desktop'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Switch to Desktop Screen Demo"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>

              <button
                onClick={() => setDeviceMode('mobile')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  deviceMode === 'mobile'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Switch to Mobile Screen Demo"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="my-3 sm:my-4 flex-1 overflow-y-auto space-y-4 pr-1">
          
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block">{m.label}</span>
                <span className="text-sm sm:text-base font-display font-black text-slate-900 dark:text-white mt-0.5 block">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Interactive Device Screen Frame */}
          <div className="flex justify-center bg-slate-100/80 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 sm:p-5">
            <div className={`transition-all duration-300 ${
              deviceMode === 'desktop' ? 'w-full max-w-3xl' : 'w-full max-w-[380px]'
            } bg-white dark:bg-[#0c101d] rounded-2xl border border-slate-300 dark:border-slate-700/80 shadow-2xl overflow-hidden flex flex-col`}>
              
              {/* Device Status & Title Bar */}
              <div className="bg-slate-100 dark:bg-slate-900 px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="bg-white dark:bg-slate-950 px-3 py-0.5 rounded-md text-[10px] font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 truncate">
                  {project.title.toLowerCase()}.studio / demo
                </div>
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  INTERACTIVE
                </div>
              </div>

              {/* DEMO 1: TAILORY INTERACTIVE SIMULATOR */}
              {project.mockupType === 'tailory' && (
                <div className="p-3.5 sm:p-5 text-left space-y-4">
                  
                  {/* Tailory Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                      <span className="font-display font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                        TAILORY<span className="text-amber-500">.</span>
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 font-semibold whitespace-nowrap">
                      Bespoke Sartorial Studio
                    </span>
                  </div>

                  {/* Responsive Form Layout: Stacks cleanly on Mobile Mode, 2-cols on Desktop Mode */}
                  <div className={`grid gap-3.5 ${
                    deviceMode === 'desktop' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                  }`}>
                    
                    {/* Left/Top: Customizer Form Controls */}
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                      
                      {/* Fabric Selection */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono uppercase font-bold text-[10px] text-amber-600 dark:text-amber-400">
                            Step 1: Fabric Selection
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                            ₦{currentTailoryPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {(['Cashmere Wool', 'Irish Linen', 'Raw Silk'] as const).map((fab) => (
                            <button
                              key={fab}
                              onClick={() => setSelectedFabric(fab)}
                              className={`p-2 rounded-lg text-[11px] font-semibold text-center transition-all cursor-pointer ${
                                selectedFabric === fab 
                                  ? 'bg-amber-500 text-white shadow-xs font-bold' 
                                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-400'
                              }`}
                            >
                              <span className="block truncate">{fab}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Silhouette Fit */}
                      <div>
                        <span className="font-mono uppercase font-bold text-[10px] text-amber-600 dark:text-amber-400 block mb-1.5">
                          Step 2: Silhouette Fit
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {(['Slim Sartorial', 'Relaxed Bespoke'] as const).map((fit) => (
                            <button
                              key={fit}
                              onClick={() => setSelectedFit(fit)}
                              className={`p-2 rounded-lg text-[11px] font-semibold text-center transition-all cursor-pointer ${
                                selectedFit === fit 
                                  ? 'bg-amber-500 text-white shadow-xs font-bold' 
                                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-400'
                              }`}
                            >
                              <span className="block truncate">{fit}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Client Name Input */}
                      <div>
                        <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">
                          Client Fitting Name
                        </label>
                        <input
                          type="text"
                          value={tailoryClientName}
                          onChange={(e) => setTailoryClientName(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs font-medium focus:ring-1 focus:ring-amber-500 outline-none"
                          placeholder="e.g. Emeka Okafor"
                        />
                      </div>
                    </div>

                    {/* Right/Bottom: Live Order Summary Card */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-50 to-white dark:from-amber-950/30 dark:via-slate-900 dark:to-slate-950 border border-amber-300/40 dark:border-amber-500/20 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-amber-200/60 dark:border-slate-800">
                          <span className="font-bold text-slate-900 dark:text-white">Bespoke Two-Piece Suit</span>
                          <span className="font-mono font-black text-amber-600 dark:text-amber-400 text-sm">
                            ₦{currentTailoryPrice.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="mt-2.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                          <div className="flex justify-between items-center">
                            <span>Selected Fabric:</span>
                            <strong className="text-slate-900 dark:text-white">{selectedFabric}</strong>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Silhouette Fit:</span>
                            <strong className="text-slate-900 dark:text-white">{selectedFit}</strong>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Client Name:</span>
                            <strong className="text-slate-900 dark:text-white">{tailoryClientName || 'Guest'}</strong>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Turnaround:</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">3-4 Days Delivery</span>
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Routing Action */}
                      <button
                        onClick={() => onDirectWhatsApp(`Hello! 👋 I am testing the Tailory Bespoke demo for ${selectedFabric} suit (${selectedFit}) for ${tailoryClientName}. I want to build a similar website.`)}
                        className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Test WhatsApp Order Routing</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* DEMO 2: MEMORY INTERACTIVE SIMULATOR */}
              {project.mockupType === 'memory' && (
                <div className="p-3.5 sm:p-5 text-left space-y-4">
                  
                  {/* Memory Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                      <span className="font-display font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                        MEMORY<span className="text-indigo-500">.</span>
                      </span>
                    </div>
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isPlayingAudio ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlayingAudio ? 'Ambient Sound: ON' : 'Play Atmosphere'}</span>
                    </button>
                  </div>

                  {/* Filter chips */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    {(['all', 'milestones', 'travel', 'archive'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setMemoryFilter(filter)}
                        className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                          memoryFilter === filter 
                            ? 'bg-indigo-600 text-white shadow-xs' 
                            : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  {/* Simulated Memory Cards */}
                  <div className={`grid gap-2.5 text-xs ${
                    deviceMode === 'desktop' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                  }`}>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-cyan-400">OCTOBER 2025</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">Milestone</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Studio Foundation & Genesis</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        Gathering the first core cohort of creators and establishing the creative roadmap with zero technical friction.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-cyan-400">DECEMBER 2025</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">Travel</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Expedition to Obudu Plateau</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        High-altitude photography archives, voice journal field notes, and immersive mountain panoramas.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* DEMO 3: MARGIN INTERACTIVE SIMULATOR */}
              {project.mockupType === 'margin' && (
                <div className="p-3.5 sm:p-5 text-left space-y-4">
                  
                  {/* Margin Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                      <span className="font-display font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                        MARGIN<span className="text-emerald-500">.</span>
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-semibold font-mono">
                      Unit Economics Engine
                    </span>
                  </div>

                  {/* Calculator Inputs & Live Output */}
                  <div className={`grid gap-3.5 ${
                    deviceMode === 'desktop' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                  }`}>
                    
                    {/* Interactive Sliders */}
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                      <div>
                        <div className="flex justify-between text-[11px] font-semibold mb-1">
                          <span className="text-slate-700 dark:text-slate-300">Retail Price:</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-cyan-400">₦{sellingPrice.toLocaleString()}</span>
                        </div>
                        <input
                          type="range"
                          min={5000}
                          max={100000}
                          step={1000}
                          value={sellingPrice}
                          onChange={(e) => setSellingPrice(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-semibold mb-1">
                          <span className="text-slate-700 dark:text-slate-300">Product Cost (COGS):</span>
                          <span className="font-mono font-bold text-rose-500">₦{cogsCost.toLocaleString()}</span>
                        </div>
                        <input
                          type="range"
                          min={1000}
                          max={Math.max(2000, sellingPrice - 1000)}
                          step={1000}
                          value={cogsCost}
                          onChange={(e) => setCogsCost(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-semibold mb-1">
                          <span className="text-slate-700 dark:text-slate-300">Shipping & Ad Spend:</span>
                          <span className="font-mono font-bold text-amber-500">₦{adSpend.toLocaleString()}</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={15000}
                          step={500}
                          value={adSpend}
                          onChange={(e) => setAdSpend(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                    </div>

                    {/* Live Financial Scorecard */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-slate-50 to-white dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-950 border border-emerald-300/40 dark:border-emerald-500/20 flex flex-col justify-between space-y-2.5">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                          Live Profit Output
                        </span>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] text-slate-500 block">Gross Margin</span>
                            <span className="text-base font-black text-slate-900 dark:text-white font-mono">{grossMarginPercent}%</span>
                          </div>
                          <div className="p-2 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] text-slate-500 block">Net Margin</span>
                            <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">{netMarginPercent}%</span>
                          </div>
                        </div>

                        <div className="p-2.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-center">
                          <span className="text-[10px] text-slate-600 dark:text-slate-300 block">Net Profit per Unit:</span>
                          <span className="text-lg font-black text-emerald-700 dark:text-emerald-300 font-mono">₦{netProfit.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-500 dark:text-slate-400 text-center font-medium">
                        Instant Live Math • Ready for Merchant Bookkeeping
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Features Delivered & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="md:col-span-2 p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block mb-2">
                Delivered Capabilities & Solutions
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                  Built For
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mb-2">
                  {project.targetAudience}
                </span>

                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                  Core Highlights
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.highlights.map((item, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-semibold">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {project.clientQuote && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-200 dark:border-slate-800 text-[11px] italic text-slate-600 dark:text-slate-400">
                  {project.clientQuote.feedback}
                  <span className="block mt-1 font-bold text-indigo-600 dark:text-cyan-400 not-italic text-[10px]">
                    — {project.clientQuote.clientName} ({project.clientQuote.role})
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 shrink-0 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            <span>Built under the </span>
            <strong className="text-slate-900 dark:text-white">{project.packageTierName}</strong> • {project.deliveryTime}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onSelectProjectTier(project.packageTierId);
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer flex items-center gap-1.5 transition-all active:scale-98"
            >
              <span>Build A Site Like {project.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
