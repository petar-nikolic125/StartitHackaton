// File: src/data/features.ts

export interface Feature {
  /**
   * A succinct, benefit-oriented headline for this feature
   * (e.g., “Launch in 4 Minutes”).
   */
  title: string;

  /**
   * A very short, action-oriented description (≤ 10 words)
   * that drives home the benefit of this feature.
   */
  text: string;
}

/**
 * A curated list of six core features. Each object holds
 * the title and ultra-concise description. Icons (and
 * animations, gradients, etc.) should be applied at the
 * component level (e.g., in <FeatureCard />).
 */
export const features: Feature[] = [
  {
    title: 'Launch in 4 Minutes',
    text: 'Go live instantly—no technical setup required.',
  },
  {
    title: 'Built-In Payments',
    text: 'Stripe, Apple Pay, Google Pay—zero integration.',
  },
  {
    title: 'Live Sales Analytics',
    text: 'Track conversion rates and revenue in real time.',
  },
  {
    title: 'Custom gram.link',
    text: 'Claim your vanity URL: gram.link/username.',
  },
  {
    title: 'Brand Customization',
    text: 'Fonts, colors, layouts—match your unique style.',
  },
  {
    title: '24/7 Creator Support',
    text: 'Live chat and email—always here to help.',
  },
];
