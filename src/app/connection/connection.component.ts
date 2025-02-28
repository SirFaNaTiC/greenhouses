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
      if (errorCode == "auth/invalid-credential"){
        this.message = "Mauvais identifiants"
      }
  });
  }
}
