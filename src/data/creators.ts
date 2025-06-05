export interface Creator {
  name: string;
  handle: string;
  quote: string;
  avatar: string;
  badge?: string;
}

export const creators: Creator[] = [
  {
    name: 'Jordan P.',
    handle: 'jordanp',
    quote: 'Made $1.2k in 3 days.',
    avatar: '/avatars/jordan.png',
    badge: 'Top Vouch',
  },
  {
    name: 'Alex M.',
    handle: 'alexm',
    quote: 'Sold out on day one!',
    avatar: '/avatars/alex.png',
  },
  {
    name: 'Rachel K.',
    handle: 'rachelk',
    quote: 'My followers love it.',
    avatar: '/avatars/rachel.png',
  },
];
