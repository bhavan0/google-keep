import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from './services/notes.service';
import { Note } from './models/note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  addedNote: Note;

  constructor() {
  }

  ngOnInit(): void {

  }

  noteAddedEvent(note: Note) {
    this.addedNote = { ...note };
  }
}
