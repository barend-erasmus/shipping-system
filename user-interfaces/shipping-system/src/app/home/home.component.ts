import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../locations.service';
import { Location } from '../models/location';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public locations: Location[] = [];

  constructor(
    protected locationsService: LocationsService,
  ) { }

  public ngOnInit(): void {
    this.loadLocations();
  }

  protected loadLocations(): void {
    this.locationsService.list().subscribe((locations: Location[]) => {
      this.locations = locations;

      console.log(this.locations);
    });
  }
}
