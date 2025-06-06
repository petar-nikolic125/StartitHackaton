import WizardDrawer from "../components/WizardDrawer";
import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { ScrollProvider } from '../components/scroll/ScrollProvider';
import { useScrollSnap } from '../components/scroll/useScrollSnap';

function SnapInit() {
  useScrollSnap();
  return null;
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <ScrollProvider>
      <SnapInit />
      <div className="min-h-screen flex flex-col overflow-y-auto snap-container">
        <Navbar />
        <WizardDrawer />
        <main className="flex-1 pt-20 pb-8">{children}</main>
      </div>
    </ScrollProvider>
  );
}
