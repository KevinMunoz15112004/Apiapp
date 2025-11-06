import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private authService: AuthService,  private menuCtrl: MenuController) { 
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.menuCtrl.enable(isAuth);
    });
  }

  logout() {
    this.authService.logout();
  }

}
