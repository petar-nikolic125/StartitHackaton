import type { Basics } from "../types/business";

export interface PromptPayload {
  basics: Basics;
  pricing: unknown;
  prompt: string;
}

export function buildPrompt(data: PromptPayload): string {
  const { basics, pricing, prompt } = data;
  return [
    `Basics: ${JSON.stringify(basics)}`,
    `Pricing: ${JSON.stringify(pricing)}`,
    `Prompt: ${prompt}`,
  ].join("\n");
}
