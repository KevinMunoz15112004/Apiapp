import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.page.html',
  styleUrls: ['./dogs.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule]
})
export class DogsPage implements OnInit {
  dogImage: string | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getNewDog();
  }

  getNewDog() {
    this.apiService.getDog().subscribe(
      (response) => {
        this.dogImage = response.message;
      },
      (error) => {
        console.error('Error al obtener la imagen del perro:', error);
      }
    );
  }
}
