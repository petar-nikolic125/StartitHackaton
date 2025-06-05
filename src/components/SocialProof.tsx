import { creators } from '../data/creators';
import { Card } from './ui/Card';

export default function SocialProof() {
  return (
    <section className="py-12 space-y-8" id="social">
      <div className="flex items-center justify-center space-x-6 opacity-80">
        <img src="/vite.svg" alt="logo" className="h-10" aria-hidden="true" />
        <img src="/vite.svg" alt="logo" className="h-10" aria-hidden="true" />
        <img src="/vite.svg" alt="logo" className="h-10" aria-hidden="true" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {creators.map((c) => (
          <Card key={c.handle} className="relative">
            {c.badge && (
              <span className="absolute top-2 right-4 bg-gradient-to-r from-primary via-secondary to-accent text-xs text-white font-semibold px-3 py-1 rounded-full">
                {c.badge}
              </span>
            )}
            <div className="flex items-center space-x-4">
              <img
                src={c.avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary"
                onError={(e) => ((e.currentTarget.src = '/vite.svg'))}
                loading="lazy"
              />
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-400">@{c.handle}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-300">“{c.quote}”</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
