import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Plant } from '../app/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { }

  private apiUrl:string ="https://trefle.io/api/v1"

  public getPlant(common_name: string): Observable<Plant[]> {
    const urlrequete:string = this.apiUrl+'/plants?token=7OsJxKqb97ZVo_yNHR11KHoX1hJ78GnSpwQLsl8Ta9M&filter%5Bcommon_name%5D='+common_name
    return this.http.post<{data: Plant[]}>(
      'https://us-central1-testeilco2024.cloudfunctions.net/callAPI',
      { url :urlrequete }
    ).pipe(map(response => response.data));
  }

  public getPlantByScientificName(scientific_name: string): Observable<Plant[]> {
    const urlrequete:string = this.apiUrl+'/plants?token=7OsJxKqb97ZVo_yNHR11KHoX1hJ78GnSpwQLsl8Ta9M&filter%5Bscientific_name%5D='+scientific_name
    return this.http.post<{data: Plant[]}>(
      'https://us-central1-testeilco2024.cloudfunctions.net/callAPI',
      { url :urlrequete }
    ).pipe(map(response => response.data));
  }

  public getPlantByID(id: number): Observable<Plant[]> {
    const urlrequete:string = this.apiUrl+'/plants/'+id+'?token=7OsJxKqb97ZVo_yNHR11KHoX1hJ78GnSpwQLsl8Ta9M'
    return this.http.post<{data: Plant[]}>(
      'https://us-central1-testeilco2024.cloudfunctions.net/callAPI',
      { url :urlrequete }
    ).pipe(map(response => response.data));
  }

  public getPlantAll(): Observable<Plant[]> {
    const urlrequete:string = this.apiUrl+'/plants?token=7OsJxKqb97ZVo_yNHR11KHoX1hJ78GnSpwQLsl8Ta9M'
    return this.http.post<{data: Plant[]}>(
      'https://us-central1-testeilco2024.cloudfunctions.net/callAPI',
      { url :urlrequete }
    ).pipe(map(response => response.data));
  }

}

