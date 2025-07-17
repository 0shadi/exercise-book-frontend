import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeLoginService } from 'src/app/services/employee-login-service/employee-login.service';
import { EmployeeRegistrationServiceService } from 'src/app/services/employee-registration/employee-registration-service.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { DeleteConfirmDialogComponent } from '../../registration/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-login',
  standalone: false,
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.scss'
})
export class EmployeeLoginComponent implements OnInit {
  employeeLoginForm: FormGroup;

  displayedColumns: any[] = ['firstName', 'lastName', 'userName','actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  submitted = false;
  isDisabled = false;
  selectedData;
  saveButtonLabel = 'Save';
  mode = 'save';
  selectedOption: any;

  employees = [];

  constructor(
    private fb: FormBuilder,
    private employeeLoginService: EmployeeLoginService,
    private messageService: MessageServiceService,
    private employeeRegistrationService: EmployeeRegistrationServiceService
  ) {
    this.employeeLoginForm = this.fb.group({
      id: new FormControl(''),
      employee: new FormControl('', [Validators.required]),
      firstName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      lastName: new FormControl({ value: '', disabled: true }, [Validators.required]),
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
    this.getEmployees();
  }

  populateData() {
    try {
      this.employeeLoginService.getEmployeeLogin().subscribe({
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
      if (this.employeeLoginForm.invalid) {
        return;
      }

      if (this.mode == 'save') {
        this.employeeLoginService.serviceCall(this.employeeLoginForm.getRawValue()).subscribe({
          next: (datalist: any[]) => {
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
            this.messageService.showSuccess('Data Saved Successfully');
          },
          error: (error) => this.messageService.showError('Action failed with error ' + error)
        });
      } else if (this.mode === 'edit') {
        this.employeeLoginService.editData(this.selectedData?.id, this.employeeLoginForm.getRawValue()).subscribe({
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
      this.employeeLoginForm.disable();
      this.isDisabled = true;
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
  }

  resetData() {
    this.saveButtonLabel = 'Save';
    this.employeeLoginForm.enable();
    this.isDisabled = false;

    this.employeeLoginForm.setErrors = null;
    this.employeeLoginForm.get('password')?.setValidators(Validators.required);

    this.employeeLoginForm.updateValueAndValidity();
    this.submitted = false;
  }

  editData(data: any) {
    this.employeeLoginForm.patchValue(data);
    this.employeeLoginForm.patchValue({
      employee: data.employee
    });
    console.log(data);
    this.employeeLoginForm.get('password')?.removeValidators(Validators.required);
    this.employeeLoginForm.get('password')?.updateValueAndValidity();
    this.saveButtonLabel = 'Edit';
    this.mode = 'edit';
    this.selectedData = data;
  }

  deleteData(data: any) {
    try {
      this.selectedData = data;
      const id = data.id;

      this.employeeLoginService.deleteData(id).subscribe({
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

  getEmployees() {
    this.employeeRegistrationService.getEmployee().subscribe({
      next: (datalist: any[]) => {
        if (datalist.length <= 0) {
          return;
        }
        this.employees = datalist;
      },
      error: (error) => this.messageService.showError('Action failed with error ' + error)
    });
  }

  public onEmployeeChange(data: any): void {
    const employeeData = this.employees.find((emp: any) => data === emp.employeeNumber);

    this.employeeLoginForm.patchValue({
      employee: data,
      firstName: employeeData?.firstName,
      lastName: employeeData?.lastName
    });
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
}
