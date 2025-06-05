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
    features: ['Unlimited courses', 'gram.link/you'],
  },
  {
    name: 'Pro',
    price: '$29/mo',
    features: ['Everything in Basic', 'Analytics', 'Priority support'],
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$59/mo',
    features: ['All Pro features', 'Dedicated manager'],
  },
];
