import { Component, OnInit } from '@angular/core';
import { OnlineOrderingService } from 'src/app/services/online-ordering/online-ordering.service';

export interface PeriodicElement {
  product: string;
  subTotal: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { product: 'Book', subTotal: 'Rs. 100' },
  { product: 'Paper', subTotal: 'Rs.50' }
];

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  displayedColumns: string[] = ['product', 'subTotal'];
  dataSource = ELEMENT_DATA;
  orderItems: any;

  constructor(private onlineOrderingService: OnlineOrderingService) {}

  ngOnInit(): void {
    this.onlineOrderingService.cartItems.subscribe((items) => {
      this.orderItems = items;

      console.log(items); // set these items in order details box
    });
  }
}
