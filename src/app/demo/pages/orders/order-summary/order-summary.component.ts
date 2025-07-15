import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrintService } from '../../reports/Static Report/app/services/print.service';

@Component({
  selector: 'app-order-summary',
  standalone: false,
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  orderDetails;
  orderItemDetails;
  
  displayedColumns: string[] = ['product', 'quantity','subTotal'];
  dataSource:any[] = [];

  constructor(
    private router: Router,
    private printService: PrintService,
  ){
    const navigation = this.router.getCurrentNavigation();
    this.orderDetails = navigation?.extras?.state?.['orderDetails'];
    this.orderItemDetails = navigation?.extras?.state?.['orderItemDetails'];
    this.dataSource = this.orderItemDetails;
  }

  printInvoice(){
    window.print();
  }


}
