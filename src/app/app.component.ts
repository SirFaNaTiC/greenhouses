import { Component, OnInit } from '@angular/core';
import { Plant } from './models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'greenhouses';

  public myPlant?: Plant;

  constructor(private apiService: ApiService) {}
  
  public ngOnInit() {
    console.log("test")
    this.apiService.getPlantes().subscribe((plt) => {
      this.myPlant = plt;
      console.log(plt);
    });
  }
}
