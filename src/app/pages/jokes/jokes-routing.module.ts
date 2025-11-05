import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JokesPage } from './jokes.page';

const routes: Routes = [
  {
    path: '',
    component: JokesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JokesPageRoutingModule {}
