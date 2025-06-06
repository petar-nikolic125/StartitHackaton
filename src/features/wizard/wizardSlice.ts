import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Basics, PricingData, MarketingData } from "./types";

export interface WizardState {
  basics: Basics | null;
  pricing: PricingData | null;
  marketing: MarketingData | null;
  status: "idle" | "loading" | "published";
}

const initialState: WizardState = {
  basics: null,
  pricing: null,
  marketing: null,
  status: "idle",
};

export const wizardSlice = createSlice({
  name: "wizard",
  initialState,
  reducers: {
    setBasics(state, action: PayloadAction<Basics>) {
      state.basics = action.payload;
    },
    setPricing(state, action: PayloadAction<PricingData>) {
      state.pricing = action.payload;
    },
    setMarketing(state, action: PayloadAction<MarketingData>) {
      state.marketing = action.payload;
    },
    setStatus(state, action: PayloadAction<WizardState["status"]>) {
      state.status = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const { setBasics, setPricing, setMarketing, setStatus, reset } =
  wizardSlice.actions;
