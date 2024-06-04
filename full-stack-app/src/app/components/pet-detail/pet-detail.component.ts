import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { FavoriteService } from '../../services/favorite.service';
import { Pet } from '../../models/pet.model';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule, RouterModule,HttpClientModule],
  templateUrl: './pet-detail.component.html',
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
    this.petService.getPet(id).subscribe(pet => this.pet = pet);
  }


  addToFavorites(petId: number | undefined): void {
    if (petId !== undefined) {
      this.favoriteService.addFavorite(this.userId, petId);
    }
  }
}
