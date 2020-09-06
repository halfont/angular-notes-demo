import {
  createReducer,
  on
} from '@ngrx/store';
import { addUser, loginUser, logoutUser } from '../actions/auth.actions';
import { User } from '../models/auth.model';

export const noteFeatureKey = 'auth';

export interface authStore {
  usersList: User[]
  loggedIn: {}
}

let users = [
  { username: 'a', email: 'test@test', password: 'a' },
  { username: 's', email: 'test@test', password: 's' },
];

let initialLogin = {username:undefined, sessionExp:undefined}

if (localStorage.authStore){
  let authStoreStorage = JSON.parse(localStorage.authStore)
  users = authStoreStorage.usersList
  initialLogin = authStoreStorage.loggedIn
}

export const initialState: authStore = {
  usersList: users,
  loggedIn: initialLogin
}

export const authReducer = createReducer<any>(initialState,
  on(addUser, (state, action) => {
    let newState = { ...state }
    newState.usersList = [...state.usersList, action.user]
    localStorage.setItem('authStore',JSON.stringify(newState))
    return newState
  }),

  on(loginUser, (state, action) => {
    let newState = { ...state }
    state.usersList.find((u) => {
      if ((u.username === action.username) && (u.password === action.password)) {
        newState.loggedIn = Object.assign({}, u, { 'sessionExp': Date.now() + 1209600000 })
      }
    })
    localStorage.setItem('authStore',JSON.stringify(newState))
    return newState
  }),

  on(logoutUser, (state) => {
    let newState = { ...state }
    newState.loggedIn = {}
    localStorage.setItem('authStore',JSON.stringify(newState))
    return newState;
  })
)