import { environment } from '../../../environments/environment';
import { MapService } from '../map.service';
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
    private mapService: MapService,
  ) { }

  addHighway(highway: Highway): Observable<any> {
    const endPoint = `${environment.API_URL}/highway`;
    return this.http.post<any>(endPoint, highway)
  }

  deleteHighway(): Observable<any> {
    const endPoint = `${environment.API_URL}/highway/id`;
    return this.http.delete<any>(endPoint)
  }
}
