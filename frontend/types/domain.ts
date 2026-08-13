export type Child = {
  id: string;
  name: string;
  age: number;
  avatar?: string | null;
  interests: string[];
  learningPreferences: string[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  visual?: string | null;
  videoUrl?: string | null;
  activityPrompt: string;
  activityAnswer: string;
  order: number;
  duration: number;
  quizQuestions: QuizQuestion[];
  progress?: { completed: boolean; progress: number }[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  category: string;
  difficulty: string;
  lessonCount: number;
  progress: number;
  lessons?: Lesson[];
};

export type ProgressSummary = {
  overall: number;
  completedLessons: number;
  totalLessons: number;
  simulationCompleted: number;
  quizAttempts: number;
  courses: { id: string; title: string; progress: number; completedLessons: number; totalLessons: number }[];
};

export type Simulation = {
  id: string;
  title: string;
  description: string;
  scenario: string;
  difficulty: string;
};

export type SimulationMessage = {
  id: string;
  role: "assistant" | "child";
  content: string;
};

