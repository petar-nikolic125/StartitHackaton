import { FC } from "react";
import { Link } from "react-router-dom";

export const Navbar: FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-[#1A0021] py-4 px-4 md:px-16 flex justify-between items-center">
      <Link to="/" className="hero-nav__logo">GramCourses</Link>
      <nav className="hidden md:block">
        <ul className="flex space-x-6">
          <li>
            <Link to="/features" className="text-white/70 hover:text-white px-4 py-2">
              Features
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="text-white/70 hover:text-white px-4 py-2">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/creators" className="text-white/70 hover:text-white px-4 py-2">
              Creators
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
