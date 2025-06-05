export interface Creator {
  name: string;
  handle: string;
  quote: string;
  badge?: string;
}

export const creators: Creator[] = [
  {
    name: 'Jordan P.',
    handle: 'jordanp',
    quote: 'Made $1.2k in 3 days.',
    badge: 'Top Vouch',
  },
  {
    name: 'Alex M.',
    handle: 'alexm',
    quote: 'Sold out on day one!',
  },
  {
    name: 'Rachel K.',
    handle: 'rachelk',
    quote: 'My followers love it.',
  },
  {
    name: 'Lena T.',
    handle: 'lenat',
    quote: 'Tripled my revenue.',
  },
  {
    name: 'Tom B.',
    handle: 'tomb',
    quote: 'Seamless payments!',
  },
  {
    name: 'Sara Q.',
    handle: 'saraq',
    quote: 'Launch was instant.',
  },
];
