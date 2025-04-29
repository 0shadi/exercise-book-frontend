import { Routes } from '@angular/router';
import { OnlineOrderingComponent } from './online-ordering/online-ordering.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const OrderRoutes: Routes = [
    {
        path: '',
        children: [
            {
            path: 'online-ordering',
            component: OnlineOrderingComponent
            },
            {
            path: 'item-details',
            component: ItemDetailsComponent
            },
            {
            path: 'checkout',
            component: CheckoutComponent
            }
]} 
];

