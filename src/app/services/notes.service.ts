import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    baseUrl = 'http://localhost:3000/notes/';
    constructor(private httpClient: HttpClient) {

    }

    addNotes(note: Note) {
        return this.httpClient.post(this.baseUrl, note);
    }

    getNotes(): Observable<Note[]> {
        return this.httpClient.get<Note[]>(this.baseUrl);
    }
}
