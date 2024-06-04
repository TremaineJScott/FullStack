import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet.model';
import { Favorite } from '../../models/favorite.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  favorites: Pet[] = [];
  userId = 'demoUser'; // This can be dynamic in a real application


  constructor(
    private favoriteService: FavoriteService,
    private petService: PetService
  ) { }


  ngOnInit(): void {
    this.loadFavorites();
  }


  loadFavorites(): void {
    this.favoriteService.getFavorites(this.userId).subscribe(favoriteIds => {
      this.favorites = [];
      favoriteIds.forEach(fav => {
        this.petService.getPet(fav.petId).subscribe(pet => {
          if (pet) {
            this.favorites.push(pet);
          }
        });
      });
    });
  }


  removeFavorite(petId: number): void {
    this.favoriteService.removeFavorite(this.userId, petId).subscribe(() => {
      this.loadFavorites();
    });
  }
}

