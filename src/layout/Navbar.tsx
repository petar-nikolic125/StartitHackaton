import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { FiMenu, FiX } from 'react-icons/fi';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  function handleNavClick(id: string) {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-dark1 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <Link to="/" className="text-2xl font-bold text-white">GramCourses</Link>
        <nav className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            onClick={() => handleNavClick('hero')}
            className="nav-link"
            aria-label="Home"
          >
            Home
          </NavLink>
          <NavLink
            to="/features"
            className="nav-link"
            aria-label="Features"
          >
            Features
          </NavLink>
          <NavLink
            to="/pricing"
            className="nav-link"
            aria-label="Pricing"
          >
            Pricing
          </NavLink>
          <NavLink
            to="/creators"
            className="nav-link"
            aria-label="Creators"
          >
            Creators
          </NavLink>
        </nav>
        <Button
          size="sm"
          className="hidden md:block"
          onClick={() => document.getElementById('wizard')?.classList.remove('hidden')}
        >
          ⚡ Launch in 4 min
        </Button>
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-dark2 px-6 pb-4 space-y-3">
          <NavLink
            to="/"
            onClick={() => handleNavClick('hero')}
            className="block nav-link"
            aria-label="Home"
          >
            Home
          </NavLink>
          <NavLink
            to="/features"
            className="block nav-link"
            aria-label="Features"
          >
            Features
          </NavLink>
          <NavLink
            to="/pricing"
            className="block nav-link"
            aria-label="Pricing"
          >
            Pricing
          </NavLink>
          <NavLink
            to="/creators"
            className="block nav-link"
            aria-label="Creators"
          >
            Creators
          </NavLink>
          <Button
            size="sm"
            className="w-full"
            onClick={() => {
              document.getElementById('wizard')?.classList.remove('hidden');
              setOpen(false);
            }}
          >
            ⚡ Launch in 4 min
          </Button>
        </div>
      )}
    </header>
  );
}
