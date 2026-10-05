import "dotenv/config";
import app from "./app.js";
import { env } from "./config/env.js";

export default app;

if (!process.env.VERCEL) {
  app.listen(env.port, () => {
    console.log(`DisaEdu backend listening on http://localhost:${env.port}`);
  });
}
