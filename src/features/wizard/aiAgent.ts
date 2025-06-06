import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Basics, PricingData, MarketingData } from "./types";

const baseUrl = import.meta.env.VITE_OPENAI_API_URL as string;

export const wizardApi = createApi({
  reducerPath: "wizardApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    generatePricing: builder.mutation<PricingData, Basics>({
      query: (basics) => ({
        url: "/pricing",
        method: "POST",
        body: basics,
      }),
    }),
    generateMarketing: builder.mutation<
      MarketingData,
      { basics: Basics; pricing: PricingData }
    >({
      query: ({ basics, pricing }) => ({
        url: "/marketing",
        method: "POST",
        body: { basics, pricing },
      }),
    }),
  }),
});

export const { useGeneratePricingMutation, useGenerateMarketingMutation } =
  wizardApi;
