import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineOrderingComponent } from './online-ordering/online-ordering.component';
import { OrderRoutes } from './orders.routing.module';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    OnlineOrderingComponent
  ],
  imports: [
    RouterModule.forChild(OrderRoutes),
    CommonModule,
    MatCardModule
  ]
})


export class OrdersModule { }
