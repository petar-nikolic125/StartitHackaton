import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { SmoothLink } from '../components/scroll/SmoothLink';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-dark1/80 backdrop-blur-sm z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">
        <Link to="/" className="text-2xl font-bold text-white">AI Business Coach</Link>
        <nav className="hidden md:flex flex-1 justify-center space-x-6">
          <SmoothLink href="#home" className="nav-link" aria-label="Home">
            Home
          </SmoothLink>
          <SmoothLink href="#features" className="nav-link" aria-label="Features">
            Features
          </SmoothLink>
          <SmoothLink href="#pricing" className="nav-link" aria-label="Pricing">
            Pricing
          </SmoothLink>
          <SmoothLink href="#creators" className="nav-link" aria-label="Founders">
            Founders
          </SmoothLink>
        </nav>
        <Button
          size="sm"
          className="hidden md:block"
          onClick={() => document.getElementById('wizard')?.classList.remove('hidden')}
        >
          Launch with AI
        </Button>
        <button
          className="md:hidden p-2 text-white focus:outline-none focus:ring-4 focus:ring-primary/50"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          role="button"
        >
          {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-dark2 px-6 pb-4 space-y-3">
          <SmoothLink href="#home" className="block nav-link" aria-label="Home" onClick={() => setOpen(false)}>
            Home
          </SmoothLink>
          <SmoothLink href="#features" className="block nav-link" aria-label="Features" onClick={() => setOpen(false)}>
            Features
          </SmoothLink>
          <SmoothLink href="#pricing" className="block nav-link" aria-label="Pricing" onClick={() => setOpen(false)}>
            Pricing
          </SmoothLink>
          <SmoothLink href="#creators" className="block nav-link" aria-label="Founders" onClick={() => setOpen(false)}>
            Founders
          </SmoothLink>
          <Button
            size="sm"
            className="w-full"
            onClick={() => {
              document.getElementById('wizard')?.classList.remove('hidden');
              setOpen(false);
            }}
          >
            Launch with AI
          </Button>
        </div>
      )}
    </header>
  );
}
