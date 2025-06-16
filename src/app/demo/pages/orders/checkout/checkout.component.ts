import { Component, OnInit } from '@angular/core';
import { OnlineOrderingService } from 'src/app/services/online-ordering/online-ordering.service';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { HttpService } from 'src/app/services/http.service';

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
  paymentForm: FormGroup;

  displayedColumns: string[] = ['product', 'quantity','subTotal'];
  dataSource:any[] = [];
  orderItems: any;
  selectedPaymentMethod:string;
  submitted = false;
  userId = null;

  constructor(
    private onlineOrderingService: OnlineOrderingService,
    private fb : FormBuilder,
    private messageService : MessageServiceService,
    private checkoutService : CheckoutService,
    private httpService: HttpService
  ) {
    this.billingDetailsForm= this.fb.group({
      orderId: new FormControl(''),
      firstName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern(/^[A-Za-z]+$/)]),
      lastName: new FormControl('',[Validators.minLength(3),Validators.maxLength(15),Validators.pattern(/^[A-Za-z]+$/)]),
      address: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]),
      district: new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z ]+$/)]),
      nearestCity: new FormControl('',[Validators.pattern(/^[A-Za-z ]+$/)]),
      postalCode: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{5}$/)]),
      contactNo: new FormControl('',[Validators.required,Validators.pattern(/^0?[1-9]\d-?\d{7}$/)]),
      email: new FormControl('',[Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      notes: new FormControl('',[Validators.maxLength(500)])
    });

    this.paymentForm= this.fb.group({
      name: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]),
      number: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{13,19}$/)]),
      expDate: new FormControl('',[Validators.required]),
      cvv: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{3,4}$/)])
    });
  }

  ngOnInit(): void {
    this.onlineOrderingService.cartItems.subscribe((items) => {
      
      this.orderItems = items.map((item: any) => ({
        ...item,
        subTotal: Number(item.itemPrice) * Number(item.ordQty)
      }));

      console.log(items); // set these items in order details box
      this.dataSource = this.orderItems;
    });

    this.setUserId();
  }

  public setUserId(): void {
    this.userId = this.httpService.getUserId();
    console.log('user id' ,this.userId);
  }

  getTotalCost() {
    return this.dataSource
      .reduce((acc, item) => acc + (Number(item.itemPrice) * Number(item.ordQty)), 0);
  }

  placeOrder(){
    this.submitted=true;
    if(this.billingDetailsForm.invalid || 
      !this.selectedPaymentMethod || 
      (this.selectedPaymentMethod === '2' && this.paymentForm.invalid)){
        return;
      }
    const totalCost = this.getTotalCost();
    const paymentMethod = this.selectedPaymentMethod;
    

    this.checkoutService.saveBillingDetails(this.billingDetailsForm.value).subscribe({
      next:(datalist:any)=>{
        if(datalist.length <= 0){
          return;
        }
        const savedOrderId = datalist.orderId; 
        const customerId = datalist.customerId || '1';
        
        console.log("Submitted values",datalist);

        this.orderItems.forEach((item: any) => {
          const orderItemDetails = {
            itemId: item.itemId,
            itemName: item.itemName,
            itemPrice : item.itemPrice,
            ordQty: item.ordQty,
            subTotal: item.subTotal,
            orderId: savedOrderId
          };
    
        this.checkoutService.saveOrderItemDetails(orderItemDetails).subscribe({
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
      
      const orderStatus = 'Pending';
      const orderDetails = {
        orderId: savedOrderId,
        date: new Date().toISOString(),
        totalCost: totalCost.toString(),
        paymentMethod: paymentMethod,
        orderStatus: orderStatus,
        customerId: this.userId
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
      },
      error:(error)=>{
        this.messageService.showError('Action failed with error ' + error);
      }
      
    });

    

  this.messageService.showSuccess('Order Placed Successfully');

  
  }
}


