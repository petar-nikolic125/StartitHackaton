import { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { LiveCounter } from './LiveCounter';

export default function Hero() {
  const [ticker, setTicker] = useState('@coachmike just earned $3,482');
  useEffect(() => {
    const data = [
      '@coachmike just earned $3,482',
      '@creatorsara just earned $1,208',
      '@buildtim just earned $542',
    ];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % data.length;
      setTicker(data[i]);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 pt-24">
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Launch your course store in{' '}
          <span className="pulsing-underline text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">4 minutes</span>
          — no code.
        </h1>
        <p className="text-lg text-gray-300">Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">gram.link/yourname</span> today.</p>
        <div className="flex items-center space-x-4 justify-center md:justify-start">
          <Button
            size="lg"
            aria-label="Start your free GramCourses store now in under 4 minutes"
            onClick={() => document.getElementById('wizard')?.classList.remove('hidden')}
          >
            Start Free Store
          </Button>
          <button className="text-primary underline" onClick={() => alert('demo modal')}>60-sec demo →</button>
        </div>
        <div className="mt-4 space-y-1">
          <LiveCounter />
          <p className="text-sm text-gray-400">{ticker}</p>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
        <div className="w-64 h-96 max-h-96 rounded-3xl overflow-hidden shadow-inner bg-dark1 relative">
          <div className="absolute inset-0 hero-gradient" />
        </div>
      </div>
    </section>
  );
}
