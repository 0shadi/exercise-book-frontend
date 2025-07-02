import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookCustomizeService } from 'src/app/services/book-customize/book-customize.service';
import { HttpService } from 'src/app/services/http.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';

@Component({
  selector: 'app-customized-order-checkout',
  standalone: false,
  templateUrl: './customized-order-checkout.component.html',
  styleUrl: './customized-order-checkout.component.scss'
})
export class CustomizedOrderCheckoutComponent {
  billingDetailsForm : FormGroup;
  paymentForm: FormGroup;
  submitted = false;
  bookDetails: any;
  selectedPaymentMethod:string;
  userId = null;
  coverPhotoFile;

  constructor(
    private fb : FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private bookCustomizeService: BookCustomizeService,
    private messageService:MessageServiceService,
  ){
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

    const navigation = this.router.getCurrentNavigation();
    this.bookDetails = navigation?.extras?.state?.['book'];
    this.coverPhotoFile = navigation?.extras?.state?.['coverPhotoFile']; 
    this.setUserId();
  }

  public setUserId(): void {
    this.userId = this.httpService.getUserId();
    console.log('user id' ,this.userId);
  }

  placeOrder(){
    this.submitted=true;
    if(this.billingDetailsForm.invalid || 
      !this.selectedPaymentMethod || 
      (this.selectedPaymentMethod === '2' && this.paymentForm.invalid)){
        return;
      }
    
    const cost = 'Rs. ';
    const orderDetails = {
      date: new Date().toISOString(),
      cost: cost.toString(),
      paymentMethod: this.selectedPaymentMethod,
      orderStatus: 'Pending',
      customerId: this.userId
    };

    this.bookCustomizeService.saveOrderDetails(orderDetails).subscribe({
          next:(datalist:any)=>{
            if(!datalist || !datalist.orderId){
              return;
            }
            const savedOrderId = datalist.orderId; 
            console.log("Submitted Order Details",datalist);

            const formData = new FormData();
            formData.append('coverPhoto', this.coverPhotoFile); // File from file input

            // Append the book details object as a JSON blob
            const bookDetailsWithOrderId = { ...this.bookDetails, orderId: savedOrderId };
            formData.append('bookForm', new Blob([JSON.stringify(bookDetailsWithOrderId)], { type: 'application/json' }));
              
            this.bookCustomizeService.saveBookDetails(formData).subscribe({
              next:(datalist:any[])=>{
                if(datalist.length <= 0){
                  return;
                }
                console.log("Submitted Customization Details",datalist);
                
              },
              error:(error)=>{
                this.messageService.showError('Action failed with error ' + error);
              }
            
            });

            const billingDataWithOrderId = { ...this.billingDetailsForm.value, orderId: savedOrderId };

            this.bookCustomizeService.saveBillingDetails(billingDataWithOrderId).subscribe({
              next:(datalist:any[])=>{
                if(datalist.length <= 0){
                  return;
                }
                
                console.log('Submitted billing details:', datalist);
                
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
