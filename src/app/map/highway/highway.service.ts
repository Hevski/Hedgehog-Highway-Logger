import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Highway } from './highway.model'

@Injectable({
  providedIn: 'root'
})
export class HighwayService {

  constructor(
    private http: HttpClient,
  ) { }

  addHighway(highway: Highway): Observable<any> {
    const endPoint = `${environment.API_URL}/highways`;
    return this.http.post<any>(endPoint, highway)
  }

  deleteHighway(): Observable<any> {
    const endPoint = `${environment.API_URL}/highways/id`;
    return this.http.delete<any>(endPoint)
  }

  getAllHighways(): Observable<any> {
    const endPoint = `${environment.API_URL}/highways`;
    return this.http.get<any>(endPoint);
  }

  getHighway(id): Observable<any> {
    const endPoint = `${environment.API_URL}/highways/${id}`
    return this.http.get<any>(endPoint);
  }
}
