import { Injectable } from '@angular/core';
import { Pet } from '../models/pet.model';


@Injectable({
  providedIn: 'root'
})
export class PetService {
  private pets: Pet[] = [
    {
      petId: 1,
      name: 'Buddy',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      description: 'Friendly and energetic'
    },
    {
      petId: 2,
      name: 'Mittens',
      type: 'Cat',
      breed: 'Siamese',
      age: 2,
      description: 'Playful and affectionate'
    },
    {
      petId: 3,
      name: 'Charlie',
      type: 'Dog',
      breed: 'Beagle',
      age: 4,
      description: 'Loyal and curious'
    }
  ];


  constructor() { }


  getPets(): Pet[] {
    return this.pets;
  }


  getPet(id: number): Pet | undefined {
    return this.pets.find(p => p.petId === id);
  }


  addPet(pet: Pet): Pet {
    pet.petId = this.pets.length + 1;
    this.pets.push(pet);
    return pet;
  }


  updatePet(updatedPet: Pet): boolean {
    const index = this.pets.findIndex(p => p.petId === updatedPet.petId);
    if (index !== -1) {
      this.pets[index] = updatedPet;
      return true;
    }
    return false;
  }


  deletePet(id: number): boolean {
    const index = this.pets.findIndex(p => p.petId === id);
    if (index !== -1) {
      this.pets.splice(index, 1);
      return true;
    }
    return false;
  }
}
