import { Routes } from '@angular/router';
import { PetDetailComponent } from './components/pet-detail/pet-detail.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';

export const routes : Routes = [
    { path: '', redirectTo: '/pets', pathMatch: 'full' },
    { path: 'pets', component: PetListComponent },
    { path: 'pets/:id', component: PetDetailComponent },
    { path: 'favorites', component: FavoriteListComponent }
  ];
  
