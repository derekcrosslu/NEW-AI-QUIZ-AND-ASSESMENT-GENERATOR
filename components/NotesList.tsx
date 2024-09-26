import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Note {
  questionId: number
  question: string
  userAnswer: string
  explanation: string
  isCorrect: boolean
  notes: string
  versions: string[]
}

interface NotesListProps {
  notes: Note[]
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

export default function NotesList({ notes, setNotes }: NotesListProps) {
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null)
  const [editedNote, setEditedNote] = useState('')

  const handleEditNote = (noteId: number, currentNote: string) => {
    setEditingNoteId(noteId)
    setEditedNote(currentNote)
  }

  const handleSaveNote = (noteId: number) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.questionId === noteId
          ? {
              ...note,
              notes: editedNote,
              versions: [...note.versions, note.notes],
            }
          : note
      )
    )
    setEditingNoteId(null)
  }

  if (!notes || notes.length === 0) {
    return <div className="text-center text-gray-500">No notes available yet.</div>
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {notes.map((note, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-blue-800">
            Question {note.questionId}: {note.question.substring(0, 50)}...
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p><strong>Your Answer:</strong> {note.userAnswer}</p>
              <p><strong>Correct:</strong> {note.isCorrect ? 'Yes' : 'No'}</p>
              <p><strong>Explanation:</strong> {note.explanation}</p>
              <div>
                <strong>Notes:</strong>
                {editingNoteId === note.questionId ? (
                  <div className="space-y-2">
                    <Input
                      value={editedNote}
                      onChange={(e) => setEditedNote(e.target.value)}
                    />
                    <Button onClick={() => handleSaveNote(note.questionId)}>Save</Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p>{note.notes}</p>
                    <Button onClick={() => handleEditNote(note.questionId, note.notes)}>Edit</Button>
                  </div>
                )}
              </div>
              {note.versions && note.versions.length > 0 && (
                <div>
                  <strong>Previous Versions:</strong>
                  <ul className="list-disc list-inside">
                    {note.versions.map((version, vIndex) => (
                      <li key={vIndex}>{version}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}