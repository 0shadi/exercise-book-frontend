import { Routes } from '@angular/router';
import { OnlineOrderingComponent } from './online-ordering/online-ordering.component';
import { BookCustomizeComponent } from './book-customize/book-customize.component';

export const OrderRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'online-ordering',
        component: OnlineOrderingComponent
      },
      {
        path: 'book-customize',
        component: BookCustomizeComponent
      }
    ]
  }
];
