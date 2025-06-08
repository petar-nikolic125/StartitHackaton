export interface Tier {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

export const tiers: Tier[] = [
  {
    name: 'Basic',
    price: '$9/mo',
    features: ['Unlimited AI launches', 'Smart Product Link'],
  },
  {
    name: 'Pro',
    price: '$39/mo',
    features: ['AI Insights & Forecasts', 'AI email capture', 'Priority support'],
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$79/mo',
    features: ['Everything Pro', 'Dedicated AI strategist', 'API access'],
  },
];
