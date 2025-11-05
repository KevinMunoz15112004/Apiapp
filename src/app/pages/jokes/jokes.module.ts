import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JokesPageRoutingModule } from './jokes-routing.module';
import { JokesPage } from './jokes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JokesPageRoutingModule
  ]
})
export class JokesPageModule {}
