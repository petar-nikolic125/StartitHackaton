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
    title: 'Fast Setup',
    text: 'Setup in minutes.',
  },
  {
    icon: <BanknotesIcon className="w-8 h-8 text-primary" />,
    title: 'Payments',
    text: 'Stripe & Apple Pay out-of-box.',
  },
  {
    icon: <ChartBarIcon className="w-8 h-8 text-primary" />,
    title: 'Analytics',
    text: 'Know what converts.',
  },
  {
    icon: <LinkIcon className="w-8 h-8 text-primary" />,
    title: 'gram.link',
    text: 'Shareable vanity URL.',
  },
  {
    icon: <SwatchIcon className="w-8 h-8 text-primary" />,
    title: 'Customization',
    text: 'Match your brand.',
  },
  {
    icon: <LifebuoyIcon className="w-8 h-8 text-primary" />,
    title: 'Support',
    text: '24 / 7 creator chat.',
  },
];
