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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { notes, setNotes, addNote, syncWithRedis } = useStore()


  useEffect(() => {
    if (note) {
      setLocalComment(note.comments)
    }
  }, [note])

  const handleNoteChange = (value: string) => { 
    setLocalComment(value)
  }

  const handleSaveNote = async () => {
    if (!note) return

    setIsSubmitting(true)
    try {
      console.log('Saving note:', note)
      if (notes.some(n => n.id === note.id)) {
        // Update existing note
        const updatedNotes = notes.map(n => 
          n.id === note.id ? { ...n, comments: localComment } : n
        )
        await setNotes(updatedNotes)
        console.log('Updated notes:', updatedNotes)
      } else {
        // Add new note
        await addNote({ ...note, comments: localComment })
        console.log('Added new note')
      }
      
      // Explicitly call syncWithRedis
      console.log('Calling syncWithRedis')
      await syncWithRedis()
      
      console.log('Note saved and synced successfully')
    } catch (error) {
      console.error('Failed to save or sync note:', error)
    } finally {
      setIsSubmitting(false)
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
        <div>
          <Label className="font-bold">Comments:</Label>
          <Textarea
            value={localComment}
            onChange={(e) => handleNoteChange(e.target.value)}
            placeholder="Add your comments here..."
            className="mt-1"
          />
        </div>
        <Button onClick={handleSaveNote} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Note'}
        </Button>
      </CardContent>
    </Card>
  )
}