import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class UserData {

    baseUrl = 'http://localhost:3000/api';

    constructor(
        private http: HttpClient
    ) {}

    /// User-related API calls ///
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + '/users');
    }
    
    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl + '/users', user);
    }
    
    getUser(userName: string): Observable<User> {
        return this.http.get<User>(this.baseUrl + '/users/' + userName);
    }
    
    updateUser(formData: User): Observable<User> {
        return this.http.put<User>(this.baseUrl + '/users/' + formData.userName, formData);
    }
    
    deleteUser(userName: string): Observable<User> {
        return this.http.delete<User>(this.baseUrl + '/users/' + userName);
    }
}

