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
    features: ['Unlimited courses', 'Vanity URL'],
  },
  {
    name: 'Pro',
    price: '$39/mo',
    features: ['Analytics', 'Email capture', 'Priority support'],
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$79/mo',
    features: ['Everything Pro', 'Dedicated manager', 'API'],
  },
];
