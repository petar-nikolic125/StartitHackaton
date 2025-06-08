import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useNextSimStepMutation } from './simApi';
import { addAdvice, clearSession, setStatus } from './simSlice';
import { Button } from '../../components/ui/Button';
import type { RootState } from '../../store';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

export function AIWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { simId, weekPlan, forecast, advice, status } = useSelector(
    (s: RootState) => s.simulation,
  );
  const [nextStep] = useNextSimStepMutation();
  const [polling, setPolling] = useState(status === 'running');
  const online = useNetworkStatus();

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

  const skip = async () => {
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

  const restart = () => {
    dispatch(clearSession());
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
        <Button aria-label="Skip Week" onClick={skip} disabled={!online || !polling}>
          Skip Week
        </Button>
        <Button aria-label="Restart Simulation" onClick={restart} variant="solid">
          Restart Simulation
        </Button>
      </div>
    </div>
  );
}
