export type LessonAiContext = {
  childName: string;
  lessonTitle: string;
  lessonContent: string;
  preferences: string[];
  interests: string[];
  message: string;
};

export type SimulationAiContext = {
  scenario: string;
  systemPrompt: string;
  history: { role: string; content: string }[];
  message: string;
};

export interface AiProvider {
  lessonHelp(context: LessonAiContext): Promise<string>;
  simulationReply(context: SimulationAiContext): Promise<string>;
}

