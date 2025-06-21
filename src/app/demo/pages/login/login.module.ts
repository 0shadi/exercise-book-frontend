import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { RouterModule } from '@angular/router';
import { LoginRoutes } from './login.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CustomerLoginComponent } from './customer-login/customer-login.component';


@NgModule({
  declarations: [
    EmployeeLoginComponent,
    CustomerLoginComponent
  ],
  imports: [
    RouterModule.forChild(LoginRoutes),
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class LoginModule { }
