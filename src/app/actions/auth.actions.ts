import { createAction, props } from '@ngrx/store';
import { User } from '../models/auth.model';

export const addUser = createAction(
  '[Note] Add User',
  props<{ user: User }>()
);

export const loginUser = createAction(
  '[Note] Login User',
  props<{ username: string, password: string }>()
);

export const logoutUser = createAction(
  '[Note] logout User'
);


