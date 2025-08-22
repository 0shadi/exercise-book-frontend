import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeListComponent } from './Static Report/app/components/employee-list/employee-list.component';
import { ReportsRoute } from './reports.routing.module';
import { LoadingSpinnerComponent } from './Static Report/app/components/loading-spinner/loading-spinner.component';
import { CustomerReportComponent } from './Static Report/app/components/customer-report/customer-report.component';
import { MonthlySalesComponent } from './Charts/monthly-sales/monthly-sales.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MonthlySalesIncomeComponent } from './Charts/monthly-sales-income/monthly-sales-income.component';
import { WeeklyOrderStatusComponent } from './Charts/weekly-order-status/weekly-order-status.component';
import { SalesPerItemComponent } from './Charts/sales-per-item/sales-per-item.component';

@NgModule({
  declarations: [
    EmployeeListComponent, 
    LoadingSpinnerComponent,
    CustomerReportComponent,
    MonthlySalesComponent,
    MonthlySalesIncomeComponent,
    WeeklyOrderStatusComponent,
    SalesPerItemComponent
  ],
  imports: [
    RouterModule.forChild(ReportsRoute),
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    NgApexchartsModule,
    SharedModule
  ]
})
export class ReportsModule {}
