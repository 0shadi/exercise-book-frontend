import { Routes } from '@angular/router';
import { EmployeeListComponent } from './Static Report/app/components/employee-list/employee-list.component';

export const ReportsRoute: Routes = [
  {
    path: '',
    children: [
      {
        path: 'employee-list',
        component: EmployeeListComponent
      }
    ]
  }
];
