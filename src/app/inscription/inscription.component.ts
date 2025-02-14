import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  public email:string="";
  public password:string="";
  private auth = inject(Auth);

  public createUser(email:string, password:string) {
    createUserWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage);
    });
  }
}
