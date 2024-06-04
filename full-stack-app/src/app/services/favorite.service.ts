import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../models/favorite.model';
import { Pet } from '../models/pet.model';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'https://localhost:7113/api/favorites';


  constructor(private http: HttpClient) { }


  getFavorites(userId: string): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.apiUrl}/${userId}`);
  }


  addFavorite(userId: string, petId: number): Observable<Favorite> {
    const favorite: Favorite = { userId, petId };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Favorite>(this.apiUrl, favorite, httpOptions);
  }


  removeFavorite(userId: string, petId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/${petId}`);
  }
}



