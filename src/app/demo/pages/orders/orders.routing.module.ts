import { Routes } from '@angular/router';
import { OnlineOrderingComponent } from './online-ordering/online-ordering.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

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
            }
]} 
];

