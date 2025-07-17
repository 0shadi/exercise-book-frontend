import { Routes } from '@angular/router';
import { EmployeeListComponent } from './Static Report/app/components/employee-list/employee-list.component';
import { CustomerReportComponent } from './Static Report/app/components/customer-report/customer-report.component';

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
      }
    ]
  }
];
