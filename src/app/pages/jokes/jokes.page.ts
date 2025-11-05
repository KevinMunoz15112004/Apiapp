import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.page.html',
  styleUrls: ['./jokes.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule]
})
export class JokesPage implements OnInit {
  joke: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getNewJoke();
  }

  getNewJoke() {
    this.apiService.getJoke().subscribe(
      (response) => {
        this.joke = response;
      },
      (error) => {
        console.error('Error al obtener el chiste:', error);
      }
    );
  }
}
