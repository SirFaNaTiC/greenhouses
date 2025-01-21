import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Plant } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'greenhouses';

  public myPlant?: Plant[];

  constructor(private api: ApiService) {}
  
  public ngOnInit() {
    this.api.getPlant("beach strawberry").subscribe((plt) => {
      this.myPlant = plt
      console.log(this.myPlant);
    });
  }
}
