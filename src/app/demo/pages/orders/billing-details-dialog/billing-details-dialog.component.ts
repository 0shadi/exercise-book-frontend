import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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


  constructor(
    private fb : FormBuilder,
  ){
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

  onSubmit(){
    console.log('Billing details submitted:', this.billingDetailsForm.value);
    this.dialogRef.close(this.billingDetailsForm.value); // send data back
  }

  onCancel() {
    this.dialogRef.close(); // close without data
  }
}
