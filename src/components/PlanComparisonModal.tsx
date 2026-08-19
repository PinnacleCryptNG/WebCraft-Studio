import React from 'react';
import { PricingTier, CurrencyCode } from '../types';
import { CURRENCY_RATES } from '../data/pricingData';
import { 
  X, 
  Check, 
  Minus, 
  ShieldCheck
} from 'lucide-react';

interface PlanComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  tiers: PricingTier[];
  activeCurrency: CurrencyCode;
  onSelectTier: (tier: PricingTier) => void;
}

export const PlanComparisonModal: React.FC<PlanComparisonModalProps> = ({
  isOpen,
  onClose,
  tiers,
  activeCurrency,
  onSelectTier,
}) => {
  if (!isOpen) return null;

  const currencyHelper = CURRENCY_RATES[activeCurrency];

  const comparisonRows = [
    {
      feature: 'Total Page Count',
      values: ['1 Page', 'Up to 3 Pages', 'Up to 5 Pages', 'Up to 7 Pages', 'Up to 10 Pages', 'Up to 15 Pages'],
    },
    {
      feature: 'Design System',
      values: ['Clean Responsive', 'Structured UI', 'Custom Bespoke UI', 'Premium Brand UI', 'Corporate Heavy', 'VIP Flagship'],
    },
    {
      feature: 'Estimated Turnaround',
      values: ['2-3 Days', '3-5 Days', '5-7 Days', '7-10 Days', '10-14 Days', '14-21 Days'],
    },
    {
      feature: 'WhatsApp CTA / Lead Routing',
      values: [true, true, true, true, true, true],
    },
    {
      feature: 'Social Media Integration',
      values: [true, true, true, true, true, true],
    },
    {
      feature: 'Google Maps Location Embed',
      values: [false, true, true, true, true, true],
    },
    {
      feature: 'Client Testimonials & Gallery',
      values: [false, false, true, true, true, true],
    },
    {
      feature: 'Contact & Lead Capture Forms',
      values: ['Basic CTA', 'Contact Form', 'Interactive Form', 'Dynamic Forms', 'Multi-step Forms', 'Advanced Forms'],
    },
    {
      feature: 'Micro-Animations & Smooth FX',
      values: [false, false, true, true, true, true],
    },
    {
      feature: 'Searchable Product/Service Catalog',
      values: [false, false, false, true, true, true],
    },
    {
      feature: 'Dynamic Blog & News Engine',
      values: [false, false, false, true, true, true],
    },
    {
      feature: 'Google Analytics 4 & Pixel',
      values: [false, false, false, true, true, true],
    },
    {
      feature: 'Downloadable PDF Document Vault',
      values: [false, false, false, false, true, true],
    },
    {
      feature: 'Calendly & CRM Automations',
      values: [false, false, false, false, true, true],
    },
    {
      feature: 'Multi-Division Corporate Architecture',
      values: [false, false, false, false, false, true],
    },
    {
      feature: 'Post-Launch Warranty & Retainer',
      values: ['7 Days', '7 Days', '14 Days', '14 Days', '21 Days', '30 Days VIP'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 dark:bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider">
              SIDE-BY-SIDE MATRIX
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white">
              Compare All 6 Web Packages
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Table Content */}
        <div className="overflow-x-auto my-6 flex-1 pr-2">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 px-4 text-xs font-mono text-slate-500 dark:text-slate-400 uppercase w-1/4">
                  Feature / Capability
                </th>
                {tiers.map((tier) => (
                  <th key={tier.id} className="py-4 px-3 text-center">
                    <div className="font-display font-bold text-sm text-slate-900 dark:text-white">
                      {tier.name}
                    </div>
                    <div className="font-mono text-xs font-bold text-indigo-600 dark:text-cyan-300 mt-0.5">
                      {currencyHelper.format(tier.price)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 text-slate-800 dark:text-slate-300 font-medium">
                    {row.feature}
                  </td>
                  {row.values.map((val, i) => (
                    <td key={i} className="py-3 px-3 text-center">
                      {typeof val === 'boolean' ? (
                        val ? (
                          <div className="inline-flex p-1 rounded bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="inline-flex p-1 text-slate-300 dark:text-slate-600">
                            <Minus className="w-3.5 h-3.5" />
                          </div>
                        )
                      ) : (
                        <span className="font-mono font-medium text-slate-700 dark:text-slate-200">
                          {val}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-200 dark:border-slate-800">
                <td className="py-4 px-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                  Select Action
                </td>
                {tiers.map((tier) => (
                  <td key={tier.id} className="py-4 px-3 text-center">
                    <button
                      onClick={() => {
                        onSelectTier(tier);
                        onClose();
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-colors cursor-pointer shadow-xs"
                    >
                      Choose Plan
                    </button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 shrink-0 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            Every plan includes Free Cloud Deployment & SSL Encryption.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Close Matrix
          </button>
        </div>

      </div>
    </div>
  );
};
