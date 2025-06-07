// src/features/wizard/ReviewPublishStep.tsx
import {
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LoadingDots } from '../../components/LoadingDots';
import { Toast } from '../../components/ui/Toast';
import { Button } from '../../components/ui/Button';
import { useStartSimMutation } from '../simulator/simApi';
import { setSession } from '../simulator/simSlice';
import type { RootState } from '../../store';
import type { Basics, PricingData, MarketingData } from './types';

export interface ReviewHandles {
  /** Always valid at this late stage */
  isValid: () => boolean;

  /** Pull all collected data back to the caller */
  getData: () => {
    basics: Basics | null;
    pricing: PricingData | null;
    marketing: MarketingData | null;
  };

  /** Fire the simulation API */
  launch: () => Promise<void>;

  /** Expose the current “launch in progress” state */
  isLaunching: () => boolean;
}

export const ReviewPublishStep = forwardRef<ReviewHandles>((_, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((s: RootState) => s.wizard);
  const [startSim] = useStartSimMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const launch = async () => {
    if (!data.basics) return;
    try {
      setError('');
      setLoading(true);

      const res = await startSim({ basics: data.basics }).unwrap();
      dispatch(setSession({
        simId:    res.simId,
        weekPlan: res.weekPlan,
        forecast: res.forecast,
      }));

      // persist for refresh
      localStorage.setItem(
        'currentSim',
        JSON.stringify({
          simId:     res.simId,
          weekPlan:  res.weekPlan,
          forecast:  res.forecast,
        }),
      );

      navigate(`/simulation/${res.simId}`);
    } catch {
      setError('Failed to start simulation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    isValid: () => true,
    getData: () => data,
    launch,
    isLaunching: () => loading,
  }));

  return (
    <motion.div
      className="space-y-4"
      variants={{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }}
      initial="initial"
      animate="animate"
    >
      {/* Summary of everything collected */}
      <pre className="bg-dark2 p-4 rounded-md text-sm whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>

      {/* Full‐screen launch loader */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center space-y-4 z-50 text-white">
          <LoadingDots />
          <p>Launching your AI Simulation…</p>
        </div>
      )}

      {/* Full‐screen error overlay */}
      {error && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center space-y-4 z-50 text-white">
          <Toast message={error} onClose={() => setError('')} />
          <Button onClick={launch}>Retry</Button>
        </div>
      )}
    </motion.div>
  );
});

ReviewPublishStep.displayName = "ReviewPublishStep";
