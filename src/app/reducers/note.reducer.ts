import {
  createReducer,
  on
} from '@ngrx/store';
import { Note } from '../models/note.model';
import { addNote, editNote, delNote } from '../actions/note.actions';

export const noteFeatureKey = 'note';

export interface notesStore {
  noteList: Note[]
}

let notes = [];

if (localStorage.noteStore){
  let noteStoreStorage = JSON.parse(localStorage.noteStore)
  notes = noteStoreStorage.noteList
}

export const initialState: notesStore = {
  noteList: notes
}

export const noteReducer = createReducer<any>(initialState,
  on(addNote, (state, action) => {
    let curNote = { ...action.note, time: Date.now() }
    let newNotes = { ...state }
    newNotes.noteList = [...state.noteList, curNote]

    localStorage.setItem('noteStore',JSON.stringify(newNotes))
    return newNotes
  }),

  on(editNote, (state, action) => {
    let newState= {...state}
    let newNotesList = [...state.noteList]
    let newNote = Object.assign({},{ ...action.note })
    let res = newNotesList.map((oldNote:Note) => (oldNote.time === newNote.time) ? newNote : oldNote)
    newState.noteList = res

    localStorage.setItem('noteStore',JSON.stringify(newState))
    return newState;
  }),

  on(delNote, (state, action) => {
    let newState= {...state}
    let newNotesList = [...state.noteList]
    let res = newNotesList.filter((oldNote:Note) => oldNote.time != action.noteId)
    newState.noteList = res

    localStorage.setItem('noteStore',JSON.stringify(newState))
    return newState;
  })
)