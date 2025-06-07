import express from "express";
import aiRoutes from "./routes/ai";

export function createExpressApp() {
  const app = express();
  app.use(express.json());
  app.get('/ping', (_, res): void => { res.sendStatus(200); });
  app.use("/api", aiRoutes);
  return app;
}

if (typeof require !== 'undefined' && require.main === module) {
  const port = process.env.PORT || 3001;
  const app = createExpressApp();
  app.listen(port, () => {
    console.log(`AI server listening on ${port}`);
  });
}
