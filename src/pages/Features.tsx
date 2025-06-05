import { features } from '../data/features';
import { Card } from '../components/ui/Card';

export default function Features() {
  return (
    <div className="max-w-7xl mx-auto px-6" id="features">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Speed → Revenue</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((f) => (
          <Card key={f.title} className="text-center space-y-3">
            <div className="text-4xl" aria-hidden="true">
              {f.icon}
            </div>
            <h3 className="font-semibold text-xl text-white">{f.title}</h3>
            <p className="text-gray-300 text-sm">{f.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
