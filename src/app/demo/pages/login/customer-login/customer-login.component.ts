import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomerLoginService } from 'src/app/services/customer-login-service/customer-login.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';

@Component({
  selector: 'app-customer-login',
  standalone: false,
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.scss'
})
export class CustomerLoginComponent {
  customerLoginForm : FormGroup;

  constructor(
    private fb : FormBuilder,
    private customerLoginService: CustomerLoginService,
    private messageService: MessageServiceService
  ){
    this.customerLoginForm= this.fb.group({
      userName: new FormControl(''),
      password: new FormControl('')
    });

  }

  onSubmit(){
    this.customerLoginService.serviceCall(this.customerLoginForm.value).subscribe({
      next: (datalist:any[]) => {
        if(datalist.length<=0){
          return;
        }
        console.log("Login details submitted");
      
      this.messageService.showSuccess('Data Saved Successfully');
    },
      error: (error) => this.messageService.showError('Action failed with error ' + error)
    });
}
}
