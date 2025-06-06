export interface Basics {
  niche: string;
  productType: string;
  targetPriceRange: string;
}

export interface PricingData {
  tiers: Array<{ label: string; price: number }>;
}

export interface MarketingData {
  captions: string[];
  hashtags: string[];
}
