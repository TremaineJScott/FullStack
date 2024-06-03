import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { Pet } from '../../models/pet.model';
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


  constructor(private favoriteService: FavoriteService) { }


  ngOnInit(): void {
    this.favorites = this.favoriteService.getFavorites(this.userId);
  }


  removeFavorite(petId: number): void {
    this.favoriteService.removeFavorite(this.userId, petId);
    this.favorites = this.favoriteService.getFavorites(this.userId);
  }
}
