import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";

const Landing = lazy(() => import("./pages/Landing"));
const WizardLayout = lazy(() => import("./features/wizard"));
const AIDemoModal = lazy(() => import("./components/modals/AIDemoModal"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SimulationRunner = lazy(() => import('./features/simulator/SimulationRunner'));

export function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<div className="p-8">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/wizard/:stepIndex?" element={<WizardLayout />} />
            <Route path="/demo" element={<AIDemoModal />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/simulation/:simId" element={<SimulationRunner />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}
