import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { WeekPlan, Forecast } from '../../types/business';

interface SimState {
  simId: string | null;
  weekPlan: WeekPlan | null;
  forecast: Forecast | null;
  advice: string[];
  status: 'idle' | 'running' | 'paused';
}

const initialState: SimState = {
  simId: null,
  weekPlan: null,
  forecast: null,
  advice: [],
  status: 'idle',
};

export const simSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<{ simId: string; weekPlan: WeekPlan; forecast: Forecast }>) {
      state.simId = action.payload.simId;
      state.weekPlan = action.payload.weekPlan;
      state.forecast = action.payload.forecast;
      state.status = 'running';
    },
    addAdvice(state, action: PayloadAction<{ weekPlan: WeekPlan; forecast: Forecast; advice: string }>) {
      state.weekPlan = action.payload.weekPlan;
      state.forecast = action.payload.forecast;
      state.advice.push(action.payload.advice);
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
export default simSlice.reducer;
