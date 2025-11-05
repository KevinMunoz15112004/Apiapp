import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'jokes',
    loadComponent: () => import('./pages/jokes/jokes.page').then( m => m.JokesPage)
  },
  {
    path: 'cats',
    loadComponent: () => import('./pages/cats/cats.page').then( m => m.CatsPage)
  },
  {
    path: 'dogs',
    loadComponent: () => import('./pages/dogs/dogs.page').then( m => m.DogsPage)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
