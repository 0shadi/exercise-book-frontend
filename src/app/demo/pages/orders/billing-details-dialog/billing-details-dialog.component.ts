import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-billing-details-dialog',
  standalone: false,
  templateUrl: './billing-details-dialog.component.html',
  styleUrl: './billing-details-dialog.component.scss'
})
export class BillingDetailsDialogComponent {
  billingDetailsForm : FormGroup;
  private dialogRef = inject(MatDialogRef<BillingDetailsDialogComponent>);
  submitted = false;

  constructor(
    private fb : FormBuilder,
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
  }

  onSubmit(){
    this.submitted=true;
    if(this.billingDetailsForm.invalid){
        return;
      }
    console.log('Billing details submitted:', this.billingDetailsForm.value);
    this.dialogRef.close(this.billingDetailsForm.value); // send data back
  }

  onCancel() {
    this.dialogRef.close(); // close without data
  }
}
