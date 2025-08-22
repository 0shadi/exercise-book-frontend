import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerLoginService } from 'src/app/services/customer-login-service/customer-login.service';
import { CustomerRegistrationService } from 'src/app/services/customer-registration/customer-registration.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { DeleteConfirmDialogComponent } from '../../registration/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RsaService } from 'src/app/services/rsa-service/rsa.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

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
  hideFirstName = false;
  hideLastName = false;

  constructor(
    private fb: FormBuilder,
    private customerLoginService: CustomerLoginService,
    private messageService: MessageServiceService,
    private customerRegistrationService: CustomerRegistrationService,
    private rsaService: RsaService,
    private notificationService: NotificationService,
  ) {
    this.customerLoginForm = this.fb.group({
      id: new FormControl(''),
      customerId: new FormControl(''),
      customerName: new FormControl(''),
      firstName: new FormControl({value: '', disabled: true}),
      lastName: new FormControl({value: '', disabled: true}),
      customerType: new FormControl(''),
      userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._]{4,10}$')]),
      password: new FormControl('', [
        Validators.required,
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

      let encryptedPassword = '';

      if (this.customerLoginForm.getRawValue().password != null || this.customerLoginForm.getRawValue().password != undefined) {
        encryptedPassword = this.rsaService.encrypt(this.customerLoginForm.value.password);
      }


      const loginFormCopy = {
        id: this.customerLoginForm.value.id ,
        customerId:  this.customerLoginForm.getRawValue().customerId,
        customerName: this.customerLoginForm.getRawValue().customerName,
        firstName: this.customerLoginForm.getRawValue().firstName,
        lastName: this.customerLoginForm.getRawValue().lastName,
        customerType: this.customerLoginForm.getRawValue().customerType,
        userName: this.customerLoginForm.getRawValue().userName,
        password: encryptedPassword
      }

      if (this.mode === 'save') {
        this.customerLoginService.serviceCall(loginFormCopy).subscribe({
          next: (datalist: any) => {
            if (datalist.length <= 0) {
              return;
            }
            if (this.dataSource && this.dataSource.data && this.dataSource.data.length > 0) {
              this.dataSource = new MatTableDataSource([datalist, ...this.dataSource.data]);
              this.dataSource.paginator = this.paginator;
            } else {
              this.dataSource = new MatTableDataSource([datalist]);
            }
            console.log('Login details submitted');
            this.addNotification('Welcome to Samagi Exercise Books!', datalist.userId);
            this.messageService.showSuccess('Data Saved Successfully');
          },
          error: (error) => this.messageService.showError('Action failed with error ' + error)
        });
      } else if (this.mode === 'edit') {
        this.customerLoginService.editData(this.selectedData?.id, loginFormCopy).subscribe({
          next: (datalist: any[]) => {
            if (datalist.length <= 0) {
              return;
            }

            let elementIndex = this.dataSource.data.findIndex((element) => element.id === this.selectedData?.id);
            this.dataSource.data[elementIndex] = datalist;
            this.dataSource = new MatTableDataSource(this.dataSource.data);
            this.dataSource.paginator = this.paginator;

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

    
    this.customerLoginForm.get('password')?.setValidators(Validators.required);

    this.customerLoginForm.updateValueAndValidity();
    this.submitted = false;
    this.mode = 'save';
  }

  editData(data: any) {

    const customerData = this.customers.find((cus: any) => (cus.customerId == data.customerId));

    this.customerLoginForm.patchValue(data);
    this.customerLoginForm.patchValue({
      customerType: customerData.customerType
    });

    // this.employeeLoginForm.patchValue({
    //   employee: data.employee
    // });
    this.customerLoginForm.get('password')?.removeValidators(Validators.required);
    this.customerLoginForm.get('password')?.updateValueAndValidity();

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
          this.dataSource.paginator = this.paginator;

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
    const customerData = this.customers.find((cus: any) => (cus.customerId == data));

    this.customerLoginForm.patchValue({
      customerId: data,
      customerName: customerData.customerName,
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      customerType: customerData.customerType
    });

    if (customerData.customerType === "Retailer") {
      this.hideFirstName = true;
      this.hideLastName = true;
    } else {
      this.hideFirstName = false;
      this.hideLastName = false;
    }
  }

  readonly dialog = inject(MatDialog);
  openDeleteDialog(data: any) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this data?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      if (result) {
        this.deleteData(data);
      }
    });
  }

  public addNotification(message: string, userId: number): void {
    this.notificationService.addNotification(message, 'success', userId);
  }
}
