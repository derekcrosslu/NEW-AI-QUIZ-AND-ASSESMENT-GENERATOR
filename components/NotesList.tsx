import React from 'react'
import { Note } from '@/types'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface NotesListProps {
  notes: Note[]
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

export default function NotesList({ notes, setNotes }: NotesListProps) {
  const handleNoteChange = (id: number, field: keyof Note, value: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, [field]: value } : note
      )
    )
  }

  const handleAddVersion = (id: number) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, versions: [...note.versions, note.notes] } : note
      )
    )
  }

  return (
    <div className="space-y-4">
      {notes.map(note => (
        <div key={note.id} className="border p-4 rounded-md">
          <h3 className="font-bold mb-2">{note.question}</h3>
          <p className="mb-2">Your answer: {note.userAnswer}</p>
          <p className="mb-2">Correct: {note.isCorrect ? 'Yes' : 'No'}</p>
          <p className="mb-2">Explanation: {note.explanation}</p>
          <Textarea
            value={note.notes}
            onChange={(e) => handleNoteChange(note.id, 'notes', e.target.value)}
            placeholder="Add your notes here..."
            className="mb-2"
          />
          <Button onClick={() => handleAddVersion(note.id)} className="mb-2">Save Version</Button>
          {note.versions.length > 0 && (
            <div>
              <h4 className="font-bold mb-2">Previous Versions:</h4>
              {note.versions.map((version, index) => (
                <p key={index} className="mb-1">{version}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}