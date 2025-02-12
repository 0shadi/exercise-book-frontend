import { Routes } from '@angular/router';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';


export const RegistrationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'employee-registration',
                component: EmployeeRegistrationComponent
              },
]}
   
];
