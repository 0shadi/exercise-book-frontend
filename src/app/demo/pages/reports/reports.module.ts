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

@NgModule({
  declarations: [EmployeeListComponent, LoadingSpinnerComponent],
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
    MatIconModule
  ]
})
export class ReportsModule {}
