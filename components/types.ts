export interface Question {
    id: number
    type: 'multiple-choice' | 'open-ended' | 'coding'
    question: string
    choices?: string[]
    correctAnswer: string
    explanation: string
    flag: 'dont-ask-again' | 'ask-less-often' | 'pass' | null
  }
  
  export interface Note {
    questionId: number
    question: string
    userAnswer: string
    explanation: string
    isCorrect: boolean
    notes: string
    versions: string[]
  }