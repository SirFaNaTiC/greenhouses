import { Component, inject } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent {

  public connect:boolean = true;
  public email:string="";
  public password:string="";
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription | undefined;

  public verifyuser(email:string, password:string) {
    signInWithEmailAndPassword(this.auth ,email, password)
    .then((userCredential) => {
      this.connect = false;
      console.log("Utilisateur connecté:", userCredential.user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage);
    });
  }

}
