import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { ProgressBar } from './components/ui/ProgressBar';

const Home = lazy(() => import('./pages/Home'));
const Features = lazy(() => import('./pages/Features'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Creators = lazy(() => import('./pages/Creators'));

export function App() {
  return (
    <>
      <ProgressBar />
      <Layout>
        <Suspense fallback={<div className="p-8">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/creators" element={<Creators />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}
