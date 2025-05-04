import { Component, OnInit } from '@angular/core';
import { OnlineOrderingService } from 'src/app/services/online-ordering/online-ordering.service';
import { FormBuilder,FormGroup, FormControl } from '@angular/forms';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

export interface PeriodicElement {
  product: string;
  subTotal: string;
}

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  billingDetailsForm : FormGroup;

  displayedColumns: string[] = ['product', 'quantity','subTotal'];
  dataSource:any[] = [];
  orderItems: any;
  selectedPaymentMethod:string;

  constructor(
    private onlineOrderingService: OnlineOrderingService,
    private fb : FormBuilder,
    private messageService : MessageServiceService,
    private checkoutService : CheckoutService
  ) {
    this.billingDetailsForm= this.fb.group({
      orderId: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormControl(''),
      district: new FormControl(''),
      nearestCity: new FormControl(''),
      postalCode: new FormControl(''),
      contactNo: new FormControl(''),
      email: new FormControl(''),
      notes: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.onlineOrderingService.cartItems.subscribe((items) => {
      this.orderItems = items;

      console.log(items); // set these items in order details box
      this.dataSource = this.orderItems;
    });
  }

  getTotalCost() {
    return this.dataSource
      .reduce((acc, item) => acc + (Number(item.itemPrice) * Number(item.ordQty)), 0);
  }

  placeOrder(){
    const totalCost = this.getTotalCost();
    const paymentMethod = this.selectedPaymentMethod;
    

    this.checkoutService.saveBillingDetails(this.billingDetailsForm.value).subscribe({
      next:(datalist:any[])=>{
        if(datalist.length <= 0){
          return;
        }
        // console.log("itemName",this.orderItems);
        console.log("Submitted values",datalist);
      },
      error:(error)=>{
        this.messageService.showError('Action failed with error ' + error);
      }
      
    });

    this.orderItems.forEach((item: any) => {
      const orderDetails = {
        itemId: item.itemId,
        itemName: item.itemName,
        ordQty: item.ordQty,
        totalCost: totalCost.toString(),
        paymentMethod: paymentMethod,
        
      };

    this.checkoutService.saveOrderDetails(orderDetails).subscribe({
      next:(datalist:any[])=>{
        if(datalist.length <= 0){
          return;
        }
        console.log("Submitted values",datalist);
        
      },
      error:(error)=>{
        this.messageService.showError('Action failed with error ' + error);
      }
      
    });
  });

  this.messageService.showSuccess('Order Placed Successfully');
  }
}


