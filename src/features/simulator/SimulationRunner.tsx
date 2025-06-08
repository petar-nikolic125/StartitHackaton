import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useNextSimStepMutation,
  useEndSimMutation,
} from './simApi';
import {
  addAdvice,
  clearSession,
  setSession,
  setStatus,
} from './simSlice';
import { Button } from '../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import type { RootState } from '../../store';
import type { WeekPlan, Metrics } from '../../types/business';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

function computeMetrics(plan: WeekPlan | null): Metrics {
  return { sales: plan?.tasks.length ?? 0, traffic: 0, cvr: 0 };
}

export interface SimulationRunnerProps {
  simId: string;
}

export function SimulationRunner({ simId }: SimulationRunnerProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { weekPlan, forecast, adviceHistory, status, currentWeek } = useSelector(
    (s: RootState) => s.simulation,
  );
  const [nextStep] = useNextSimStepMutation();
  const [endSim] = useEndSimMutation();
  const [polling, setPolling] = useState(status === 'running');
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const online = useNetworkStatus();

  // Rehydrate session from localStorage if missing
  useEffect(() => {
    if (!weekPlan) {
      const stored = localStorage.getItem('currentSim');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          dispatch(setSession(data));
        } catch {
          /* ignore */
        }
      }
    }
  }, [weekPlan, dispatch]);

  // Initial fetch on mount
  useEffect(() => {
    if (!simId) return;
    (async () => {
      try {
        const res = await nextStep({
          simId,
          metrics: computeMetrics(weekPlan),
        }).unwrap();
        dispatch(
          addAdvice({
            weekPlan: res.updatedPlan,
            forecast: res.forecast,
            advice: res.advice,
          }),
        );
      } catch {
        /* noop */
      }
    })();
  }, [simId, nextStep, dispatch]);

  useEffect(() => {
    if (!simId || !polling) return;
    const id = setInterval(async () => {
      try {
        const res = await nextStep({
          simId,
          metrics: computeMetrics(weekPlan),
        }).unwrap();
        dispatch(
          addAdvice({
            weekPlan: res.updatedPlan,
            forecast: res.forecast,
            advice: res.advice,
          }),
        );
      } catch {
        setPolling(false);
      }
    }, 5000);
    return () => clearInterval(id);
  }, [simId, polling, nextStep, dispatch]);

  const pause = () => {
    dispatch(setStatus(status === 'running' ? 'paused' : 'running'));
    setPolling((p) => !p);
  };

  const nextWeek = async () => {
    if (!simId) return;
    setIsAdvancing(true);
    setError('');
    try {
      const res = await nextStep({
        simId,
        metrics: computeMetrics(weekPlan),
      }).unwrap();
      dispatch(
        addAdvice({ weekPlan: res.updatedPlan, forecast: res.forecast, advice: res.advice }),
      );
    } catch {
      setError('Failed to advance simulation');
    } finally {
      setIsAdvancing(false);
    }
  };

  const stop = async () => {
    if (!simId) return;
    try {
      const res = await endSim({ simId }).unwrap();
      setSummary(res.summary);
    } catch {
      /* ignore */
    }
    dispatch(clearSession());
    localStorage.removeItem('currentSim');
    navigate('/dashboard');
  };

  if (!simId) {
    return <div className="p-8">No active simulation</div>;
  }

  if (summary) {
    return (
      <div className="p-4 space-y-4 text-center">
        <h2 className="text-xl font-bold">Simulation Complete</h2>
        <p>{summary}</p>
        <Button onClick={() => navigate('/dashboard')} variant="solid">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4" aria-live="polite">
      {!online && (
        <div className="text-red-500">Offline — reconnect to continue.</div>
      )}
      {weekPlan && (
        <table className="w-full text-left text-sm" aria-label="Week Plan">
          <thead>
            <tr>
              <th>Week {currentWeek}</th>
            </tr>
          </thead>
          <tbody>
            {weekPlan.tasks.map((t, i) => (
              <tr key={i}>
                <td>{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {forecast && (
        <LineChart width={320} height={200} data={forecast.months} className="mx-auto">
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {adviceHistory.map((a, i) => (
        <p key={i} className="bg-dark2 p-2 rounded" aria-label={`Advice ${i + 1}`}>{a}</p>
      ))}
      <div className="space-x-2">
        <Button aria-label="Pause Simulation" onClick={pause} disabled={!online}>
          {polling ? 'Pause' : 'Resume'}
        </Button>
        <Button aria-label="Next Week" onClick={nextWeek} disabled={!online || !polling || isAdvancing}>
          Next Week
        </Button>
        <Button aria-label="Stop Simulation" onClick={stop} variant="solid">
          Stop Simulation
        </Button>
      </div>
    </div>
  );
}
export default SimulationRunner;
