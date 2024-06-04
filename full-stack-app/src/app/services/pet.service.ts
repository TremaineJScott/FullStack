import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';


@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'https://localhost:7113/api/pets';


  constructor(private http: HttpClient) { }


  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }


  getPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }


  addPet(pet: Pet): Observable<Pet> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Pet>(this.apiUrl, pet, httpOptions);
  }


  updatePet(updatedPet: Pet): Observable<Pet> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Pet>(`${this.apiUrl}/${updatedPet.petId}`, updatedPet, httpOptions);
  }


  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
