import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  @Output() noteAddedEvent = new EventEmitter<Note>();
  noteGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private notesService: NotesService) { }

  ngOnInit(): void {
    this.noteGroup = this.fb.group({
      title: ['', [Validators.required]],
      text: ['', Validators.required]
    });
  }

  saveNote() {
    if (!this.noteGroup.invalid) {
      const note = new Note(this.noteGroup.get('title').value, this.noteGroup.get('text').value);
      this.noteGroup.reset();
      this.notesService.addNotes(note).subscribe(res => {
        this.noteAddedEvent.emit(res);
      },
        err => {
        });
    }
  }
}
