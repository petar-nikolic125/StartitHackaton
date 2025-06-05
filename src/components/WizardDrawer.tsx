import { Button } from './ui/Button';

export default function WizardDrawer() {
  return (
    <div id="wizard" className="hidden fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50" onClick={() => document.getElementById('wizard')?.classList.add('hidden')} />
      <div className="w-full sm:w-96 bg-dark1 p-6 space-y-4">
        <h2 className="text-xl font-bold text-white">Start in 4 Minutes</h2>
        <p className="text-gray-300">Pick a template to begin.</p>
        <Button className="w-full" onClick={() => alert('Next step...')}>
          Continue
        </Button>
      </div>
    </div>
  );
}
