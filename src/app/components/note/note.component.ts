import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Note } from 'src/app/models/note.model';
import { editNote, delNote, addNote } from 'src/app/actions/note.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.styl']
})
export class NoteComponent {
  noteId: string;
  noteData: Note;
  saveButtonText = "Save"
  cancelButtonText = "Cancel"
  delButtonText = "Delete"

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private store: Store<{ notesStore }>,
    public router: Router,
    private dialogRef: MatDialogRef<NoteComponent>) {
      this.noteData = {author: undefined, text: undefined}
    if (data) {
      this.noteId = data.noteId || this.noteId;
      this.store.subscribe(v => {
        this.noteData = Object.assign({}, v.notesStore.noteList.slice().find((m) => m.time === this.noteId))
      })

      if (data.buttonText) {
        this.saveButtonText = data.buttonText.ok || this.saveButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  dateconv(i) {
    return i ? new Date(i * 1) : '';
  }

  onConfirmClick(): void {
    this.noteId ? this.store.dispatch(editNote({ note: this.noteData })) : this.store.dispatch(addNote({ note: this.noteData }));
    this.dialogRef.close();
    this.router.navigate(['/notes']);
  }
  
  onDelClick(): void {
    this.store.dispatch(delNote({ noteId: this.noteData.time + '' }));
    this.dialogRef.close();
  }
}
