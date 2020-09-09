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

    addNotes(note: Note): Observable<Note> {
        return this.httpClient.post<Note>(this.baseUrl, note);
    }

    getNotes(): Observable<Note[]> {
        return this.httpClient.get<Note[]>(this.baseUrl);
    }

    deleteNote(note: Note): Observable<any> {
        const api = this.baseUrl + note.id;
        return this.httpClient.delete(api);
    }

    editNote(note: Note): Observable<Note> {
        const api = this.baseUrl + note.id;
        return this.httpClient.put<Note>(api, note);
    }
}
