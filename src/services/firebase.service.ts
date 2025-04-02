import { inject, Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { arrayUnion, doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { Favorites, Greenhouse } from '../app/models';

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
                        const newUserData = { 
                            uid: authUser.uid
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
    auth(auth: any) {
        throw new Error('Method not implemented.');
    }

    public createGreenhouse(name: string): void {
        console.log(this.firestore)
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

    public addPlantToGreenhouse(name: string, id: number): void {
        user(this.auths).pipe(
            switchMap(authUser => {
                if (!authUser?.uid) {
                    return of(null);
                }

                const greenhouseDocRef = doc(this.firestore, `Users/${authUser.uid}/Greenhouses/${name}`);
    
                const plantToAdd = {id: id};
    
                return from(updateDoc(greenhouseDocRef, {
                    plants: arrayUnion(plantToAdd),
                })).pipe();
            }),
            catchError(error => {
                console.error('Error adding plant to greenhouse', error);
                return of(null);
            })
        ).subscribe();
    }

    public addPlantToFavorites(id: number): void {
        user(this.auths).pipe(
            switchMap(authUser => {
                if (!authUser?.uid) {
                    return of(null);
                }

                const greenhouseDocRef = doc(this.firestore, `Users/${authUser.uid}/Favoris/${authUser.uid}`);
    
                const plantToAdd = {id: id};
    
                return from(updateDoc(greenhouseDocRef, {
                    plants: arrayUnion(plantToAdd)
                })).pipe();
            }),
            catchError(error => {
                console.error('Error adding plant to greenhouse', error);
                return of(null);
            })
        ).subscribe();
    }

    public getGreenhouse(name: string): Observable<Greenhouse | null> {
        return this.currentUser.pipe(
          switchMap(user => {
            if (!user?.uid) {
              return of(null);
            }
            const greenhouseRef = doc(this.firestore, `Users/${user.uid}/Greenhouses/${name}`);
            return from(getDoc(greenhouseRef)).pipe(
              map(docSnapshot => {
                if (docSnapshot.exists()) {
                  return { id: docSnapshot.id, ...docSnapshot.data() } as Greenhouse;
                } else {
                  return null;
                }
              }),
              catchError(error => {
                console.error("Error fetching greenhouse:", error);
                return of(null);
              })
            );
          })
        );
    }

    public getFavoris(): Observable<Favorites | null> {
        return this.currentUser.pipe(
          switchMap(user => {
            if (!user?.uid) {
              console.log('No user logged in');
              return of(null);
            }
            
            const favorisRef = doc(this.firestore, `Users/${user.uid}/Favoris/${user.uid}`);
            return from(getDoc(favorisRef)).pipe(
              map(docSnapshot => {
                if (docSnapshot.exists()) {
                  const data = docSnapshot.data();
                  console.log('Favoris found:', data);
                  return { id: docSnapshot.id, ...docSnapshot.data() } as Favorites;
                } else {
                  console.log('No favoris document found');
                    return null;
                }
              }),
              catchError(error => {
                console.error('Error fetching favoris:', error);
                return of(null);
              })
            );
          })
        );
      }
    
      public removePlantFromFavorites(plantId: number): Promise<void> {
        return this.currentUser.pipe(
          switchMap(user => {
            if (!user?.uid) {
              throw new Error('No user logged in');
            }
            
            const favorisRef = doc(this.firestore, `Users/${user.uid}/Favoris/${user.uid}`);
            return from(getDoc(favorisRef)).pipe(
              switchMap(docSnapshot => {
                if (docSnapshot.exists()) {
                  const data = docSnapshot.data() as Favorites;
                  const updatedPlants = data.plants.filter(plant => plant.id !== plantId);
                  return from(updateDoc(favorisRef, { 
                    plants: updatedPlants
                  }));
                }
                return of(void 0);
              })
            );
          })
        ).toPromise();
      }

      public removePlantFromGreenhouses(name: string , plantId: number): Promise<void> {
        return this.currentUser.pipe(
          switchMap(user => {
            if (!user?.uid) {
              throw new Error('No user logged in');
            }
            
            const favorisRef = doc(this.firestore, `Users/${user.uid}/Greenhouses/${name}`);
            return from(getDoc(favorisRef)).pipe(
              switchMap(docSnapshot => {
                if (docSnapshot.exists()) {
                  const data = docSnapshot.data() as Favorites;
                  const updatedPlants = data.plants.filter(plant => plant.id !== plantId);
                  return from(updateDoc(favorisRef, { 
                    plants: updatedPlants
                  }));
                }
                return of(void 0);
              })
            );
          })
        ).toPromise();
      }
      

}