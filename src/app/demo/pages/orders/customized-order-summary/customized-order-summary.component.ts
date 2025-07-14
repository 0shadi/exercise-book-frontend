import { Component } from '@angular/core';
import { PrintService } from '../../reports/Static Report/app/services/print.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customized-order-summary',
  standalone: false,
  templateUrl: './customized-order-summary.component.html',
  styleUrl: './customized-order-summary.component.scss'
})
export class CustomizedOrderSummaryComponent {
  orderDetails:any;
  formData:any;
  totalCostPerBook;


  constructor(
    private router: Router,
    private printService: PrintService,
  ){
    const navigation = this.router.getCurrentNavigation();
    this.orderDetails = navigation?.extras?.state?.['orderDetails'];
    this.formData = navigation?.extras?.state?.['bookDetails'];
    this.totalCostPerBook= navigation?.extras?.state?.['totalCostPerBook'];

    console.log('orderDetails received :',this.orderDetails,'bookDEtails', this.formData);
  }

   printInvoice(){

  }

}
