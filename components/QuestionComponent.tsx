import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  id: number
  type: 'multiple-choice' | 'open-ended' | 'code'
  question: string
  choices?: string[]
  correctAnswer: string
  explanation: string
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
     <div className={`flex ${question.type === 'code' ? 'flex-row' : 'flex-col'} p-4 gap-4`}>
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
       
            <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here"
          />
    
        )}
        {question.type === 'code' && (
          <div className="text-sm text-blue-600">
            Use the code editor below to write your solution.
          </div>
        )}
        <Button type="submit">Submit Answer</Button>
      </form>
      <div className="space-x-2">
        <Button onClick={() => onFlag('dont-ask-again')} variant="outline">Don't Ask Again</Button>
        <Button onClick={() => onFlag('ask-less-often')} variant="outline">Ask Less Often</Button>
        <Button onClick={() => onFlag('pass')} variant="outline">Pass</Button>
      </div>
     </div>
    </div>
  )
}