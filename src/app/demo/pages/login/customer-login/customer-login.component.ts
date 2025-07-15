import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerLoginService } from 'src/app/services/customer-login-service/customer-login.service';
import { CustomerRegistrationService } from 'src/app/services/customer-registration/customer-registration.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';

@Component({
  selector: 'app-customer-login',
  standalone: false,
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.scss'
})
export class CustomerLoginComponent implements OnInit {
  customerLoginForm: FormGroup;

  displayedColumns: any[] = ['customerName', 'userName', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  submitted = false;
  isDisabled = false;
  selectedData;
  saveButtonLabel = 'Save';
  mode = 'save';

  customers = [];

  constructor(
    private fb: FormBuilder,
    private customerLoginService: CustomerLoginService,
    private messageService: MessageServiceService,
    private customerRegistrationService: CustomerRegistrationService
  ) {
    this.customerLoginForm = this.fb.group({
      id: new FormControl(''),
      customerId: new FormControl(''),
      customerName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{2,30}$')]),
      userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._]{4,10}$')]),
      password: new FormControl('', [Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=])[A-Za-z\\d!@#$%^&*()_+\\-=]{6,12}$')
      ])
    });
  }

  hide = signal(true);
    clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }

  ngOnInit(): void {
    this.populateData();
    this.getCustomers();
  }

  populateData() {
    try {
      this.customerLoginService.getCustomerLogin().subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshData() {
    this.populateData();
  }

  onSubmit() {
    this.submitted = true;

    try {
      if (this.customerLoginForm.invalid) {
        return;
      }

      if (this.mode === 'save') {
        this.customerLoginService.serviceCall(this.customerLoginForm.value).subscribe({
          next: (datalist: any[]) => {
            if (datalist.length <= 0) {
              return;
            }
            if (this.dataSource && this.dataSource.data && this.dataSource.data.length > 0) {
              this.dataSource = new MatTableDataSource([datalist, ...this.dataSource.data]);
            } else {
              this.dataSource = new MatTableDataSource([datalist]);
            }
            console.log('Login details submitted');

            this.messageService.showSuccess('Data Saved Successfully');
          },
          error: (error) => this.messageService.showError('Action failed with error ' + error)
        });
      } else if (this.mode === 'edit') {
        this.customerLoginService.editData(this.selectedData?.id, this.customerLoginForm.value).subscribe({
          next: (datalist: any[]) => {
            if (datalist.length <= 0) {
              return;
            }

            let elementIndex = this.dataSource.data.findIndex((element) => element.id === this.selectedData?.id);
            this.dataSource.data[elementIndex] = datalist;
            this.dataSource = new MatTableDataSource(this.dataSource.data);

            this.messageService.showSuccess('Data Edited Successfully');
          },
          error: (error) => this.messageService.showError('Action failed with error' + error)
        });
      }
      this.mode = 'save';
      this.customerLoginForm.disable();
      this.isDisabled = true;
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
  }

  resetData() {
    this.saveButtonLabel = 'Save';
    this.customerLoginForm.enable();
    this.isDisabled = false;

    this.customerLoginForm.setErrors = null;
    this.customerLoginForm.updateValueAndValidity();
    this.submitted = false;
  }

  editData(data: any) {
    this.customerLoginForm.patchValue(data);
    this.saveButtonLabel = 'Edit';
    this.mode = 'edit';
    this.selectedData = data;
  }

  deleteData(data: any) {
    try {
      this.selectedData = data;
      const id = data.id;

      this.customerLoginService.deleteData(id).subscribe({
        next: (datalist: any[]) => {
          if (datalist.length <= 0) {
            return;
          }

          const index = this.dataSource.data.findIndex((element) => element.id === id);

          if (index !== -1) {
            //If the index is available
            this.dataSource.data.splice(index, 1); //Remove the item from the data source
          }

          this.dataSource = new MatTableDataSource(this.dataSource.data);

          this.messageService.showSuccess('Data Deleted Successfully');
        },
        error: (error) => this.messageService.showError('Action failed with error' + error)
      });
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
  }

  getCustomers() {
    this.customerRegistrationService.getCustomer().subscribe({
      next: (datalist: any[]) => {
        if (datalist.length <= 0) {
          return;
        }
        this.customers = datalist;
      },
      error: (error) => this.messageService.showError('Action failed with error ' + error)
    });
  }

  public onCustomerChange(data: any) {
    const customerData = this.customers.find((cus: any) => cus.customerId = data);

    this.customerLoginForm.patchValue({
        customerId: data,
        customerName: customerData.customerName,
      });
  }
}
