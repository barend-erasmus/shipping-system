import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Location } from './models/location';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(
    protected http: HttpClient,
  ) {

   }

  public list(): Observable<Location[]> {
    return this.http.get<Location[]>(`${environment.apiEndpoint}/locations`);
  }

}
