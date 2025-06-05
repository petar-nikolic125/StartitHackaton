import WizardDrawer from "../components/WizardDrawer";
import { ReactNode } from 'react';
import { Navbar } from './Navbar';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <WizardDrawer />
      <main className="flex-1 pt-20 pb-8">{children}</main>
    </div>
  );
}
