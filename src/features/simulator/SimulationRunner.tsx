import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

export function SimulationRunner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { simId, weekPlan, forecast, advice, status } = useSelector(
    (s: RootState) => s.simulation,
  );
  const [nextStep] = useNextSimStepMutation();
  const [endSim] = useEndSimMutation();
  const [polling, setPolling] = useState(status === 'running');
  const online = useNetworkStatus();

  // Rehydrate session from localStorage if missing
  useEffect(() => {
    if (!simId) {
      const stored = localStorage.getItem('currentSim');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          dispatch(setSession(data));
          return;
        } catch {
          /* ignore */
        }
      }
    }
    if (!simId && params.simId) {
      // If we can't restore, send back to wizard
      navigate('/wizard/0');
    }
  }, [simId, dispatch, params.simId, navigate]);

  // Initial fetch on mount
  useEffect(() => {
    if (!simId) return;
    (async () => {
      try {
        const res = await nextStep({
          simId,
          metrics: { sales: 0, traffic: 0, cvr: 0 },
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
          metrics: { sales: 0, traffic: 0, cvr: 0 },
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
    try {
      const res = await nextStep({
        simId,
        metrics: { sales: 0, traffic: 0, cvr: 0 },
      }).unwrap();
      dispatch(
        addAdvice({ weekPlan: res.updatedPlan, forecast: res.forecast, advice: res.advice }),
      );
    } catch {
      /* noop */
    }
  };

  const stop = async () => {
    if (!simId) return;
    try {
      await endSim({ simId }).unwrap();
    } catch {
      /* ignore */
    }
    dispatch(clearSession());
    localStorage.removeItem('currentSim');
    navigate('/wizard/0');
  };

  if (!simId) {
    return <div className="p-8">No active simulation</div>;
  }

  return (
    <div className="p-4 space-y-4" aria-live="polite">
      {!online && (
        <div className="text-red-500">Offline — reconnect to continue.</div>
      )}
      {weekPlan && (
        <ul className="list-disc pl-5" aria-label="Weekly Plan">
          {weekPlan.tasks.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}
      {forecast && (
        <LineChart width={320} height={200} data={forecast.months} className="mx-auto">
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      )}
      {advice.map((a, i) => (
        <p key={i} className="bg-dark2 p-2 rounded" aria-label={`Advice ${i + 1}`}>{a}</p>
      ))}
      <div className="space-x-2">
        <Button aria-label="Pause Simulation" onClick={pause} disabled={!online}>
          {polling ? 'Pause' : 'Resume'}
        </Button>
        <Button aria-label="Next Week" onClick={nextWeek} disabled={!online || !polling}>
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
