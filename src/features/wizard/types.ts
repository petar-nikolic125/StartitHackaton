// src/features/wizard/types.ts

/**
 * Collected business basics for the wizard flow.
 */
export interface Basics {
  /** Official business or product name */
  businessName: string;
  /** Short tagline or slogan */
  tagline: string;
  /** Public website URL */
  website: string;
  /** Core niche or industry */
  niche: string;
  /** Type of offering (e.g. Video, PDF, Software) */
  productType: string;
  /** Business model (e.g. B2B, B2C, Freemium) */
  businessModel: string;
  /** Price bracket you’re targeting */
  targetPriceRange: string;
  /** Planned launch date (ISO format) */
  launchDate: string;
  /** Current audience size category */
  audienceSize: string;
  /** Primary region or market */
  region: string;
  /** Key competitors names/tags */
  competitors: string[];
  /** Team headcount range */
  teamSize: string;
  /** Detailed business idea description */
  idea: string;
}

/**
 * Pricing payload returned from the AI step.
 */
export interface PricingData {
  /** The plan tier the user selected */
  selectedTier: string;
  /** Whether yearly billing was chosen */
  yearly: boolean;
}

/**
 * Marketing payload (captions, hashtags, best posting times, etc.)
 */
export interface MarketingData {
  captions: string[];
  hashtags: string[];
  bestTimes?: Array<{ time: string; count: number }>;
}
