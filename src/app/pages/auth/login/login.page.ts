import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertController, LoadingController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        RouterLink
    ],
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {
    credentials: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private loadingController: LoadingController,
        private alertController: AlertController,
        private router: Router
    ) {
        this.credentials = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    async login() {
        const loading = await this.loadingController.create();
        await loading.present();

        try {
            await this.authService.login(
                this.credentials.value.email,
                this.credentials.value.password
            );
            await loading.dismiss();
            this.router.navigate(['/home']);
        } catch (error: any) {
            await loading.dismiss();

            let message = 'Ocurrió un error inesperado.';

            if (typeof error === 'string') {
                message = error;
            }
        
            else if (error?.message) {
                if (error.message === 'EMAIL_NOT_VERIFIED') {
                    message = 'Debe verificar su correo antes de iniciar sesión.';
                } else {
                    message = error.message;
                }
            }

            const alert = await this.alertController.create({
                header: 'Error al iniciar sesión',
                message: message,
                buttons: ['OK'],
            });
            await alert.present();
        }
    }

    async forgotPassword() {
        const alert = await this.alertController.create({
            header: 'Recuperar contraseña',
            message: 'Ingrese su correo electrónico para recibir un enlace de recuperación',
            inputs: [
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                },
                {
                    text: 'Enviar',
                    handler: async (data) => {
                        try {
                            await this.authService.resetPassword(data.email);
                            const successAlert = await this.alertController.create({
                                header: 'Éxito',
                                message: 'Se ha enviado un enlace de recuperación a su correo',
                                buttons: ['OK']
                            });
                            await successAlert.present();
                        } catch (error) {
                            const errorAlert = await this.alertController.create({
                                header: 'Error',
                                message: 'No se pudo enviar el correo de recuperación',
                                buttons: ['OK']
                            });
                            await errorAlert.present();
                        }
                    }
                }
            ]
        });
        await alert.present();
    }

    get email() {
        return this.credentials.get('email');
    }

    get password() {
        return this.credentials.get('password');
    }
}