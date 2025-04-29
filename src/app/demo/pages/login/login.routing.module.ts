import { Routes } from '@angular/router';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';

export const LoginRoutes: Routes = [
    {
        path: '',
        children: [
            {
            path: 'employee-login',
            component: EmployeeLoginComponent
            }
]}    
    
];

