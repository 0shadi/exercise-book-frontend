import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineOrderingComponent } from './online-ordering/online-ordering.component';
import { OrderRoutes } from './orders.routing.module';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    OnlineOrderingComponent,
    ItemDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    RouterModule.forChild(OrderRoutes),
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatRadioModule
  ]
})


export class OrdersModule { }
