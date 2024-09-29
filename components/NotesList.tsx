import React, { useEffect } from 'react'
import { Note } from '@/types'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from './store'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-javascript'

const CodeBlock = ({ code, language }: { code: string, language: string }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  return (
    <pre>
      <code className={`language-${language}`}>
        {code}
      </code>
    </pre>
  )
}

export default function NotesList() {
  const { notes, setNotes } = useStore()

  useEffect(() => {
    Prism.highlightAll()
  }, [notes])

  const handleNoteChange = (id: number, field: keyof Note, value: string) => {
    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, [field]: value } : note
      )
    )
  }

  const handleAddVersion = (id: number) => {
    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, versions: [...(note.versions || []), note.notes] } : note
      )
    )
  }

  if (!Array.isArray(notes) || notes.length === 0) {
    return <div>No notes available</div>
  }

  const detectLanguage = (code: string): string => {
    // Simple language detection logic
    if (code.includes('def ') || code.includes('import ')) return 'python'
    if (code.includes('function ') || code.includes('const ')) return 'javascript'
    if (code.includes('public class ') || code.includes('System.out.println')) return 'java'
    return 'plaintext'
  }

  return (
    <div className="space-y-4">
      {notes.map(note => (
        <Card key={note.id} className="w-full">
          <CardHeader>
            <CardTitle>Question ID: {note.questionId}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Note ID:</strong> {note.id}</p>
            <p><strong>Question:</strong> {note.question}</p>
            <div>
              <strong>Your answer:</strong>
              <CodeBlock code={note.userAnswer} language={detectLanguage(note.userAnswer)} />
            </div>
            <div>
              <strong>Correct answer:</strong>
              <CodeBlock code={note.correctAnswer} language={detectLanguage(note.correctAnswer)} />
            </div>
            <p><strong>Correct:</strong> {note.isCorrect ? 'Yes' : 'No'}</p>
            <p><strong>Explanation:</strong> {note.explanation}</p>
            <p><strong>Score at this point:</strong> {note.score}</p>
            <div>
              <strong>Your notes:</strong>
              <Textarea
                value={note.notes}
                onChange={(e) => handleNoteChange(note.id, 'notes', e.target.value)}
                placeholder="Add your notes here..."
                className="mt-1"
              />
            </div>
            <Button onClick={() => handleAddVersion(note.id)}>Save Version</Button>
            {note.versions && note.versions.length > 0 && (
              <div>
                <h4 className="font-bold mt-2">Previous Versions:</h4>
                {note.versions.map((version, index) => (
                  <p key={index} className="mt-1">{version}</p>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}