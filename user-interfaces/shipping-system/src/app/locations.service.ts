import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Location } from './models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor() { }

  public list(): Observable<Location[]> {
    return of([
      new Location(null, null, null, 'Hello'),
    ]);
  }

}
