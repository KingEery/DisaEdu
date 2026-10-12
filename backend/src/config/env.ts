import "dotenv/config";

export const env = {
  port: Number(process.env.PORT ?? 5001),
  aiProvider: process.env.AI_PROVIDER ?? "mock"
};

