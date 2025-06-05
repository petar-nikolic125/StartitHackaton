import { Button } from './ui/Button';
import { LiveCounter } from './LiveCounter';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 pt-24">
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Launch your course store in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">4 minutes</span>
        </h1>
        <p className="text-lg text-gray-300">Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">gram.link/yourname</span> today.</p>
        <Button
          size="lg"
          aria-label="Start your free GramCourses store now in under 4 minutes"
          onClick={() => document.getElementById('wizard')?.classList.remove('hidden')}
        >
          Start Free Store
        </Button>
        <div className="mt-4">
          <LiveCounter />
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
        <img src="/vite.svg" alt="Phone" className="w-64 h-auto animate-float" loading="lazy" />
      </div>
    </section>
  );
}
