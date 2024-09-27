import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Note {
  questionId: number | null
  question: string
  userAnswer: string
  correctAnswer: string
  explanation: string
  isCorrect: boolean
  score: number
  notes: string
  versions: string[]
}

interface CreateNoteProps {
  onCreateNote: (note: Omit<Note, 'id'>) => void
}

export default function CreateNote({ onCreateNote }: CreateNoteProps) {
  const [question, setQuestion] = useState('')
  const [userAnswer, setUserAnswer] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [explanation, setExplanation] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateNote({
      questionId: null,
      question,
      userAnswer,
      correctAnswer,
      explanation,
      isCorrect,
      score,
      notes,
      versions: [],
    })
    // Reset form
    setQuestion('')
    setUserAnswer('')
    setCorrectAnswer('')
    setExplanation('')
    setIsCorrect(false)
    setScore(0)
    setNotes('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="question">Question</Label>
        <Input
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="userAnswer">Your Answer</Label>
        <Input
          id="userAnswer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="correctAnswer">Correct Answer</Label>
        <Input
          id="correctAnswer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="explanation">Explanation</Label>
        <Textarea
          id="explanation"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isCorrect"
          checked={isCorrect}
          onChange={(e) => setIsCorrect(e.target.checked)}
        />
        <Label htmlFor="isCorrect">Correct Answer</Label>
      </div>
      <div>
        <Label htmlFor="score">Score</Label>
        <Input
          id="score"
          type="number"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <Button type="submit">Create Note</Button>
    </form>
  )
}