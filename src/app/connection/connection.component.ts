import { Component, inject } from '@angular/core';
import { Auth, authState, user} from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})

export class ConnectionComponent {

  public connect:boolean = true;
  public email:string="";
  public password:string="";
  public message: string="";
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription | undefined;

  constructor(private AuthService: AuthService, private router : Router) {}
  public connection(email: string,password : string){
    this.AuthService.verifyuser(email, password).then(user=>{
      if (user){
        this.router.navigate(['/main-page'])
        console.log('Utilisateur : ',user)
      }
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
