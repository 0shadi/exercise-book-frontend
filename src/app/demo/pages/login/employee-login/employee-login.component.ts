import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface Employee {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-employee-login',
  standalone: false,
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.scss'
})

export class EmployeeLoginComponent {
  employeeLoginForm : FormGroup;

  employees: Employee[] = [
    {value: 'Employee-1', viewValue: 'Employee-1'},
    {value: 'Employee-2', viewValue: 'Employee-2'},
    {value: 'Employee-3', viewValue: 'Employee-3'},
  ];

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
