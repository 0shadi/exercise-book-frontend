import { Routes } from '@angular/router';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { ItemRegistrationComponent } from './item-registration/item-registration.component';
import { SupplierRegistrationComponent } from './supplier-registration/supplier-registration.component';
import { SellingItemRegistrationComponent } from './selling-item-registration/selling-item-registration.component';


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
              },
              {
                path: 'supplier-registration',
                component: SupplierRegistrationComponent
              },
              {
                path: 'selling-item-registration',
                component: SellingItemRegistrationComponent
              },
]}
   
];
