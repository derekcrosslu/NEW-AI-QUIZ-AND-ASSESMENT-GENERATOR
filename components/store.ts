import { create } from 'zustand'
import { Note } from '@/types'

interface Store {
  notes: Note[]
  setNotes: (notes: Note[] | ((prevNotes: Note[]) => Note[])) => void
}

export const useStore = create<Store>((set) => ({
  notes: [],
  setNotes: (notesOrUpdater) => set((state) => ({
    notes: typeof notesOrUpdater === 'function' 
      ? notesOrUpdater(state.notes)
      : notesOrUpdater
  })),
}))