import { Routes } from '@angular/router';
import { EmployeeListComponent } from './Static Report/app/components/employee-list/employee-list.component';
import { CustomerReportComponent } from './Static Report/app/components/customer-report/customer-report.component';
import { MonthlySalesComponent } from './Charts/monthly-sales/monthly-sales.component';
import { MonthlySalesIncomeComponent } from './Charts/monthly-sales-income/monthly-sales-income.component';
import { WeeklyOrderStatusComponent } from './Charts/weekly-order-status/weekly-order-status.component';
import { SalesPerItemComponent } from './Charts/sales-per-item/sales-per-item.component';

export const ReportsRoute: Routes = [
  {
    path: '',
    children: [
      {
        path: 'employee-list',
        component: EmployeeListComponent
      },
      {
        path: 'customer-report',
        component: CustomerReportComponent
      },
      {
        path: 'monthly-sales-report',
        component: MonthlySalesComponent
      },
      {
        path: 'monthly-sales-income-report',
        component: MonthlySalesIncomeComponent
      },
      {
        path: 'weekly-order-status-report',
        component: WeeklyOrderStatusComponent
      },
       {
        path: 'sales-per-item-report',
        component: SalesPerItemComponent
      }
    ]
  }
];
