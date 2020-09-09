import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../models/note.model';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';


@Component({
  selector: 'app-existing-notes',
  templateUrl: './existing-notes.component.html',
  styleUrls: ['./existing-notes.component.scss']
})
export class ExistingNotesComponent implements OnInit, OnChanges {

  @Input() addedNote: Note;
  allNotes: Note[] = [];

  constructor(
    private notesService: NotesService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getNotes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addedNote) {
      if (this.addedNote?.id) {
        this.allNotes.push(this.addedNote);
      }
    }
  }

  getNotes() {
    this.notesService.getNotes().subscribe(data => {
      this.allNotes = data;
    });
  }

  editNote(note: Note) {
    const dialogRef = this.dialog.open(EditNoteComponent, {
      data: {
        note: note
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.allNotes.map(x => x.id).indexOf(result.id);
        this.allNotes[index] = result;
      }
    });
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note).subscribe(res => {
      this.allNotes = this.allNotes.filter(x => x.id !== note.id);
    });
  }
}
