import { GoogleGenAI } from "@google/genai";
import { AiProvider, LessonAiContext, SimulationAiContext } from "./ai.provider.js";

export class GeminiAiProvider implements AiProvider {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  }

  async lessonHelp(context: LessonAiContext): Promise<string> {
    const prompt = `Kamu adalah Budi, asisten virtual yang ramah dan suportif untuk anak berkebutuhan khusus.
Nama anak: ${context.childName}
Usia anak: ${context.childAge} tahun
Materi yang dipelajari: ${context.lessonTitle}
Konten materi: ${context.lessonContent}
Preferensi belajar anak: ${context.preferences.join(", ")}
Minat anak: ${context.interests.join(", ")}

Tugasmu adalah menjawab pertanyaan atau pernyataan dari anak terkait materi yang dipelajari.
Gunakan bahasa yang sederhana, sangat ramah, hangat, dan positif.
Jika memungkinkan, kaitkan penjelasan dengan minat anak.
Jangan menggunakan kalimat panjang yang sulit dipahami.

Anak berkata: "${context.message}"
Tulis responsmu di bawah ini:`;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });
      return response.text || "Maaf, Budi sedang bingung menjawabnya. Coba tanya hal lain ya!";
    } catch (error) {
      console.error("Gemini API Error (lessonHelp):", error);
      return "Maaf, sistem AI sedang sibuk saat ini. Mohon coba tanyakan lagi beberapa saat kemudian ya!";
    }
  }

  async simulationReply(context: SimulationAiContext): Promise<string> {
    const systemPrompt = `Kamu adalah karakter dalam simulasi percakapan untuk melatih kemampuan sosial anak berkebutuhan khusus.
Skenario: ${context.scenario}
Instruksi Karakter: ${context.systemPrompt}

Gunakan bahasa yang jelas, mudah dipahami, ramah, dan sesuai dengan skenario.
Buat respons yang cukup singkat agar anak mudah merespons kembali.`;

    const contents: any[] = [];

    // Gemini API strict rule: Conversation must start with a 'user' role.
    if (context.history.length > 0 && context.history[0].role === "assistant") {
      contents.push({ role: "user", parts: [{ text: "Halo, mari kita mulai simulasi ini." }] });
    }

    for (const m of context.history) {
      contents.push({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      });
    }

    // Do NOT push context.message again because it's already in history!

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });
      return response.text || "Hmm, aku tidak yakin harus menjawab apa.";
    } catch (error) {
      console.error("Gemini API Error (simulationReply):", error);
      return "Maaf, aku sedang tidak bisa membalas karena jaringan sibuk. Coba sapa aku lagi nanti ya!";
    }
  }
}
