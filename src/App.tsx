import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { ProgressBar } from './components/ui/ProgressBar';

const Landing = lazy(() => import('./pages/Landing'));

export function App() {
    return (
        <>
            <ProgressBar />
            <Layout>
                <Suspense fallback={<div className="p-8">Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                    </Routes>
                </Suspense>
            </Layout>
        </>
    );
}
