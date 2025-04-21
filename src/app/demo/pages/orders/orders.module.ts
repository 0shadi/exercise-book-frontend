import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineOrderingComponent } from './online-ordering/online-ordering.component';
import { OrderRoutes } from './orders.routing.module';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BookCustomizeComponent } from './book-customize/book-customize.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OnlineOrderingComponent, BookCustomizeComponent],
  imports: [RouterModule.forChild(OrderRoutes), CommonModule, MatCardModule, MatIconModule, FormsModule, ReactiveFormsModule]
})
export class OrdersModule {}
