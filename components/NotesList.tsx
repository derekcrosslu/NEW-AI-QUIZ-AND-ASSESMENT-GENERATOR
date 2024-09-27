import React from 'react'
import { Note } from '@/types'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from './store'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotesList() {
  const { notes, setNotes } = useStore()

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
            <p><strong>Your answer:</strong> {note.userAnswer}</p>
            <p><strong>Correct answer:</strong> {note.correctAnswer}</p>
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