import { creators } from '../data/creators';
import { Card } from '../components/ui/Card';

export default function Creators() {
  return (
    <div className="max-w-5xl mx-auto px-6" id="creators">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Success Stories</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {creators.map((c) => (
          <Card key={c.handle} className="relative w-full">
            {c.badge && (
              <span className="absolute top-2 right-4 bg-gradient-to-r from-primary via-secondary to-accent text-xs text-white font-semibold px-3 py-1 rounded-full">
                {c.badge}
              </span>
            )}
            <img
              src={c.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-primary mx-auto"
              loading="lazy"
              onError={(e) => ((e.currentTarget.src = '/vite.svg'))}
            />
            <h3 className="text-lg font-semibold text-center mt-3">{c.name}</h3>
            <p className="text-sm text-gray-400 text-center">@{c.handle}</p>
            <p className="mt-2 text-gray-300 text-center">“{c.quote}”</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
