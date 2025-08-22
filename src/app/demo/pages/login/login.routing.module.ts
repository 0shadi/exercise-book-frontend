import { Routes } from '@angular/router';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';

export const LoginRoutes: Routes = [
    {
        path: '',
        children: [
            {
            path: 'employee-login',
            component: EmployeeLoginComponent
            },
            {
            path: 'customer-login',
            component: CustomerLoginComponent
            }
]}    
    
];

