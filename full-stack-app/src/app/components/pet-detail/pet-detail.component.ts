import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { FavoriteService } from '../../services/favorite.service';
import { Pet } from '../../models/pet.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {
  pet: Pet | undefined;
  userId = 'demoUser'; // This can be dynamic in a real application


  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private favoriteService: FavoriteService
  ) { }


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.pet = this.petService.getPet(id);
  }


  addToFavorites(petId: number | undefined): void {
    if (petId !== undefined) {
      this.favoriteService.addFavorite(this.userId, petId);
    }
  }
}

