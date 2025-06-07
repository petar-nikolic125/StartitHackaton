import { Router } from "express";
import { AISession } from "../aiSession";
import { chat } from "../openaiHelper";

const sessions = new Map<string, AISession>();

const router = Router();

router.post("/simulation/start", async (req, res) => {
  const { basics } = req.body;
  const session = new AISession(basics);
  const aiResponse = await chat(session.messages);
  session.addAssistant(aiResponse);
  sessions.set(session.id, session);
  try {
    res.json({ simId: session.id, ...JSON.parse(aiResponse) });
  } catch {
    res.json({ simId: session.id, text: aiResponse });
  }
});

router.post("/simulation/next-step", async (req, res) => {
  const { simId, metrics } = req.body;
  const session = sessions.get(simId);
  if (!session) return res.status(404).json({ error: "invalid simId" });
  session.addUser(`Metrics update: ${JSON.stringify(metrics)}`);
  const aiResponse = await chat(session.messages);
  session.addAssistant(aiResponse);
  try {
    res.json(JSON.parse(aiResponse));
  } catch {
    res.json({ text: aiResponse });
  }
});

router.post("/simulation/end", async (req, res) => {
  const { simId } = req.body;
  const session = sessions.get(simId);
  if (!session) return res.status(404).json({ error: "invalid simId" });
  session.addUser("End simulation and summarize results");
  const aiResponse = await chat(session.messages);
  sessions.delete(simId);
  try {
    res.json(JSON.parse(aiResponse));
  } catch {
    res.json({ text: aiResponse });
  }
});

export default router;
