import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  public email:string="";
  public password:string="";
  public message:string="";
  constructor(private AuthService: AuthService) {}
  public loggin(email: string,password : string){
    this.AuthService.createUser(email, password).then((userCredential) => {
      userCredential.user;
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode,errorMessage);
          if (errorCode == "auth/email-already-in-use"){
            this.message = "Email déjà utilisé - Connectez vous"
          }
      });
  }
}