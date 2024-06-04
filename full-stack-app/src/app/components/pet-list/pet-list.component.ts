import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet.model';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
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


  constructor(private petService: PetService) { }


  ngOnInit(): void {
    this.petService.getPets().subscribe(pets => this.pets = pets);
  }


  addPet(): void {
    if (this.newPet.name && this.newPet.type && this.newPet.breed && this.newPet.age > 0 && this.newPet.description) {
      this.petService.addPet(this.newPet).subscribe(pet => {
        this.pets.push(pet);
        this.newPet = {
          petId: 0,
          name: '',
          type: '',
          breed: '',
          age: 0,
          description: ''
        };
      });
    }
  }
}

