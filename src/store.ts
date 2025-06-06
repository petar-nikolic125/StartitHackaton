// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import wizardReducer       from './features/wizard/wizardSlice'; // ← imports the default export
import { wizardApi }       from './features/wizard/aiAgent';

export const store = configureStore({
  reducer: {
    // The key “wizard” will hold all state managed by wizardReducer
    wizard: wizardReducer,
    // The RTK Query slice for AI endpoints
    [wizardApi.reducerPath]: wizardApi.reducer,
  },
  // TS will correctly infer the type of getDefaultMiddleware, so no ": any" needed
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(wizardApi.middleware),
});

// Export RootState & AppDispatch for use in hooks/selectors/etc.
export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
