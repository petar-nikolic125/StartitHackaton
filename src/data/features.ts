export interface Feature {
  icon: string;
  title: string;
  text: string;
}

export const features: Feature[] = [
  { icon: '⚡', title: 'Fast Setup', text: 'Start selling in minutes.' },
  { icon: '💳', title: 'Payments', text: 'Stripe-powered payouts.' },
  { icon: '📈', title: 'Analytics', text: 'Track sales live.' },
  { icon: '🔗', title: 'gram.link', text: 'Your shareable link.' },
  { icon: '🎨', title: 'Customization', text: 'Craft your style.' },
  { icon: '🤝', title: 'Support', text: 'We are here 24/7.' },
];
