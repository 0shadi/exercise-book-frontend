import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { PrintService } from '../../services/print.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { EmployeeRegistrationServiceService } from 'src/app/services/employee-registration/employee-registration-service.service';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any;
  filteredEmployees: any;
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  loading: boolean = true;
  error: string | null = null;

  displayedColumns: any[] = [
    'employeeNumber',
    'fullName',
    'callingName',
    'nic',
    'contactNo',
    'bDay',
    'gender',
    'address',
    'emergencyContactNumber',
    'email',
    'jobRole'
  ];
  dataSource: MatTableDataSource<any>;
  saveButtonLabel = 'Save';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private employeeService: EmployeeRegistrationServiceService,
    private printService: PrintService,
    private messageService: MessageServiceService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployee().subscribe({
      next: (data: any[]) => {
        console.log(data);
        this.employees = data;
        this.filteredEmployees = data;
        this.loading = false;
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.error = 'Failed to load employee data. Please try again later.';
        this.loading = false;
        console.error('Error fetching employees:', err);
      }
    });
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.filteredEmployees = this.employees;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(term) ||
        employee.age.toString().includes(term) ||
        employee.phoneNumber.toString().includes(term) ||
        employee.salary.toString().includes(term) ||
        employee.id.toString().includes(term)
    );
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredEmployees = [...this.filteredEmployees].sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string') {
        const comparison = valueA.localeCompare(valueB);
        return this.sortDirection === 'asc' ? comparison : -comparison;
      } else {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      return '↕';
    }
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  printReport(): void {
    this.printService.printEmployeeReport(this.filteredEmployees);
  }

  getDate(): string {
    const today = new Date();
    return today.toLocaleDateString();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredEmployees = this.dataSource.filteredData;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshData() {
    this.populateData();
  }

  populateData() {
    try {
      this.employeeService.getEmployee().subscribe({
        next: (datalist: any[]) => {
          if (datalist.length <= 0) {
            return;
          }

          console.log('get data response: ', datalist);
          this.dataSource = new MatTableDataSource(datalist);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          this.messageService.showError('Action failed with error ' + error);
        }
      });
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
  }
}
