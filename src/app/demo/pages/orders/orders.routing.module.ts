import { Routes } from '@angular/router';
import { OnlineOrderingComponent } from './online-ordering/online-ordering.component';

export const OrderRoutes: Routes = [
    {
        path: '',
        children: [
            {
            path: 'online-ordering',
            component: OnlineOrderingComponent
            },
]} 
];

