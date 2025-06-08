import type { ReactElement } from 'react';
import {
  RocketLaunchIcon,
  BanknotesIcon,
  ChartBarIcon,
  LinkIcon,
  SwatchIcon,
  LifebuoyIcon,
} from '@heroicons/react/24/solid';

export interface Feature {
  icon: ReactElement;
  title: string;
  text: string;
}

export const features: Feature[] = [
  {
    icon: <RocketLaunchIcon className="w-8 h-8 text-primary" />,
    title: 'AI Quickstart',
    text: 'Launch in minutes with automated setup.',
  },
  {
    icon: <BanknotesIcon className="w-8 h-8 text-primary" />,
    title: 'Instant Payments',
    text: 'AI auto-connects Stripe & Apple Pay.',
  },
  {
    icon: <ChartBarIcon className="w-8 h-8 text-primary" />,
    title: 'AI Insights & Forecasts',
    text: 'Smart predictions on what sells.',
  },
  {
    icon: <LinkIcon className="w-8 h-8 text-primary" />,
    title: 'Smart Link',
    text: 'Smart Product Link for your AI-driven business.',
  },
  {
    icon: <SwatchIcon className="w-8 h-8 text-primary" />,
    title: 'AI Branding',
    text: 'Match your style instantly.',
  },
  {
    icon: <LifebuoyIcon className="w-8 h-8 text-primary" />,
    title: '24/7 Founder Support',
    text: 'AI + human chat around the clock.',
  },
];
