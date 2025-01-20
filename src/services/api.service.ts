import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../app/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { }

  private apiUrl:string ="https:///api/v1"

  public getPlantes():Observable<Plant> {
    return this.http.get<Plant>(this.apiUrl+'/plants?token=7OsJxKqb97ZVo_yNHR11KHoX1hJ78GnSpwQLsl8Ta9M');
  }

}

