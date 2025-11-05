import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.authState$.pipe(
        take(1),
        map(user => !!user && user.emailVerified),
        tap(isLoggedIn => {
            if (!isLoggedIn) {
                router.navigate(['/login']);
            }
        })
    );
};

export const publicGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.authState$.pipe(
        take(1),
        map(user => !(user && user.emailVerified)),
        tap(isLoggedOut => {
            if (!isLoggedOut) {
                router.navigate(['/home']);
            }
        })
    );
};