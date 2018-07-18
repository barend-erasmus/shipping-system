import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../locations.service';
import { Location } from '../models/location';
import { OrderDTO } from '../models/order';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public locations: Location[] = [];

  public orders: OrderDTO[] = [];

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(
    protected locationsService: LocationsService,
  ) { }

  public ngOnInit(): void {
    this.loadLocations();
  }

  protected loadLocations(): void {
    this.locationsService.list().subscribe((locations: Location[]) => {
      this.locations = locations;
    });
  }

  protected loadOrders(): void {

  }
}
