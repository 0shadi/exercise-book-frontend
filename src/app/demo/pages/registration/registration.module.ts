import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutes } from './registration.routing.module';
import { RouterModule } from '@angular/router';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { MatSelectModule } from '@angular/material/select';
import { ItemRegistrationComponent } from './item-registration/item-registration.component';


@NgModule({
  declarations: [
    EmployeeRegistrationComponent,
    CustomerRegistrationComponent,
    ItemRegistrationComponent,
  ],
  imports: [
    RouterModule.forChild(RegistrationRoutes),
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    MatPaginator
  
  ],
  
})
export class RegistrationModule { }
