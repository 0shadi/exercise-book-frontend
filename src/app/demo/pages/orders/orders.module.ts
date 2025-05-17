import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineOrderingComponent } from './online-ordering/online-ordering.component';
import { OrderRoutes } from './orders.routing.module';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BookCustomizeComponent } from './book-customize/book-customize.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { OrderListComponent } from './order-list/order-list.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [OnlineOrderingComponent, ItemDetailsComponent, CheckoutComponent, BookCustomizeComponent,OrderListComponent],
  imports: [
    RouterModule.forChild(OrderRoutes),
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatRadioModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class OrdersModule {}
