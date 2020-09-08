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
  title = 'google-keep';

  noteGroup: FormGroup;
  allNotes: Note[] = [];

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService) {
  }

  ngOnInit(): void {
    this.noteGroup = this.fb.group({
      title: ['', [Validators.required]],
      text: ['', Validators.required]
    });

    this.getNotes();
  }

  saveNote() {
    if (!this.noteGroup.invalid) {
      const note = new Note(this.noteGroup.get('title').value, this.noteGroup.get('text').value);
      this.allNotes.push(note);
      this.noteGroup.reset();
      this.notesService.addNotes(note).subscribe(res => {
      },
        err => {
          this.allNotes.pop();
        });
    }
  }

  getNotes() {
    this.notesService.getNotes().subscribe(data => {
      this.allNotes = data;
    });
  }
}
