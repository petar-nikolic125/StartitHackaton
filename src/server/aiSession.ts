import { v4 as uuidv4 } from "uuid";
import { ChatCompletionRequestMessage } from "openai";
import type { Basics } from "../features/wizard/types.js";

export class AISession {
  id: string;
  messages: ChatCompletionRequestMessage[];
  createdAt: number;

  constructor(basics: Basics) {
    this.id = uuidv4();
    this.createdAt = Date.now();
    this.messages = [
      {
        role: "system",
        content:
          "You are a seasoned business advisor helping creators monetize micro-courses.",
      },
      {
        role: "user",
        content: `Start simulation with: ${JSON.stringify(basics)}`,
      },
    ];
  }

  addUser(content: string) {
    this.messages.push({ role: "user", content });
  }

  addAssistant(content: string) {
    this.messages.push({ role: "assistant", content });
  }
}
