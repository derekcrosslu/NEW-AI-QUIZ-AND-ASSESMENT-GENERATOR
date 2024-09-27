'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuestionComponent from './QuestionComponent'
import NotesList from './NotesList'
import CreateNote from './CreateNote'
import useQuestions from './questions'
import { Question, Note } from '@/types'
import { useStore } from './store'

export default function QuestionAnswerApp() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [note, setNote] = useState<Note>()
  const [activeTab, setActiveTab] = useState('question')
  const [feedback, setFeedback] = useState('')
  const [quizFinished, setQuizFinished] = useState(false)
  const [code, setCode] = useState<string>('')
  const [debugInfo, setDebugInfo] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [createNoteData, setCreateNoteData] = useState<Partial<Note> | null>(null)
  const { questions: fetchedQuestions, loading, error } = useQuestions()
  const { setNotes } = useStore()

  useEffect(() => {
    const debugLog = (message: string) => {
      setDebugInfo(prev => `${prev}\n${message}`)
    }

    debugLog(`Fetched questions: ${JSON.stringify(fetchedQuestions)}`)
    
    if (fetchedQuestions && Array.isArray(fetchedQuestions) && fetchedQuestions.length > 0) {
      const selectedQuestions: Question[] = fetchedQuestions.map((q, index) => ({
        ...q,
        id: index + 1,
        flag: null,
      }))
      debugLog(`Selected questions: ${JSON.stringify(selectedQuestions)}`)
      setQuestions(selectedQuestions)
      setCurrentQuestion(selectedQuestions[0])
    } else {
      debugLog('No questions available or invalid data')
    }
  }, [fetchedQuestions])

  useEffect(() => {
    setDebugInfo(prev => `${prev}\nCurrent question: ${JSON.stringify(currentQuestion)}`)
  }, [currentQuestion])

  const handleAnswer = async (answer: string) => {
    if (!currentQuestion) return

    let isCorrect = false
    let feedbackText = ''

    const newScore = isCorrect ? score + 1 : score
    setScore(newScore)
    setFeedback(feedbackText)

    const newNote: Note = {
      id: Date.now(),
      questionId: currentQuestion.id.toString(),
      question: currentQuestion.question,
      userAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      explanation: feedbackText,
      score: newScore,
      comments: '', // Initialize with empty notes
      versions: [],
    }
    setNote(newNote)
    setNotes((prevNotes) => [...prevNotes, newNote])

    if (currentQuestion.type === 'multiple-choice') {
      isCorrect = answer === currentQuestion.correctAnswer
      feedbackText = isCorrect
        ? 'Correct!'
        : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`
    } else {
      try {
        const response = await fetch('/api/evaluate-openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: currentQuestion.question,
            userAnswer: answer,
            correctAnswer: currentQuestion.correctAnswer,
            questionType: currentQuestion.type,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}, error: ${errorData.error}`)
        }

        const data = await response.json()
        isCorrect = data.isCorrect
        feedbackText = data.feedback
      } catch (error) {
        console.error('Error evaluating answer:', error)
        setErrorMessage(error.message)
        feedbackText = "Sorry, we couldn't evaluate your answer. Please try again."
      }
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1)
        setCurrentQuestion(questions[currentQuestionIndex + 1])
        setFeedback('')
      } else {
        setQuizFinished(true)
      }
    }, 3000)
  }

  const handleFlag = (flag: 'dont-ask-again' | 'ask-less-often' | 'pass') => {
    if (!currentQuestion) return

    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === currentQuestion.id ? { ...q, flag } : q
      )
    )

    if (flag === 'pass') {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1)
        setCurrentQuestion(questions[currentQuestionIndex + 1])
      } else {
        setQuizFinished(true)
      }
    }
  }



  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setQuizFinished(false)
    setFeedback('')
    setDebugInfo('')
    if (questions.length > 0) {
      setCurrentQuestion(questions[0])
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-100 p-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Loading Quiz...</h1>
            <p className="text-xl">
              Please wait while we prepare your questions.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-blue-100 p-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className="text-xl text-red-500 mb-4">{error}</p>
            <Button onClick={restartQuiz}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-800">
          New AI Quiz Generator App
          </CardTitle>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              <h3 className="font-semibold">Error:</h3>
              <p>{errorMessage}</p>
            </div>
          )}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
            
              <TabsTrigger value="question">Question</TabsTrigger>
              <TabsTrigger value="create-note">Create Notes</TabsTrigger>
              <TabsTrigger value="notes">Note List</TabsTrigger>
            </TabsList>
            <TabsContent value="question">
              {currentQuestion ? (
                <>
                  <div className="mb-4">
                    Progress: {currentQuestionIndex + 1} / {questions.length}
                  </div>
                  <QuestionComponent
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    onFlag={handleFlag}
                  />
                  {feedback && (
                    <div
                      className={`mt-4 p-2 ${
                        feedback.toLowerCase().includes('correct')
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      }`}
                    >
                      {feedback}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-500">
                  No questions available. Please check your data source.
                </div>
              )}
            </TabsContent>
            <TabsContent value="create-note">
              <CreateNote note={note} />
            </TabsContent>
            <TabsContent value="notes">
              <NotesList />
            </TabsContent>

          </Tabs>
          <div className="mt-4 text-xl font-semibold text-blue-800">
            Score: {score}
          </div>
  
        </CardContent>
      </Card>
    </div>
  )
}