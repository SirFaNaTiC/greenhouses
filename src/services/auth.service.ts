import { inject, Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { catchError, from, of, switchMap, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    public email:string="";
    public password:string="";
    private auth = inject(Auth);
    public connect:boolean = true;
    private firestore = inject(Firestore);
    public currentUser = user(this.auth);

    public createUser(email:string, password:string) : Promise <UserCredential>{
        return createUserWithEmailAndPassword(this.auth, email, password)
    }

    public verifyuser(email:string, password:string) : Promise <UserCredential> {
        return signInWithEmailAndPassword(this.auth ,email, password)
    }

    public logOut(){
        signOut(this.auth).then(() => {
            console.log('User logged out');
        }).catch(error => {
            console.error('Logout Error', error);
        });
    }

    public checkAndCreateUser(): void {
        user(this.auth).pipe(
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

    public createGreenhouses(): void {
        user(this.auth).pipe(
            switchMap(authUser => {
                if (!authUser?.uid) {
                    return of(null);
                }
    
                // Référence au document dans la sous-collection 'Greenhouses'
                const greenhouseDocRef = doc(this.firestore, `Users/${authUser.uid}/Greenhouses/${authUser.uid}`);
    
                return from(getDoc(greenhouseDocRef)).pipe(
                    switchMap(greenhouseDoc => {
                        if (greenhouseDoc.exists()) {
                            return of(greenhouseDoc.data());
                        }
    
                        // Création d'un document "dummy" dans la sous-collection 'Greenhouses'
                        const newGreenhouseData = { d: authUser.uid };
    
                        return from(setDoc(greenhouseDocRef, newGreenhouseData)).pipe();
                    })
                );
            }),
            catchError(error => {
                console.error('Error checking user', error);
                return of(null);
            })
        ).subscribe();
    }
}
    


