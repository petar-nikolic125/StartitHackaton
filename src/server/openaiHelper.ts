import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_KEY! }),
);

export async function chat(messages: ChatCompletionRequestMessage[]) {
  const res = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    temperature: 0.7,
    messages,
  });
  return res.data.choices[0].message?.content ?? "";
}
