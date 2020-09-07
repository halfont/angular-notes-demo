import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Note } from "../../models/note.model";
import { MatDialog } from '@angular/material/dialog';
import { NoteComponent } from '../note/note.component';

export interface DialogData {
  Note: Note
}

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.styl']
})

export class NoteListComponent implements OnInit {
  notes: [];
  breakpoint = 4;
  noteId = '';
  notesStore;
  constructor(private dialog: MatDialog, private store: Store<any>) {
    this.store.subscribe(v => {
      this.notes = v.notesStore.noteList
    })
  }

  dateconv(i) {
    let d = new Date(i * 1)
    return d;
  }

  openDialog(noteId: string) {
    this.dialog.open(NoteComponent, {
      data: {
        noteId
      }
    });
  }

  ngOnInit(): void {
    this.breakpoint = 4;
    (window.innerWidth <= 1750) && (this.breakpoint = 3);
    (window.innerWidth <= 1300) && (this.breakpoint = 2);
    (window.innerWidth <= 1080) && (this.breakpoint = 1);
  }

  onResize(_) {
    this.breakpoint = 4;
    (window.innerWidth <= 1750) && (this.breakpoint = 3);
    (window.innerWidth <= 1300) && (this.breakpoint = 2);
    (window.innerWidth <= 1080) && (this.breakpoint = 1);
  }
}
