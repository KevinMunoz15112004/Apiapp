import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut,
    authState,
    User
} from '@angular/fire/auth';

import {
    Firestore,
    doc,
    setDoc,
    getDoc
} from '@angular/fire/firestore';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth: Auth = inject(Auth);
    private firestore: Firestore = inject(Firestore);
    private router: Router = inject(Router);

    authState$ = authState(this.auth);
    isAuthenticated$ = new BehaviorSubject<boolean>(false);

    constructor() {
        this.authState$.subscribe(user => {
            this.isAuthenticated$.next(!!user);
        });
    }
    async register(email: string, password: string): Promise<void> {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;

            if (!user) throw new Error('NO_USER');
            await setDoc(doc(this.firestore, `users/${user.uid}`), {
                uid: user.uid,
                email: email,
                createdAt: new Date(),
                verified: false
            });
            await sendEmailVerification(user);

            await this.router.navigate(['/login']);
        } catch (error) {
            throw this.mapAuthError(error);
        }
    }
    async login(email: string, password: string): Promise<void> {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                await this.logout();
                throw new Error('EMAIL_NOT_VERIFIED');
            }

        } catch (error: any) {
            if (error.message === 'EMAIL_NOT_VERIFIED') {
                throw error
            }
             console.log('Error original Firebase:', error);
            throw this.mapAuthError(error);
        }
    }
    async resetPassword(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(this.auth, email);
        } catch (error) {
            throw this.mapAuthError(error);
        }
    }

    get user(): User | null {
        return this.auth.currentUser;
    }
    async getUserData(uid: string): Promise<any> {
        const docRef = doc(this.firestore, `users/${uid}`);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    }

    async logout(): Promise<void> {
        await signOut(this.auth);
        this.router.navigate(['/login']);
    }

    private mapAuthError(error: any): Error {
        const code = error?.code;

        const errorMap: Record<string, string> = {
            'auth/email-already-in-use': 'El email ya está registrado.',
            'auth/invalid-email': 'El formato del correo no es válido.',
            'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
            'auth/user-not-found': 'No existe un usuario con ese correo.',
            'auth/invalid-credential': 'Credenciales inválidas. Por favor, inténtelo de nuevo.',
            'auth/wrong-password': 'Contraseña incorrecta.',
            'EMAIL_NOT_VERIFIED': 'Debe verificar su correo antes de iniciar sesión.'
        };
        const message = errorMap[code] || 'Ocurrió un error inesperado.';
        return new Error(message);
    }
}
