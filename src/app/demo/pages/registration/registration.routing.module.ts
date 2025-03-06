import { Routes } from '@angular/router';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { ItemRegistrationComponent } from './item-registration/item-registration.component';


export const RegistrationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'employee-registration',
                component: EmployeeRegistrationComponent
              },

              {
                path: 'customer-registration',
                component: CustomerRegistrationComponent
              },
              {
                path: 'item-registration',
                component: ItemRegistrationComponent
              }
]}
   
];
