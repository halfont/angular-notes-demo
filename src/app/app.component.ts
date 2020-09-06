import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NoteComponent } from './components/note/note.component';
import { Note } from './models/note.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { logoutUser } from './actions/auth.actions';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

export interface DialogData {
  Note: Note
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent {
  title = 'ang-notes-thing';
  public loggedIn: Observable<boolean>;

  constructor(
    private store: Store<{ authStore }>,
    private dialog: MatDialog,
    public router: Router,
    private authService: AuthService
  ) {
    this.store.subscribe(v => {
      this.loggedIn = authService.authd;
    })
  }

  public Notes() {
    this.router.navigate(['/notes']);
  }
  public newNote() {
    this.dialog.open(NoteComponent, { data: {} });
  }
  public register() {
    this.router.navigate(['/register']);
  }
  public logout() {
    this.store.dispatch(logoutUser())
    this.router.navigate(['/login']);
  }
  public login() {
    this.router.navigate(['/login']);
  }

}

