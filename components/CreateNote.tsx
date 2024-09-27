import React, { useState, useEffect } from 'react'
import { Note } from '@/types'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from './store'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface CreateNoteProps {
  note?: Note
}

export default function CreateNote({ note }: CreateNoteProps) {
  const [localComment, setLocalComment] = useState<string>('')
  const { notes, setNotes } = useStore()

  // useEffect(() => {
  //   if (note) {
  //     setLocalComment(note.comments)
  //   }
  // }, [note])

  const handleNoteChange = (value: string) => { 
    setLocalComment(value)
  }

  const handleSaveNote = () => {
    if (note) {
      let updatedNotes: Note[];
      if (Array.isArray(notes)) {
        const existingNoteIndex = notes.findIndex(note => note.id === note.id);
        if (existingNoteIndex !== -1) {
          // Update existing note
          updatedNotes = notes.map(note => 
            note.id === note.id ? { ...note, comments: localComment } : note
          );
        } else {
          // Add new note
          updatedNotes = [...notes, { ...note, comments: localComment }];
        }
      } else {
        // If notes is not an array, initialize it with the current note
        updatedNotes = [{ ...note, comments: localComment }];
      }
      setNotes(updatedNotes);
    }
  }

  if (!note) {
    return <div>No note available</div>
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Question and Answer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="font-bold">Question:</Label>
          <p>{note.question}</p>
        </div>
        <div>
          <Label className="font-bold">Your Answer:</Label>
          <p>{note.userAnswer}</p>
        </div>
        <div>
          <Label className="font-bold">Correct Answer:</Label>
          <p>{note.correctAnswer}</p>
        </div>
        <div>
          <Label className="font-bold">Explanation:</Label>
          <p>{note.explanation}</p>
        </div>
        <div>
          <Label className="font-bold">Score:</Label>
          <p>{note.score}</p>
        </div>

        <Button onClick={handleSaveNote}>Save Note</Button>
      </CardContent>
    </Card>
  )
}