import "dotenv/config";

export const env = {
  port: Number(process.env.PORT ?? 5000),
  aiProvider: process.env.AI_PROVIDER ?? "mock"
};

