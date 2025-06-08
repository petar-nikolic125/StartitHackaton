import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { WeekPlan, Forecast } from '../../types/business';

interface SimState {
  simId: string | null;
  currentWeek: number;
  weekPlan: WeekPlan | null;
  forecast: Forecast | null;
  adviceHistory: string[];
  status: 'idle' | 'running' | 'paused';
}

const initialState: SimState = {
  simId: null,
  currentWeek: 0,
  weekPlan: null,
  forecast: null,
  adviceHistory: [],
  status: 'idle',
};

export const simSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    setSession(
      state,
      action: PayloadAction<{ simId: string; weekPlan: WeekPlan; forecast: Forecast }>,
    ) {
      state.simId = action.payload.simId;
      state.currentWeek = 1;
      state.weekPlan = action.payload.weekPlan;
      state.forecast = action.payload.forecast;
      state.status = 'running';
    },
    addAdvice(
      state,
      action: PayloadAction<{ weekPlan: WeekPlan; forecast: Forecast; advice: string }>,
    ) {
      state.currentWeek += 1;
      state.weekPlan = action.payload.weekPlan;
      state.forecast = action.payload.forecast;
      state.adviceHistory.push(action.payload.advice);
    },
    setStatus(state, action: PayloadAction<SimState['status']>) {
      state.status = action.payload;
    },
    clearSession() {
      return initialState;
    },
  },
});

export const { setSession, addAdvice, setStatus, clearSession } = simSlice.actions;

// Selectors
export const selectCurrentSession = (state: { simulation: SimState }) => state.simulation;
export const selectSimulationWeek = (state: { simulation: SimState }) => state.simulation.currentWeek;

export default simSlice.reducer;
