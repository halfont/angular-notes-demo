import { createAction, props } from '@ngrx/store';
import { Note } from '../models/note.model';

export const addNote = createAction(
  '[Note] Add Note',
  props<{ note: Note }>()
);

export const editNote = createAction(
  '[Note] Edit Note',
  props<{ note: Note }>()
);

export const delNote = createAction(
  '[Note] Delete Note',
  props<{ noteId: string }>()
);
