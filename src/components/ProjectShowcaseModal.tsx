import React, { useState } from 'react';
import { ProofOfWorkProject, CurrencyCode } from '../types';
import { CURRENCY_RATES } from '../data/pricingData';
import { 
  X, 
  ExternalLink, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShoppingBag, 
  BookOpen, 
  Calculator, 
  Volume2, 
  TrendingUp, 
  DollarSign, 
  Layers,
  Send
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
  const [selectedFabric, setSelectedFabric] = useState<'Cashmere Wool' | 'Pure Irish Linen' | 'Raw Silk'>('Cashmere Wool');
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

  // Calculations for Margin demo
  const netProfit = Math.max(0, sellingPrice - cogsCost - adSpend);
  const grossMarginPercent = sellingPrice > 0 ? Math.round(((sellingPrice - cogsCost) / sellingPrice) * 100) : 0;
  const netMarginPercent = sellingPrice > 0 ? Math.round((netProfit / sellingPrice) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/75 dark:bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-6 max-h-[96vh] flex flex-col my-auto">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/40 flex items-center justify-center text-indigo-600 dark:text-cyan-400 font-display font-black text-lg">
              {project.title.slice(0, 1)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-cyan-950/60 text-indigo-700 dark:text-cyan-400 border border-indigo-200 dark:border-cyan-800/40">
                  {project.badge}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
                  • {project.category}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-display font-black text-slate-900 dark:text-white flex items-center gap-2">
                {project.title} — <span className="font-semibold text-sm text-slate-600 dark:text-slate-300 truncate max-w-xs">{project.tagline}</span>
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

        {/* Modal Body: Two-column layout on Desktop */}
        <div className="my-4 flex-1 overflow-y-auto space-y-4">
          
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block">{m.label}</span>
                <span className="text-base sm:text-lg font-display font-black text-slate-900 dark:text-white mt-0.5 block">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Interactive Simulated Device Container */}
          <div className="flex justify-center bg-slate-100/70 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-5">
            <div className={`transition-all duration-300 ${
              deviceMode === 'desktop' ? 'w-full max-w-4xl' : 'w-[360px]'
            } bg-white dark:bg-[#0c101d] rounded-xl border border-slate-300 dark:border-slate-700/80 shadow-2xl overflow-hidden flex flex-col`}>
              
              {/* Browser Address Bar */}
              <div className="bg-slate-100 dark:bg-slate-900 px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="bg-white dark:bg-slate-950 px-4 py-0.5 rounded-md text-[10px] font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 truncate max-w-[200px] sm:max-w-xs">
                  {project.liveUrl || `https://${project.id}.applet.preview`}
                </div>
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  LIVE DEMO
                </div>
              </div>

              {/* DEMO 1: TAILORY INTERACTIVE SIMULATOR */}
              {project.mockupType === 'tailory' && (
                <div className="p-4 sm:p-6 text-left space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-amber-500" />
                      <span className="font-display font-black text-lg tracking-tight text-slate-900 dark:text-white">
                        TAILORY<span className="text-amber-500">.</span>
                      </span>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 font-semibold">
                      Bespoke Sartorial Studio
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left: Customizer controls */}
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                      <span className="font-mono uppercase font-bold text-[10px] text-amber-600 dark:text-amber-400">Step 1: Fabric Selection</span>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Cashmere Wool', 'Pure Irish Linen', 'Raw Silk'] as const).map((fab) => (
                          <button
                            key={fab}
                            onClick={() => setSelectedFabric(fab)}
                            className={`p-2 rounded-lg text-[11px] font-semibold text-center transition-all ${
                              selectedFabric === fab 
                                ? 'bg-amber-500 text-white shadow-xs' 
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {fab}
                          </button>
                        ))}
                      </div>

                      <span className="font-mono uppercase font-bold text-[10px] text-amber-600 dark:text-amber-400 block pt-1">Step 2: Fit Cut</span>
                      <div className="grid grid-cols-2 gap-2">
                        {(['Slim Sartorial', 'Relaxed Bespoke'] as const).map((fit) => (
                          <button
                            key={fit}
                            onClick={() => setSelectedFit(fit)}
                            className={`p-2 rounded-lg text-[11px] font-semibold text-center transition-all ${
                              selectedFit === fit 
                                ? 'bg-amber-500 text-white shadow-xs' 
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {fit}
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Your Name</label>
                        <input
                          type="text"
                          value={tailoryClientName}
                          onChange={(e) => setTailoryClientName(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                          placeholder="Client Name"
                        />
                      </div>
                    </div>

                    {/* Right: Live Garment Preview Summary */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-50 to-white dark:from-amber-950/30 dark:via-slate-900 dark:to-slate-950 border border-amber-300/40 dark:border-amber-500/20 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-amber-200/60 dark:border-slate-800">
                          <span className="font-bold text-slate-900 dark:text-white">Bespoke Two-Piece Suit</span>
                          <span className="font-mono font-black text-amber-600 dark:text-amber-400">₦85,000</span>
                        </div>
                        <div className="mt-3 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                          <div className="flex justify-between">
                            <span>Selected Fabric:</span>
                            <strong className="text-slate-900 dark:text-white">{selectedFabric}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Silhouette Fit:</span>
                            <strong className="text-slate-900 dark:text-white">{selectedFit}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Client Name:</span>
                            <strong className="text-slate-900 dark:text-white">{tailoryClientName || 'Guest'}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Turnaround:</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">3-4 Business Days</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onDirectWhatsApp(`Hello! 👋 I am interested in building a fashion & custom tailor website like *Tailory* with the bespoke measurement customizer.`)}
                        className="mt-4 w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
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
                <div className="p-4 sm:p-6 text-left space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-500" />
                      <span className="font-display font-black text-lg tracking-tight text-slate-900 dark:text-white">
                        MEMORY<span className="text-indigo-500">.</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                          isPlayingAudio ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isPlayingAudio ? 'Playing Ambient Chime' : 'Sound Atmosphere'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter chips */}
                  <div className="flex items-center gap-1.5 text-xs">
                    {(['all', 'milestones', 'travel', 'archive'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setMemoryFilter(filter)}
                        className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all ${
                          memoryFilter === filter 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  {/* Simulated Memory Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-cyan-400">OCTOBER 2025</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">Milestone</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">Studio Foundation & Genesis</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        Gathering the first core cohort of creators and establishing the creative roadmap with zero technical friction.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-cyan-400">DECEMBER 2025</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">Travel</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">Expedition to Obudu Plateau</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        High-altitude photography archives, voice journal field notes, and immersive mountain panoramas.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* DEMO 3: MARGIN INTERACTIVE SIMULATOR */}
              {project.mockupType === 'margin' && (
                <div className="p-4 sm:p-6 text-left space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-emerald-500" />
                      <span className="font-display font-black text-lg tracking-tight text-slate-900 dark:text-white">
                        MARGIN<span className="text-emerald-500">.</span>
                      </span>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-semibold font-mono">
                      Unit Economics Engine
                    </span>
                  </div>

                  {/* Calculator Inputs & Live Output */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left: Interactive Sliders */}
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                      <div>
                        <div className="flex justify-between text-[11px] font-semibold mb-1">
                          <span className="text-slate-700 dark:text-slate-300">Item Retail Price:</span>
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
                          <span className="text-slate-700 dark:text-slate-300">Unit COGS (Product Cost):</span>
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

                    {/* Right: Live Financial Scorecard */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-slate-50 to-white dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-950 border border-emerald-300/40 dark:border-emerald-500/20 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">Live Profit Output</span>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] text-slate-500 block">Gross Margin</span>
                            <span className="text-base font-black text-slate-900 dark:text-white font-mono">{grossMarginPercent}%</span>
                          </div>
                          <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] text-slate-500 block">Net Margin</span>
                            <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">{netMarginPercent}%</span>
                          </div>
                        </div>

                        <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-center">
                          <span className="text-[10px] text-slate-600 dark:text-slate-300 block">Net Profit per Unit:</span>
                          <span className="text-lg font-black text-emerald-700 dark:text-emerald-300 font-mono">₦{netProfit.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-500 dark:text-slate-400 text-center pt-2 font-medium">
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
            <div className="md:col-span-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
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

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
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
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] italic text-slate-600 dark:text-slate-400">
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
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer flex items-center gap-1.5 transition-all"
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
