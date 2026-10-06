import { AiProvider, LessonAiContext, SimulationAiContext } from "./ai.provider.js";

export class MockAiProvider implements AiProvider {
  async lessonHelp(context: LessonAiContext): Promise<string> {
    const interest = context.interests[0] ? ` Kita pakai contoh ${context.interests[0].toLowerCase()}.` : "";
    const preference = context.preferences[0] ? ` Kita gunakan cara ${context.preferences[0].toLowerCase()}.` : "";
    const ageHint = context.childAge <= 8 ? " Aku jelaskan dengan kalimat sangat pendek." : " Aku tambahkan satu contoh supaya lebih mudah dipahami.";
    return `Baik, ${context.childName}. ${context.lessonTitle} artinya kita belajar satu hal sederhana dulu. ${context.lessonContent.split(".")[0]}.${interest}${preference}${ageHint} Coba jawab pelan-pelan: bagian mana yang masih membingungkan?`;
  }

  async simulationReply(context: SimulationAiContext): Promise<string> {
    const count = context.history.filter((item) => item.role === "child").length;
    if (count >= 4) return "Bagus. Latihan kita hampir selesai. Apa yang bisa kamu ucapkan untuk menutup percakapan?";
    if (context.scenario.includes("Bertemu")) return "Senang bertemu denganmu. Apa kegiatan yang kamu suka?";
    if (context.scenario.includes("Bantuan")) return "Tentu, aku bisa membantu. Kamu butuh bantuan untuk apa?";
    if (context.scenario.includes("Guru")) return "Baik, silakan bicara pelan-pelan. Apa yang ingin kamu tanyakan?";
    return "Baik. Kamu ingin membeli apa hari ini?";
  }
}
