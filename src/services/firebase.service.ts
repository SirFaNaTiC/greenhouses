import { inject, Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { catchError, from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    private auths = inject(Auth);
    public connect:boolean = true;
    private firestore = inject(Firestore);
    public currentUser = user(this.auths);

    public checkAndCreateUser(): void {
        user(this.auths).pipe(
            switchMap(authUser => {
                if (!authUser?.uid) {
                    return of(null);
                }
                const userRef = doc(this.firestore, `Users/${authUser.uid}`);
                return from(getDoc(userRef)).pipe(
                    switchMap(userDoc => {
                        if (userDoc.exists()) {
                            return of(userDoc.data());
                        }
                        const newUserData = { uid: authUser.uid};
                        return from(setDoc(userRef, newUserData)).pipe();
                    })
                );
            }),
            catchError(error => {
                console.error('Error checking user', error);
                return of(null);
            })
        ).subscribe(
        );
    }
    auth(auth: any) {
        throw new Error('Method not implemented.');
    }

    public createGreenhouses(): void {
        user(this.auths).pipe(
            switchMap(authUser => {
                if (!authUser?.uid) {
                    return of(null);
                }

                const greenhouseDocRef = doc(this.firestore, `Users/${authUser.uid}/Greenhouses/${authUser.uid}`);
    
                const newGreenhouseData = { 
                    id:authUser.uid,

                };
    
                return from(setDoc(greenhouseDocRef, newGreenhouseData)).pipe();
            }),
            catchError(error => {
                console.error('Error checking user', error);
                return of(null);
            })
        ).subscribe();
    }

    public createGreenhouse(name: string): void {
        user(this.auths).pipe(
            switchMap(authUser => {
                if (!authUser?.uid) {
                    return of(null);
                }

                const greenhouseDocRef = doc(this.firestore, `Users/${authUser.uid}/Greenhouses/${name}`);
    
                const newGreenhouseData = { 
                    id:authUser.uid,
                    name : name,
                    plants: [],
                };
    
                return from(setDoc(greenhouseDocRef, newGreenhouseData)).pipe();
            }),
            catchError(error => {
                console.error('Error checking user', error);
                return of(null);
            })
        ).subscribe();
    }

    public CheckAndCreateFavoris(): void {
        user(this.auths).pipe(
            switchMap(authUser => {
                if (!authUser?.uid) {
                    return of(null);
                }
                const userRef = doc(this.firestore, `Users/${authUser.uid}/Favoris/${authUser.uid}`);
                return from(getDoc(userRef)).pipe(
                    switchMap(userDoc => {
                        if (userDoc.exists()) {
                            return of(userDoc.data());
                        }
                        const newUserData = { 
                            uid: authUser.uid,
                            plants: [],
                        };
                        return from(setDoc(userRef, newUserData)).pipe();
                    })
                );
            }),
            catchError(error => {
                console.error('Error checking user', error);
                return of(null);
            })
        ).subscribe(
        );
    }
}