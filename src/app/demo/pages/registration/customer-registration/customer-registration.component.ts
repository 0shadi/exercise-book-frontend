import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerRegistrationService } from 'src/app/services/customer-registration/customer-registration.service';
import { OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
];

@Component({
  selector: 'app-customer-registration',
  standalone: false,
  templateUrl: './customer-registration.component.html',
  styleUrl: './customer-registration.component.scss'
})
export class CustomerRegistrationComponent implements OnInit{
  customerForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  saveButtonLabel='Save';
  mode = 'save';
  selectedData;
  isDisabled =false;
  submitted=false;

  individualCustomer: boolean = false;
  retailer: boolean = false;

  types=[
    { id: 1, name: 'Individual Customer' },
    { id: 2, name: 'Retailer' }
  ];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerRegistrationService,
    private messageService: MessageServiceService
  ){
    this.customerForm=this.fb.group({
      customerId : new FormControl(''),
      customerType : new FormControl('',[Validators.required]),
      customerName : new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z ]+$')]),
      firstName : new FormControl('',[Validators.required]),
      lastName : new FormControl('',[Validators.required]),
      contactNo : new FormControl('',[Validators.pattern(/^0?[1-9]\d-?\d{7}$/)]),
      email : new FormControl('',[Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      address : new FormControl('',[Validators.pattern(/^[A-Za-z0-9\/\-,. ]+$/)]),
    })
  }
  ngOnInit(): void {
    this.populateData();
    this.showNames();
  }
  populateData(){
    try{
      this.customerService.getCustomer().subscribe({
        next: (datalist:any[]) => {
          if(datalist.length<=0){
            return;
          }
  
          console.log('get data response: ',datalist);
          this.dataSource = new MatTableDataSource(datalist);
  
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },        
        error: (error) => this.messageService.showError('Action failed with error ' + error)
      });
    }catch(error){
      this.messageService.showError('Action failed with error ' + error);
    }
  }

  onSubmit(){
    this.submitted = true;
    try{
      if(this.customerForm.invalid){
        return;
      }

      if(this.mode == 'save'){
        console.log('Form Submitted!', this.customerForm.value);

            const customerType = this.customerForm.get('customerType').value;

            if (customerType === 'Individual Customer') {
                const firstName = this.customerForm.get('firstName').value;
                const lastName = this.customerForm.get('lastName').value;
                const customerName = firstName + ' ' + lastName;

                this.customerForm.patchValue({
                  customerName: customerName
                });
            }
    
        this.customerService.serviceCall(this.customerForm.getRawValue()).subscribe({
          next: (datalist:any[]) => {
            if(datalist.length<=0){
              return;
            }
  
            if(this.dataSource && this.dataSource.data && this.dataSource.data.length >0){
              this.dataSource= new MatTableDataSource([datalist,...this.dataSource.data]);
              this.dataSource.paginator = this.paginator;
            }         
            else{
              this.dataSource= new MatTableDataSource([datalist]);
              this.dataSource.paginator = this.paginator;
          }
          this.messageService.showSuccess('Data Saved Successfully');
        },
          error: (error) => this.messageService.showError('Action failed with error ' + error)
        });
      }
  
      else if(this.mode === 'edit'){

        const customerType = this.customerForm.get('customerType').value;

            if (customerType === 'Individual Customer') {
                const firstName = this.customerForm.get('firstName').value;
                const lastName = this.customerForm.get('lastName').value;
                const customerName = firstName + ' ' + lastName;

                this.customerForm.patchValue({
                  customerName: customerName
                });
            }

        this.customerService.editCustomer(this.selectedData?.customerId, this.customerForm.getRawValue()).subscribe({
          next: (datalist:any[]) => {
            if(datalist.length<=0){
              return;
            }
  
            let elementIndex = this.dataSource.data.findIndex((element) => element.customerId === this.selectedData?.customerId);
            this.dataSource.data[elementIndex] = datalist;          
            this.dataSource = new MatTableDataSource(this.dataSource.data);
            this.dataSource.paginator = this.paginator;

            this.messageService.showSuccess('Data Edited Successfully');
          },
          error: (error) => this.messageService.showError('Action failed with error'+ error)
        });
      }
    }
    catch(error){
      this.messageService.showError('Action failed with error ' + error);
    }

    this.mode = 'save';
    this.customerForm.disable();
    this.isDisabled = true;
    
  }

  displayedColumns: any[] = ['customerId', 'customerType', 'customerName','contactNo','actions'];
  dataSource:MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  editCustomer(data:any){
    this.customerForm.patchValue(data);
    this.saveButtonLabel = 'Edit';
    this.mode = 'edit';
    this.selectedData = data;
  }

  deleteCustomer(data:any){
    try{
      this.selectedData = data;
    const id = data.customerId;

    this.customerService.deleteCustomer(id).subscribe({
      next: (datalist:any[]) => {
        if(datalist.length<=0){
          return;
        }

        const index = this.dataSource.data.findIndex((element) => element.customerId === id);

        if(index !== -1){//If the index is available
          this.dataSource.data.splice(index,1); //Remove the item from the data source
        }

        this.dataSource = new MatTableDataSource(this.dataSource.data);

        this.messageService.showSuccess('Data Deleted Successfully');
      },
      error: (error) => this.messageService.showError('Action failed with error'+ error)
    });
    }
    catch(error){
      this.messageService.showError('Action failed with error ' + error);
    }
  }

  resetCustomer(){
    this.saveButtonLabel = 'Save';
    this.customerForm.enable();
    this.isDisabled= false;

    this.customerForm.setErrors =null;
    this.customerForm.updateValueAndValidity();
    this.submitted=false;
  }

  refreshData(){
    this.populateData();
  }

  showNames(){
    this.customerForm.get('customerType')?.valueChanges.subscribe((value ) => {
      this.retailer = false;
      this.individualCustomer = false;

      this.customerForm.get('customerName')?.disable();
      this.customerForm.get('firstName')?.disable();
      this.customerForm.get('lastName')?.disable();

      if (value === "Retailer") {
        this.retailer = true;
        this.customerForm.get('customerName')?.enable(); // Enable the field
      } 
      if(value === "Individual Customer"){
        this.individualCustomer = true;
        this.customerForm.get('firstName')?.enable(); // Enable the field
        this.customerForm.get('lastName')?.enable(); // Enable the field
      }
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
        this.deleteCustomer(data);
      }
    });
  }
  
}
