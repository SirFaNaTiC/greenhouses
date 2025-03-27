import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth/firebase';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {

  constructor(private auth: AuthService) {}
  
  ngOnInit() {
    
  }

}
