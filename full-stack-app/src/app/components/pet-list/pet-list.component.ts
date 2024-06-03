import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLinkActive, RouterModule]
})
export class PetListComponent implements OnInit {
  pets: Pet[] = [];
  newPet: Pet = {
    petId: 0,
    name: '',
    type: '',
    breed: '',
    age: 0,
    description: ''
  };

  constructor(private petService: PetService, private router: Router) { }

  ngOnInit(): void {
    this.pets = this.petService.getPets();
  }

  addPet(): void {
    if (this.newPet.name && this.newPet.type && this.newPet.breed && this.newPet.age > 0 && this.newPet.description) {
      this.petService.addPet(this.newPet);
      this.newPet = {
        petId: 0,
        name: '',
        type: '',
        breed: '',
        age: 0,
        description: ''
      };
    }
  }
}

