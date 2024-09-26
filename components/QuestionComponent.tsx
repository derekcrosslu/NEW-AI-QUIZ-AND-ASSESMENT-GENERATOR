import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import CodeEditor from './CodeEditor'

interface Question {
  id: number
  type: 'multiple-choice' | 'open-ended' | 'code'
  question: string
  choices: string[] | null
  correctAnswer: string
  explanation: string | null
  flag: 'dont-ask-again' | 'ask-less-often' | 'pass' | null
}

interface QuestionComponentProps {
  question: Question
  onAnswer: (answer: string) => void
  onFlag: (flag: 'dont-ask-again' | 'ask-less-often' | 'pass') => void
}

export default function QuestionComponent({ question, onAnswer, onFlag }: QuestionComponentProps) {
  const [answer, setAnswer] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAnswer(answer)
    setAnswer('')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-blue-800">{question.question}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {question.type === 'multiple-choice' && question.choices && (
          <RadioGroup value={answer} onValueChange={setAnswer}>
            {question.choices.map((choice, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={choice} id={`choice-${index}`} />
                <Label htmlFor={`choice-${index}`}>{choice}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        {question.type === 'open-ended' && (
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here"
            rows={4}
          />
        )}
        {question.type === 'code' && (
          <CodeEditor
            code={answer}
            setCode={setAnswer}
          />
          // <Textarea
          //   value={answer}
          //   onChange={(e) => setAnswer(e.target.value)}
          //   placeholder="Write your code here"
          //   rows={8}
          //   className="font-mono"
          // />
        )}
        <Button type="submit">Submit Answer</Button>
      </form>
      <div className="space-x-2">
        <Button onClick={() => onFlag('dont-ask-again')} variant="outline">Don't Ask Again</Button>
        <Button onClick={() => onFlag('ask-less-often')} variant="outline">Ask Less Often</Button>
        <Button onClick={() => onFlag('pass')} variant="outline">Pass</Button>
      </div>
    </div>
  )
}