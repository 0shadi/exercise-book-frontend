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
import { BillingDetailsDialogComponent } from './billing-details-dialog/billing-details-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { CustomizedOrderListComponent } from './customized-order-list/customized-order-list.component';
import { CustomizedOrderCheckoutComponent } from './customized-order-checkout/customized-order-checkout.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatNativeDateModule } from '@angular/material/core';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { MatDividerModule } from '@angular/material/divider';
import { CustomizedOrderSummaryComponent } from './customized-order-summary/customized-order-summary.component';

@NgModule({
  declarations: [
    OnlineOrderingComponent, 
    ItemDetailsComponent, 
    CheckoutComponent, 
    BookCustomizeComponent,
    OrderListComponent,
    BillingDetailsDialogComponent,
    CustomizedOrderListComponent,
    CustomizedOrderCheckoutComponent,
    OrderSummaryComponent,
    CustomizedOrderSummaryComponent
  ],
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
    MatSelectModule,
    MatDialogModule,
    MatDatepicker,
    MatDatepickerModule,
    MatGridListModule,
    MatNativeDateModule,
    MatDividerModule
  ]
})
export class OrdersModule {}
