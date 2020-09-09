import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  noteGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private notesService: NotesService) {
  }

  ngOnInit(): void {
    this.noteGroup = this.fb.group({
      title: [this.data.note.title, [Validators.required]],
      text: [this.data.note.text, Validators.required]
    });
  }

  saveNote() {
    if (!this.noteGroup.invalid) {
      const note = new Note(this.noteGroup.get('title').value, this.noteGroup.get('text').value);
      note.id = this.data.note.id;
      this.notesService.editNote(note).subscribe(res => {
        this.dialogRef.close(note);
      },
        err => {
          this.dialogRef.close();
        });
    }
  }

}
