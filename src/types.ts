export type CurrencyCode = 'NGN' | 'USD' | 'GBP';

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  isRecommended?: boolean;
  price: number; // in NGN
  originalPrice?: number;
  periodLabel?: string;
  subtitle: string;
  maxPages: string;
  deliveryDays: string;
  revisions: string;
  description: string;
  category: 'starter' | 'growth' | 'pro' | 'enterprise';
  features: string[];
  highlightFeatures: string[];
  techStack: string[];
  deliverables: string[];
  idealFor: string;
  gradient: string;
  accentColor: string;
  glowColor: string;
}

export interface AddOnService {
  id: string;
  name: string;
  description: string;
  priceNGN: number;
  category: 'domain' | 'ecommerce' | 'branding' | 'maintenance' | 'marketing';
  iconName: string;
  popular?: boolean;
}

export interface PayStage {
  id: string;
  step: number;
  name: string;
  action: 'START' | 'EXPAND' | 'GROW' | 'PROFESSIONAL' | 'SCALE' | 'PREMIUM';
  priceNGN: number;
  upgradeCostNGN: number; // cost from previous stage
  pageCount: string;
  turnaround: string;
  headline: string;
  summary: string;
  keyUnlocks: string[];
  visualTag: string;
}

export interface AgencySettings {
  agencyName: string;
  tagline: string;
  whatsappNumber: string;
  email: string;
  defaultCurrency: CurrencyCode;
  customDiscountPercent: number;
  consultationLink?: string;
  portfolioUrl?: string;
}

export interface ClientQuote {
  clientName: string;
  businessName: string;
  email: string;
  phone: string;
  selectedTierId: string;
  selectedAddonIds: string[];
  selectedPaymentPlan: '50_50' | 'milestones_3' | 'upfront_discount';
  projectTimeline: 'standard' | 'rush_express' | 'flexible';
  notes: string;
}
