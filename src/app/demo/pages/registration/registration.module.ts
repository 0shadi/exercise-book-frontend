import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutes } from './registration.routing.module';
import { RouterModule } from '@angular/router';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';


@NgModule({
  declarations: [EmployeeRegistrationComponent],
  imports: [
    RouterModule.forChild(RegistrationRoutes),
    CommonModule
  ]
})
export class RegistrationModule { }
