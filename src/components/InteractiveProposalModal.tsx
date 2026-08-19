import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PricingTier, CurrencyCode, AgencySettings } from '../types';
import { CURRENCY_RATES, ADDON_SERVICES } from '../data/pricingData';
import { 
  X, 
  MessageSquare, 
  Printer, 
  Copy, 
  Check, 
  Sparkles, 
  CreditCard, 
  Calendar, 
  Layers
} from 'lucide-react';

interface InteractiveProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: PricingTier;
  selectedAddonIds: string[];
  onToggleAddon: (id: string) => void;
  activeCurrency: CurrencyCode;
  agencySettings: AgencySettings;
}

export const InteractiveProposalModal: React.FC<InteractiveProposalModalProps> = ({
  isOpen,
  onClose,
  selectedTier,
  selectedAddonIds,
  onToggleAddon,
  activeCurrency,
  agencySettings,
}) => {
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentPlan, setPaymentPlan] = useState<'50_50' | 'milestones_3' | 'upfront_discount'>('50_50');
  const [timelinePreference, setTimelinePreference] = useState<'standard' | 'rush_express'>('standard');
  const [notes, setNotes] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const currencyHelper = CURRENCY_RATES[activeCurrency];

  // Calculations
  const basePriceNGN = selectedTier.price;
  const selectedAddonObjects = ADDON_SERVICES.filter(a => selectedAddonIds.includes(a.id));
  const addonsTotalNGN = selectedAddonObjects.reduce((acc, a) => acc + a.priceNGN, 0);
  
  const rushFeeNGN = timelinePreference === 'rush_express' ? Math.round(basePriceNGN * 0.25) : 0;
  const subtotalNGN = basePriceNGN + addonsTotalNGN + rushFeeNGN;
  
  const upfrontDiscountNGN = paymentPlan === 'upfront_discount' 
    ? Math.round(subtotalNGN * (agencySettings.customDiscountPercent / 100)) 
    : 0;
  
  const totalNGN = subtotalNGN - upfrontDiscountNGN;

  // Deposit breakdown
  const depositAmountNGN = paymentPlan === '50_50'
    ? Math.round(totalNGN * 0.5)
    : paymentPlan === 'milestones_3'
    ? Math.round(totalNGN * 0.4)
    : totalNGN;

  const balanceAmountNGN = totalNGN - depositAmountNGN;

  const handleGenerateWhatsAppMessage = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    const addonsText = selectedAddonObjects.length > 0 
      ? selectedAddonObjects.map(a => `• ${a.name} (${currencyHelper.format(a.priceNGN)})`).join('\n')
      : 'None';

    const message = `*NEW WEBSITE PROJECT INQUIRY* 🚀
━━━━━━━━━━━━━━━━━━━━
*Client:* ${clientName || 'Valued Client'}
*Business:* ${businessName || 'SMB Business'}
*Contact:* ${phone || 'N/A'}

*Selected Package:* ${selectedTier.name} (${currencyHelper.format(basePriceNGN)})
*Page Scope:* ${selectedTier.maxPages}
*Turnaround:* ${selectedTier.deliveryDays} ${timelinePreference === 'rush_express' ? '(⚡ Rush Express +25%)' : ''}

*Optional Add-ons:*
${addonsText}

*Payment Structure:* ${
  paymentPlan === '50_50' 
    ? '50% Initial Deposit / 50% Upon Approval' 
    : paymentPlan === 'milestones_3' 
    ? '40% Kickoff / 30% First Draft / 30% Launch' 
    : `100% Upfront (${agencySettings.customDiscountPercent}% Discount Applied)`
}

*Estimated Total:* ${currencyHelper.format(totalNGN)}
*Initial Deposit:* ${currencyHelper.format(depositAmountNGN)}
*Final Balance:* ${currencyHelper.format(balanceAmountNGN)}

${notes ? `*Project Notes:* ${notes}\n` : ''}━━━━━━━━━━━━━━━━━━━━
Sent from ${agencySettings.agencyName} Rate Card Proposal Builder`;

    const encoded = encodeURIComponent(message);
    const targetUrl = `https://wa.me/${agencySettings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encoded}`;
    window.open(targetUrl, '_blank');
  };

  const handleCopySummary = () => {
    const summary = `Proposal for ${businessName || 'Client'}:
Plan: ${selectedTier.name} (${currencyHelper.format(basePriceNGN)})
Add-ons: ${selectedAddonObjects.length > 0 ? selectedAddonObjects.map(a => a.name).join(', ') : 'None'}
Total: ${currencyHelper.format(totalNGN)} (Deposit: ${currencyHelper.format(depositAmountNGN)})
Agency: ${agencySettings.agencyName} (${agencySettings.email})`;

    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 dark:bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider">
              PROJECT PROPOSAL & ESTIMATE
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white">
              {selectedTier.name} Package Builder
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto my-5 flex-1 pr-1 space-y-6">
          
          {/* Client & Business Info */}
          <div className="bg-slate-50 dark:bg-slate-950/60 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
              1. Client & Business Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Adebayo Ogunlesi"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">Business / Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Prime Logistics Ltd"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">WhatsApp / Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. +234 816 681 8076"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Selected Add-ons Quick Toggle */}
          <div className="bg-slate-50 dark:bg-slate-950/60 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
              2. Optional Power-Up Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ADDON_SERVICES.map((addon) => {
                const isChecked = selectedAddonIds.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => onToggleAddon(addon.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between text-xs ${
                      isChecked
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-400 dark:border-cyan-500/50 text-slate-900 dark:text-white'
                        : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="pr-2">
                      <span className="font-semibold block">{addon.name}</span>
                      <span className="text-[11px] text-indigo-600 dark:text-cyan-300 font-mono font-bold">
                        +{currencyHelper.format(addon.priceNGN)}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="rounded text-indigo-600 dark:text-cyan-500 focus:ring-0 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Terms & Timeline Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Payment Structure */}
            <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-600 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                3. Payment Milestone Plan
              </h3>
              <div className="space-y-2 text-xs">
                <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer ${
                  paymentPlan === '50_50' 
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-500/50' 
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                }`}>
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <input 
                      type="radio" 
                      name="paymentPlan" 
                      checked={paymentPlan === '50_50'} 
                      onChange={() => setPaymentPlan('50_50')}
                    />
                    <span>50% Deposit / 50% On Approval</span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">Standard</span>
                </label>

                <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer ${
                  paymentPlan === 'milestones_3' 
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-500/50' 
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                }`}>
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <input 
                      type="radio" 
                      name="paymentPlan" 
                      checked={paymentPlan === 'milestones_3'} 
                      onChange={() => setPaymentPlan('milestones_3')}
                    />
                    <span>3 Sprints (40% / 30% / 30%)</span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">Phased</span>
                </label>

                <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer ${
                  paymentPlan === 'upfront_discount' 
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/50' 
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                }`}>
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <input 
                      type="radio" 
                      name="paymentPlan" 
                      checked={paymentPlan === 'upfront_discount'} 
                      onChange={() => setPaymentPlan('upfront_discount')}
                    />
                    <span>100% Upfront Payment</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[10px]">Save {agencySettings.customDiscountPercent}%</span>
                </label>
              </div>
            </div>

            {/* Timeline Speed */}
            <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-600 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                4. Turnaround Priority
              </h3>
              <div className="space-y-2 text-xs">
                <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer ${
                  timelinePreference === 'standard' 
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-500/50' 
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                }`}>
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <input 
                      type="radio" 
                      name="timelinePref" 
                      checked={timelinePreference === 'standard'} 
                      onChange={() => setTimelinePreference('standard')}
                    />
                    <span>Standard Pace ({selectedTier.deliveryDays})</span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">Included</span>
                </label>

                <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer ${
                  timelinePreference === 'rush_express' 
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-500/50' 
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                }`}>
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <input 
                      type="radio" 
                      name="timelinePref" 
                      checked={timelinePreference === 'rush_express'} 
                      onChange={() => setTimelinePreference('rush_express')}
                    />
                    <span>⚡ Rush Priority (24-48hr turnaround)</span>
                  </div>
                  <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-[10px]">+25%</span>
                </label>

                <div>
                  <textarea
                    placeholder="Any specific features, reference links, or notes..."
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-400 mt-1"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Quotation Summary Card */}
          <div className="p-5 rounded-xl bg-slate-100 dark:bg-gradient-to-r dark:from-slate-900 dark:via-indigo-950/50 dark:to-slate-900 border border-slate-300 dark:border-indigo-500/40 shadow-md dark:shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-slate-700 dark:text-slate-300">
                <strong>{selectedTier.name} Package</strong> ({selectedTier.maxPages})
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {currencyHelper.format(basePriceNGN)}
              </span>
            </div>

            {selectedAddonObjects.map(addon => (
              <div key={addon.id} className="flex items-center justify-between py-1.5 text-xs text-slate-600 dark:text-slate-400">
                <span>+ {addon.name}</span>
                <span className="font-mono text-indigo-600 dark:text-cyan-300 font-semibold">{currencyHelper.format(addon.priceNGN)}</span>
              </div>
            ))}

            {rushFeeNGN > 0 && (
              <div className="flex items-center justify-between py-1.5 text-xs text-amber-600 dark:text-amber-300 font-semibold">
                <span>+ Express Rush Delivery Fee</span>
                <span className="font-mono">+{currencyHelper.format(rushFeeNGN)}</span>
              </div>
            )}

            {upfrontDiscountNGN > 0 && (
              <div className="flex items-center justify-between py-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>- Upfront Payment Discount ({agencySettings.customDiscountPercent}%)</span>
                <span className="font-mono">-{currencyHelper.format(upfrontDiscountNGN)}</span>
              </div>
            )}

            <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-mono text-slate-500 dark:text-slate-400 block">Total Investment</span>
                <span className="font-display font-black text-2xl text-slate-900 dark:text-white">
                  {currencyHelper.format(totalNGN)}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs uppercase font-mono text-indigo-600 dark:text-cyan-400 font-bold block">Required Deposit to Start</span>
                <span className="font-display font-black text-xl text-indigo-600 dark:text-cyan-300">
                  {currencyHelper.format(depositAmountNGN)}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 shrink-0 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>

          <button
            onClick={handleGenerateWhatsAppMessage}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition-all cursor-pointer flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Proposal via WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
