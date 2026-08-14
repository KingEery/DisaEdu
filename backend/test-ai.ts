import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  const response = await ai.models.list();
  const arr = Array.isArray(response) ? response : (response as any).models || (response as any).data || [];
  console.log("ALL MODELS:", arr.map((m: any) => m.name));
}
run().catch(console.error);
