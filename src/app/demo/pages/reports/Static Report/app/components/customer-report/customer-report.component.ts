import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeRegistrationServiceService } from 'src/app/services/employee-registration/employee-registration-service.service';
import { PrintService } from '../../services/print.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { CustomerRegistrationService } from 'src/app/services/customer-registration/customer-registration.service';

@Component({
  selector: 'app-customer-report',
  standalone: false,
  templateUrl: './customer-report.component.html',
  styleUrl: './customer-report.component.scss'
})
export class CustomerReportComponent implements OnInit{
    customers: any;
    filteredEmployees: any;
    searchTerm: string = '';
    sortColumn: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';
    loading: boolean = true;
    error: string | null = null;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    displayedColumns: any[] = ['customerId', 'customerType', 'customerName','firstName','lastName','contactNo','address','email'];
    dataSource: MatTableDataSource<any>;
    
  
    constructor(
      private customerService:CustomerRegistrationService ,
      private printService: PrintService,
      private messageService: MessageServiceService
    ) {}
  
    ngOnInit(): void {
      this.loadEmployees();
    }
  
    loadEmployees(): void {
      this.loading = true;
      this.customerService.getCustomer().subscribe({
        next: (data: any[]) => {
          console.log(data);
          this.customers = data;
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
        this.filteredEmployees = this.customers;
        return;
      }
  
      const term = this.searchTerm.toLowerCase();
      this.filteredEmployees = this.customers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(term) ||
          customer.lastName.toLowerCase().includes(term) ||
          customer.contactNo.toString().includes(term) ||
          customer.id.toString().includes(term)
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
      this.printService.printCustomerReport(this.filteredEmployees);
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
        this.customerService.getCustomer().subscribe({
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

