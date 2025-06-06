import { useState } from 'react';
import { creators, Creator } from '../data/creators';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

export default function Creators() {
  const [selected, setSelected] = useState<Creator | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Success Stories</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {creators.map((c) => (
          <Card key={c.handle} className="relative w-full cursor-pointer" onClick={() => setSelected(c)}>
            {c.badge && (
              <span className="absolute top-2 right-4 bg-gradient-to-r from-primary via-secondary to-accent text-xs text-white font-semibold px-3 py-1 rounded-full">
                {c.badge}
              </span>
            )}
            <div className="w-20 h-20 rounded-full mx-auto ring-2 ring-primary bg-gradient-to-br from-primary via-secondary to-accent grid place-items-center text-white font-bold text-2xl">
              {c.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <h3 className="text-lg font-semibold text-center mt-3">{c.name}</h3>
            <p className="text-sm text-gray-400 text-center">@{c.handle}</p>
            <p className="mt-2 text-gray-300 text-center">“{c.quote}”</p>
          </Card>
        ))}
      </div>
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-4 text-center">
            <div className="w-24 h-24 mx-auto rounded-full ring-2 ring-primary bg-gradient-to-br from-primary via-secondary to-accent grid place-items-center text-white font-bold text-3xl">
              {selected.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <h3 className="text-xl font-semibold text-white">{selected.name}</h3>
            <p className="text-gray-400">@{selected.handle}</p>
            <p className="text-gray-300">{selected.quote}</p>
            <Button className="w-full" onClick={() => alert('view store')}>View store →</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
