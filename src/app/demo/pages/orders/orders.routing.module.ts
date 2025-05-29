import { Routes } from '@angular/router';
import { OnlineOrderingComponent } from './online-ordering/online-ordering.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BookCustomizeComponent } from './book-customize/book-customize.component';
import { OrderListComponent } from './order-list/order-list.component';
import { CustomizedOrderListComponent } from './customized-order-list/customized-order-list.component';

export const OrderRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'online-ordering',
        component: OnlineOrderingComponent
      },
      {
        path: 'item-details/:id',
        component: ItemDetailsComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'book-customize',
        component: BookCustomizeComponent
      },
      {
        path: 'order-list',
        component: OrderListComponent
      },
      {
        path: 'customized-order-list',
        component: CustomizedOrderListComponent
      }
    ]
  }
];
