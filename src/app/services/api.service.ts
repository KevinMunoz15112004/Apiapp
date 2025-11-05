import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getJoke(): Observable<any> {
    return this.http.get('https://v2.jokeapi.dev/joke/Any?lang=es');
  }

  getCat(): Observable<any> {
    return this.http.get('https://api.thecatapi.com/v1/images/search');
  }

  getDog(): Observable<any> {
    return this.http.get('https://dog.ceo/api/breeds/image/random');
  }
}