import { create } from 'zustand'
import { Note } from '@/types'

interface StoreState {
  notes: Note[]
  setNotes: (notes: Note[] | ((prevNotes: Note[]) => Note[])) => void
  addNote: (newNote: Partial<Note>) => void
  syncWithRedis: () => Promise<void>
  fetchNotesFromRedis: () => Promise<void>
}

export const useStore = create<StoreState>((set, get) => ({
  notes: [],
  
  setNotes: (notesOrUpdater) => set((state) => {
    const newNotes = typeof notesOrUpdater === 'function'
      ? notesOrUpdater(state.notes)
      : notesOrUpdater
    return { notes: newNotes }
  }),


  addNote: async (newNote) => {
    const fullNote: Note = {
      id: Date.now(),
      questionId: '',
      question: '',
      userAnswer: '',
      correctAnswer: '',
      isCorrect: false,
      explanation: '',
      score: 0,
      comments: '',
      versions: [],
      ...newNote
    }
    set((state) => ({ notes: [...state.notes, fullNote] }))
    await get().syncWithRedis()
  },

  syncWithRedis: async () => {
    const notes = get().notes
    console.log('Attempting to sync with Redis. Notes:', notes)

    if (notes.length === 0) {
      console.log('No notes to sync')
      return
    }

    try {
      const responses = await Promise.all(notes.map(note => {
        console.log('Syncing note:', note)
        if (!note || typeof note.id !== 'number') {
          console.error('Invalid note object:', note)
          throw new Error('Invalid note object')
        }
        return fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            key: note.id.toString(),
            content: JSON.stringify(note)
          }),
        })
      }))
      
      const results = await Promise.all(responses.map(res => res.json()))
      console.log('Sync results:', results)
    } catch (error) {
      console.error('Failed to sync with Redis:', error)
      throw error
    }
  },

  fetchNotesFromRedis: async () => {
    try {
      const response = await fetch('/api/fetchNotes', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      console.log('response: ', response);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch notes from Redis: ${errorData.error}, ${errorData.details}`);
      }
  
      const fetchedNotes: Note[] = await response.json()
      console.log('Fetched notes:', fetchedNotes)
  
      set({ notes: fetchedNotes })
    } catch (error) {
      console.error('Error fetching notes from Redis:', error)
      throw error
    }
  },
}))