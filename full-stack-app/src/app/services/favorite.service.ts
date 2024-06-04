import { Injectable } from '@angular/core';
import { Pet } from '../models/pet.model';
import { Favorite } from '../models/favorite.model';
import { PetService } from './pet.service';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: Favorite[] = [];
  private favoritePets: Pet[] = [];


  constructor(private petService: PetService) { }


  getFavorites(userId: string): Pet[] {
    return this.favoritePets.filter(pet => this.favorites.some(fav => fav.userId === userId && fav.petId === pet.petId));
  }


  addFavorite(userId: string, petId: number): void {
    const pet = this.petService.getPet(petId);
    if (pet) {
      this.favorites.push({ userId, petId });
      this.favoritePets.push(pet);
    }
  }


  removeFavorite(userId: string, petId: number): void {
    this.favorites = this.favorites.filter(f => f.userId !== userId || f.petId !== petId);
    this.favoritePets = this.favoritePets.filter(p => p.petId !== petId);
  }
}
