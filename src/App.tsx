import React, { useState, useEffect } from 'react';
import { CurrencyCode, AgencySettings, PricingTier, ProofOfWorkProject } from './types';
import { 
  DEFAULT_AGENCY_SETTINGS, 
  PRICING_TIERS, 
  CURRENCY_RATES 
} from './data/pricingData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProofOfWorkSection } from './components/ProofOfWorkSection';
import { ProjectShowcaseModal } from './components/ProjectShowcaseModal';
import { PricingGrid } from './components/PricingGrid';
import { PayAsYouBuildSection } from './components/PayAsYouBuildSection';
import { AddOnsSection } from './components/AddOnsSection';
import { PlanComparisonModal } from './components/PlanComparisonModal';
import { InteractiveProposalModal } from './components/InteractiveProposalModal';
import { AgencyCustomizerDrawer } from './components/AgencyCustomizerDrawer';
import { LiveWebsitePreviewModal } from './components/LiveWebsitePreviewModal';
import { FaqSection } from './components/FaqSection';
import { BottomCtaSection } from './components/BottomCtaSection';
import { StickyFloatingBar } from './components/StickyFloatingBar';
import { Footer } from './components/Footer';

const STORAGE_KEY_SETTINGS = 'webcraft_ratecard_settings_v1';
const STORAGE_KEY_CURRENCY = 'webcraft_ratecard_currency_v1';
const STORAGE_KEY_THEME = 'webcraft_ratecard_theme_v1';

export default function App() {
  const [activeCurrency, setActiveCurrency] = useState<CurrencyCode>('NGN');
  const [agencySettings, setAgencySettings] = useState<AgencySettings>(DEFAULT_AGENCY_SETTINGS);
  
  // Theme state ('dark' or 'light')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch (e) {}
    return 'dark';
  });

  // Selected tier (defaults to popular Business Plus ₦75K)
  const [selectedTier, setSelectedTier] = useState<PricingTier>(PRICING_TIERS[2]);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  
  // Modals & Drawers state
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState<boolean>(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);
  const [previewTier, setPreviewTier] = useState<PricingTier | null>(null);
  const [showcaseProject, setShowcaseProject] = useState<ProofOfWorkProject | null>(null);

  // Sync theme to document.documentElement, body, and localStorage
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      body.classList.add('dark');
      body.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      body.classList.remove('dark');
      body.classList.add('light');
    }
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch (e) {}
  }, [theme]);

  // Load saved agency settings & currency on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (savedSettings) {
        setAgencySettings(JSON.parse(savedSettings));
      }
      const savedCurrency = localStorage.getItem(STORAGE_KEY_CURRENCY);
      if (savedCurrency && ['NGN', 'USD', 'GBP'].includes(savedCurrency)) {
        setActiveCurrency(savedCurrency as CurrencyCode);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  // Theme toggle handler
  const handleToggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;
      const body = document.body;
      if (nextTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        body.classList.add('dark');
        body.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        body.classList.remove('dark');
        body.classList.add('light');
      }
      try {
        localStorage.setItem(STORAGE_KEY_THEME, nextTheme);
      } catch (e) {}
      return nextTheme;
    });
  };

  // Save settings handler
  const handleSaveAgencySettings = (newSettings: AgencySettings) => {
    setAgencySettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(newSettings));
    } catch (e) {}
  };

  // Reset defaults handler
  const handleResetDefaults = () => {
    setAgencySettings(DEFAULT_AGENCY_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY_SETTINGS);
    } catch (e) {}
  };

  // Currency switch handler
  const handleCurrencyChange = (curr: CurrencyCode) => {
    setActiveCurrency(curr);
    try {
      localStorage.setItem(STORAGE_KEY_CURRENCY, curr);
    } catch (e) {}
  };

  // Toggle add-on selection
  const handleToggleAddon = (addonId: string) => {
    setSelectedAddonIds(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  // Select tier handler
  const handleSelectTier = (tier: PricingTier) => {
    setSelectedTier(tier);
    setIsProposalModalOpen(true);
  };

  // Select tier by string ID (e.g. from Hero or Pay-As-You-Build)
  const handleSelectTierById = (tierId: string) => {
    const target = PRICING_TIERS.find(t => t.id === tierId) || PRICING_TIERS[0];
    setSelectedTier(target);
    setIsProposalModalOpen(true);
  };

  // Direct WhatsApp inquiry with custom prefilled text
  const handleDirectWhatsAppTier = (tier: PricingTier) => {
    const currencyHelper = CURRENCY_RATES[activeCurrency];
    const message = `Hello ${agencySettings.agencyName}! 👋\nI am interested in your *${tier.name} Package* (${currencyHelper.format(tier.price)}) for my business website.\n\n*Scope:* ${tier.maxPages}\n*Estimated Delivery:* ${tier.deliveryDays}\n\nCan we discuss starting the project?`;
    const cleanNumber = agencySettings.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleDirectWhatsAppMessage = (msg?: string) => {
    const defaultMsg = `Hello ${agencySettings.agencyName}! 👋 I would like to make an inquiry about getting a professional website built for my business.`;
    const message = msg || defaultMsg;
    const cleanNumber = agencySettings.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleDirectEmail = () => {
    window.location.href = `mailto:${agencySettings.email}?subject=${encodeURIComponent('Inquiry: Business Website Project')}`;
  };

  // Smooth scroll helper
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-[#080b12] text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white relative transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
      
      {/* Top Navigation Bar */}
      <Navbar
        agencySettings={agencySettings}
        activeCurrency={activeCurrency}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onCurrencyChange={handleCurrencyChange}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenProposalModal={() => setIsProposalModalOpen(true)}
        onScrollToSection={handleScrollToSection}
        onDirectWhatsApp={handleDirectWhatsAppMessage}
        onDirectEmail={handleDirectEmail}
      />

      {/* Main Page Layout */}
      <main>
        {/* 1. Hero Section with Pipeline */}
        <HeroSection
          agencySettings={agencySettings}
          activeCurrency={activeCurrency}
          onSelectTier={handleSelectTierById}
          onScrollToSection={handleScrollToSection}
          onDirectWhatsApp={handleDirectWhatsAppMessage}
          onDirectEmail={handleDirectEmail}
        />

        {/* 2. Proof of Work (Tailory, Memory, Margin) */}
        <ProofOfWorkSection
          activeCurrency={activeCurrency}
          agencySettings={agencySettings}
          onOpenProjectModal={(project) => setShowcaseProject(project)}
          onSelectTierById={handleSelectTierById}
          onDirectWhatsApp={handleDirectWhatsAppMessage}
        />

        {/* 3. All 6 Pricing Packages Grid */}
        <PricingGrid
          tiers={PRICING_TIERS}
          activeCurrency={activeCurrency}
          agencySettings={agencySettings}
          selectedTierId={selectedTier.id}
          onSelectTier={handleSelectTier}
          onOpenPreview={(tier) => setPreviewTier(tier)}
          onDirectWhatsApp={handleDirectWhatsAppTier}
          onOpenComparison={() => setIsComparisonModalOpen(true)}
        />

        {/* 4. The Highlight: Pay-As-You-Build Interactive Section */}
        <PayAsYouBuildSection
          activeCurrency={activeCurrency}
          agencySettings={agencySettings}
          onSelectTierById={handleSelectTierById}
          onDirectWhatsAppMessage={handleDirectWhatsAppMessage}
        />

        {/* 5. Optional Add-ons & Hosting Services */}
        <AddOnsSection
          activeCurrency={activeCurrency}
          selectedAddonIds={selectedAddonIds}
          onToggleAddon={handleToggleAddon}
          onOpenCustomQuote={() => setIsProposalModalOpen(true)}
        />

        {/* 6. FAQs */}
        <FaqSection />

        {/* 7. Bottom Tailored CTA */}
        <BottomCtaSection
          agencySettings={agencySettings}
          onOpenProposalModal={() => setIsProposalModalOpen(true)}
          onDirectWhatsApp={handleDirectWhatsAppMessage}
        />
      </main>

      {/* Footer */}
      <Footer
        agencySettings={agencySettings}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenProposalModal={() => setIsProposalModalOpen(true)}
      />

      {/* Sticky Floating Bottom Bar for high conversions */}
      <StickyFloatingBar
        selectedTier={selectedTier}
        selectedAddonIds={selectedAddonIds}
        activeCurrency={activeCurrency}
        agencySettings={agencySettings}
        onOpenProposalModal={() => setIsProposalModalOpen(true)}
        onDirectWhatsApp={handleDirectWhatsAppTier}
      />

      {/* Modals & Drawers */}
      <ProjectShowcaseModal
        isOpen={!!showcaseProject}
        onClose={() => setShowcaseProject(null)}
        project={showcaseProject}
        activeCurrency={activeCurrency}
        onSelectProjectTier={handleSelectTierById}
        onDirectWhatsApp={handleDirectWhatsAppMessage}
      />

      <InteractiveProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        selectedTier={selectedTier}
        selectedAddonIds={selectedAddonIds}
        onToggleAddon={handleToggleAddon}
        activeCurrency={activeCurrency}
        agencySettings={agencySettings}
      />

      <PlanComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        tiers={PRICING_TIERS}
        activeCurrency={activeCurrency}
        onSelectTier={handleSelectTier}
      />

      <LiveWebsitePreviewModal
        isOpen={!!previewTier}
        onClose={() => setPreviewTier(null)}
        tier={previewTier}
        activeCurrency={activeCurrency}
        onSelectTier={handleSelectTier}
      />

      <AgencyCustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        agencySettings={agencySettings}
        onSaveSettings={handleSaveAgencySettings}
        onResetDefaults={handleResetDefaults}
        activeCurrency={activeCurrency}
      />

    </div>
  );
}
