import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDTO } from './models/order';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(protected http: HttpClient) {}

  public list(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(`${environment.apiEndpoint}/orders`);
  }

  public place(order: OrderDTO): Observable<OrderDTO> {
    return this.http.post<OrderDTO>(`${environment.apiEndpoint}/orders/place`, {
      account: {
        accountNumber: order.account.accountNumber,
        emailAddress: order.account.emailAddress,
        name: order.account.name,
      },
      destinationId: order.destination.id,
      dimensions: `${order.dimensions.length},${order.dimensions.width},${order.dimensions.height}`,
      sourceId: order.source.id,
      weight: order.weight,
    });
  }
}
