import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private fb : FormBuilder,
    private router: Router
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
  }

  placeOrder(){

  }
}
