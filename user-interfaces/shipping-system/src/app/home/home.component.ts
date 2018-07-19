import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../locations.service';
import { Location } from '../models/location';
import { OrderDTO } from '../models/order';
import { OrdersService } from '../orders.service';
import { AccountDTO } from '../models/account';
import { DimensionsDTO } from '../models/dimensions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public locations: Location[] = [];

  // tslint:disable-next-line:max-line-length
  public order: OrderDTO = new OrderDTO(null, new AccountDTO(null, null, null), null, null, null, null, null, null, null, null, null, null, new DimensionsDTO(null, null, null, null), null, null);

  public orders: OrderDTO[] = [];

  public displayedColumns: string[] = ['collectionTimestamp', 'deliveryTimestamp', 'source.name', 'destination.name', 'state'];

  constructor(
    protected locationsService: LocationsService,
    protected ordersService: OrdersService,
  ) { }

  public ngOnInit(): void {
    this.loadLocations();
    this.loadOrders();
  }

  public onClickPlace(): void {
    this.ordersService.place(this.order).subscribe(() => {
      // tslint:disable-next-line:max-line-length
      this.order = new OrderDTO(null, new AccountDTO(null, null, null), null, null, null, null, null, null, null, null, null, null, new DimensionsDTO(null, null, null, null), null, null);

      this.loadOrders();
    });
  }

  protected loadLocations(): void {
    this.locationsService.list().subscribe((locations: Location[]) => {
      this.locations = locations.slice(0, 10);
    });
  }

  protected loadOrders(): void {
    this.ordersService.list().subscribe((orders: OrderDTO[]) => {
      this.orders = orders;
    });
  }
}
