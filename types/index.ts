export interface Question {
  id: number;
  type: 'multiple-choice' | 'code' | 'open-ended';
  question: string;
  choices: string[] | null;
  correctAnswer: string;
  explanation: string | null;
  flag: 'dont-ask-again' | 'ask-less-often' | 'pass' | null;
}



interface CreateNoteData {
  questionId: number
  question: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  explanation: string
  score: number
}


export interface Note {
  id: number;
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  score: number;
  comments: string;
  versions: string[];
}