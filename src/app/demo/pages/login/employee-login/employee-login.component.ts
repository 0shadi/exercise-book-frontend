import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-login',
  standalone: false,
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.scss'
})
export class EmployeeLoginComponent {
  employeeLoginForm : FormGroup;

  constructor(
    private fb : FormBuilder,
  ){
    this.employeeLoginForm= this.fb.group({
      employeeName: new FormControl(''),
      userName: new FormControl(''),
      password: new FormControl('')
    });

  }

  onSubmit(){}

}
