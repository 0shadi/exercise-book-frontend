import { Component } from '@angular/core';

export interface PeriodicElement {
  product: string;
  subTotal: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {product: 'Book', subTotal: 'Rs. 100'},
  {product: 'Paper', subTotal: 'Rs.50'},
];

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  displayedColumns: string[] = ['product', 'subTotal'];
  dataSource = ELEMENT_DATA;
}
