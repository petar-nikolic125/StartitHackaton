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
    quote: 'AI boosted my launch to $1.2k in 3 days.',
    badge: 'Top Vouch',
  },
  {
    name: 'Alex M.',
    handle: 'alexm',
    quote: 'AI marketing sold out day one!',
  },
  {
    name: 'Rachel K.',
    handle: 'rachelk',
    quote: 'My followers love the AI tips.',
  },
  {
    name: 'Lena T.',
    handle: 'lenat',
    quote: 'AI tripled my revenue.',
  },
  {
    name: 'Tom B.',
    handle: 'tomb',
    quote: 'AI handled payments seamlessly.',
  },
  {
    name: 'Sara Q.',
    handle: 'saraq',
    quote: 'AI made launch instant.',
  },
];
