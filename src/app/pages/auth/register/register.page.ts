import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertController, LoadingController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterLink
  ],
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      await this.authService.register(
        this.credentials.value.email,
        this.credentials.value.password
      );
      
      await loading.dismiss();
      
      const alert = await this.alertController.create({
        header: 'Registro exitoso',
        message: 'Se ha enviado un correo de verificación a su email. Por favor verifique su cuenta antes de iniciar sesión.',
        buttons: ['OK']
      });
      await alert.present();
      
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Error en el registro',
        message: 'Hubo un problema al crear la cuenta. Por favor intente de nuevo.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  get confirmPassword() {
    return this.credentials.get('confirmPassword');
  }
}