import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.page.html',
  styleUrls: ['./cats.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule]
})
export class CatsPage implements OnInit {
  catImage: string | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getNewCat();
  }

  getNewCat() {
    this.apiService.getCat().subscribe(
      (response) => {
        this.catImage = response[0].url;
      },
      (error) => {
        console.error('Error al obtener la imagen del gato:', error);
      }
    );
  }
}
