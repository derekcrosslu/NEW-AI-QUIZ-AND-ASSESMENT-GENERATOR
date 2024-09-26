export interface Question {
  id: number;
  type: 'multiple-choice' | 'code' | 'open-ended';
  question: string;
  choices: string[] | null;
  correctAnswer: string;
  explanation: string | null;
  flag: 'dont-ask-again' | 'ask-less-often' | 'pass' | null;
}

export interface Note {
  id: number;
  questionId: number | null;
  question: string;
  userAnswer: string;
  explanation: string;
  isCorrect: boolean;
  notes: string;
  versions: string[];
}