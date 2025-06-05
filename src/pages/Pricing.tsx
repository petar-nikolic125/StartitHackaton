import { tiers } from '../data/tiers';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Pricing() {
  return (
    <div className="max-w-5xl mx-auto px-6" id="pricing">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Pricing & Plans</h2>
      <Button className="mx-auto mb-6 block" size="lg" onClick={() => document.getElementById('wizard')?.classList.remove('hidden')}>
        Pick Pro Now
      </Button>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <Card key={t.name} className="relative space-y-4">
            {t.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary via-secondary to-accent text-xs text-white font-semibold px-4 py-1 rounded-full shadow-lg">
                Most Popular
              </span>
            )}
            <h3 className="text-2xl font-bold text-white text-center">{t.name}</h3>
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent text-center">
              {t.price}
            </p>
            <ul className="text-gray-300 space-y-1 list-disc list-inside text-sm">
              {t.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Button className="w-full" onClick={() => document.getElementById('wizard')?.classList.remove('hidden')}>
              Choose Plan
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
