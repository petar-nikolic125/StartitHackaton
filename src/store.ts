import { configureStore } from "@reduxjs/toolkit";
import { wizardSlice } from "./features/wizard/wizardSlice";
import { wizardApi } from "./features/wizard/aiAgent";

export const store = configureStore({
  reducer: {
    wizard: wizardSlice.reducer,
    [wizardApi.reducerPath]: wizardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wizardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
