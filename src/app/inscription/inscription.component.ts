import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  public email:string="";
  public password:string="";
  public message:string="";
  constructor(private AuthService: AuthService, private router : Router) {}
  public loggin(email: string,password : string){
    this.AuthService.createUser(email, password).then((userCredential) => {
      userCredential.user;
      this.router.navigate(['/main-page']);
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode,errorMessage);
          this.handleError(error);
      });
  }

  async signInWithGoogle() {
    try {
      await this.AuthService.signInWithGoogle();
      this.router.navigate(['/greenhouses']);
    } catch (error: any) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.message = "Un compte existe déjà avec cet email.";
        break;
      case 'auth/invalid-email':
        this.message = "L'adresse email n'est pas valide.";
        break;
      case 'auth/user-not-found':
        this.message = "Aucun utilisateur trouvé avec cet email.";
        break;
      case 'auth/wrong-password':
        this.message = "Mot de passe incorrect.";
        break;
      case 'auth/too-many-requests':
        this.message = "Trop de tentatives. Réessayez plus tard.";
        break;
      default:
        this.message = "Une erreur est survenue : " + error.message;
    }
  }
}