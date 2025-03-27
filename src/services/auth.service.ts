import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    public email:string="";
    public password:string="";
    private auth = inject(Auth);
    public connect:boolean = true;

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


}
