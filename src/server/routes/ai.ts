import { Router } from "express";
import { AISession } from "../aiSession";
import { chat } from "../openaiHelper";
import type { Basics, PricingTier } from "../../types/business";

interface PricingData {
  tiers: PricingTier[];
}

interface MarketingData {
  captions: string[];
  hashtags: string[];
  bestTimes?: Array<{ time: string; count: number }>;
}

const sessions = new Map<string, AISession>();

const router = Router();

// Generate AI pricing tiers
router.post('/pricing', async (req, res) => {
  try {
    const basics: Basics = req.body;
    const content = await chat([
      {
        role: 'system',
        content:
          'Generate product pricing tiers as JSON {"tiers":[{"label":"Basic","price":10}]}',
      },
      { role: 'user', content: JSON.stringify(basics) },
    ]);
    const parsed = JSON.parse(content) as PricingData;
    res.json(parsed);
  } catch (err) {
    const e = err as Error & { message?: string };
    res.status(502).json({ error: 'AI_ERROR', message: String(e.message || e) });
  }
});

// Generate AI marketing plan
router.post('/marketing', async (req, res) => {
  try {
    const { basics, pricing } = req.body as {
      basics: Basics;
      pricing: PricingData;
    };
    const content = await chat([
      {
        role: 'system',
        content:
          'Generate marketing captions, hashtags and best posting times as JSON',
      },
      { role: 'user', content: JSON.stringify({ basics, pricing }) },
    ]);
    const parsed = JSON.parse(content) as MarketingData;
    res.json(parsed);
  } catch (err) {
    const e = err as Error & { message?: string };
    res.status(502).json({ error: 'AI_ERROR', message: String(e.message || e) });
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.post("/simulation/start", async (req: any, res: any) => {
  try {
    const { basics } = req.body;
    const session = new AISession(basics);
    const out = await session.start();
    sessions.set(session.id, session);
    res.json({ simId: session.id, ...out });
  } catch (err: unknown) {
    const e = err as Error & { message?: string };
    res.status(502).json({ error: "AI_ERROR", message: String(e.message || e) });
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.post("/simulation/next-step", async (req: any, res: any) => {
  try {
    const { simId, metrics } = req.body;
    const session = sessions.get(simId);
    if (!session) return res.status(404).json({ error: "invalid simId" });
    const out = await session.next(metrics);
    res.json(out);
  } catch (err: unknown) {
    const e = err as Error & { message?: string };
    res.status(502).json({ error: "AI_ERROR", message: String(e.message || e) });
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.post("/simulation/end", async (req: any, res: any) => {
  try {
    const { simId } = req.body;
    const session = sessions.get(simId);
    if (!session) return res.status(404).json({ error: "invalid simId" });
    const out = await session.end();
    sessions.delete(simId);
    res.json(out);
  } catch (err: unknown) {
    const e = err as Error & { message?: string };
    res.status(502).json({ error: "AI_ERROR", message: String(e.message || e) });
  }
});

export default router;
