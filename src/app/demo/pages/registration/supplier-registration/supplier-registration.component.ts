import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { SupplierRegistrationService } from 'src/app/services/supplier-registration/supplier-registration.service';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-supplier-registration',
  standalone: false,
  templateUrl: './supplier-registration.component.html',
  styleUrl: './supplier-registration.component.scss'
})
export class SupplierRegistrationComponent implements OnInit {
  supplierForm: FormGroup;

  displayedColumns: string[] = ['supplierId', 'supplierName', 'contactNo', 'email','address','actions'];
  dataSource:MatTableDataSource<any>;

  saveButtonLabel = 'Save';
  mode = 'add';
  selectedData;
  isDisabled = false;
  submitted = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb:FormBuilder,
    private supplierService: SupplierRegistrationService,
    private messageService: MessageServiceService
  ){
    this.supplierForm = this.fb.group({
      supplierId: new FormControl(''),
      supplierName: new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z ]+$')]),
      contactNo: new FormControl('',[Validators.required,Validators.pattern(/^0?[1-9]\d-?\d{7}$/)]),
      email: new FormControl('',[Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      address: new FormControl(''),
    })
  }

  onSubmit(){
    try{
      this.submitted = true;

      if(this.supplierForm.invalid){
        return;
      }

      if(this.mode === 'add'){
        this.supplierService.serviceCall(this.supplierForm.value).subscribe({
          next:(datalist:any[])=>{
            if(datalist.length <= 0){
              return;
            }
            if(this.dataSource && this.dataSource.data && this.dataSource.data.length >0){
              this.dataSource= new MatTableDataSource([datalist,...this.dataSource.data]);
            }         
            else{
              this.dataSource= new MatTableDataSource([datalist]);
              this.dataSource.paginator = this.paginator;
              // this.dataSource.sort = this.sort;
            }
  
            this.messageService.showSuccess('Data Saved Successfully');
  
          },
          error:(error)=>{
            this.messageService.showError('Action failed with error ' + error);
      }
    });
      }
      else if( this.mode === 'edit'){
        this.supplierService.editItem(this.selectedData?.supplierId, this.supplierForm.value).subscribe({
          next: (datalist:any[]) => {
            if(datalist.length<=0){
              return;
            }
  
            let elementIndex = this.dataSource.data.findIndex((element) => element.supplierId === this.selectedData?.supplierId);
            this.dataSource.data[elementIndex] = datalist;       
            this.dataSource = new MatTableDataSource(this.dataSource.data);   
            
            this.messageService.showSuccess('Data Edited Successfully');
          },
          error: (error) => this.messageService.showError('Action failed with error'+ error)
        });
    }
  }
    catch (error) {
      this.messageService.showError('Action failed with error'+ error);
    }

    this.mode = 'add';
    this.supplierForm.disable();
    this.isDisabled = true;
  }

  ngOnInit(){
    this.populateData();
  }

  populateData(){
    try {
            this.supplierService.getItem().subscribe({
              next: (datalist:any[]) => {
                if(datalist.length<=0){
                  return;
                }
        
                console.log('get data response: ',datalist);
                this.dataSource = new MatTableDataSource(datalist);

                this.dataSource.paginator = this.paginator;

              },        
              error: (error) => this.messageService.showError('Action failed with error ' + error)
            });
          } 
    catch (error) {
            this.messageService.showError('Action failed with error ' + error);
          }
  }

  editItem(data:any){
    this.supplierForm.patchValue(data);
    this.saveButtonLabel = 'Edit';
    this.mode = 'edit';
    this.selectedData = data;
  }

  deleteItem(data:any){
    try{
      const id = data.supplierId;

    this.supplierService.deleteSupplier(id).subscribe({
      next: (datalist:any[]) => {
        if(datalist.length<=0){
          return;
        }

        const index = this.dataSource.data.findIndex((element) => element.supplierId === id);

        if(index !== -1){//If the index is available
          this.dataSource.data.splice(index,1); //Remove the item from the data source
        }

        this.dataSource = new MatTableDataSource(this.dataSource.data);

        this.messageService.showSuccess('Data Deleted Successfully');
      },
      error: (error) => this.messageService.showError('Action failed with error'+ error)
    });
    }
    catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
  }

  resetSupplier(){
    this.saveButtonLabel = 'Save';
    this.supplierForm.enable();
    this.isDisabled = false;

    this.supplierForm.setErrors =null;
    this.supplierForm.updateValueAndValidity();
    this.submitted=false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refreshData(){
    this.populateData();
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
        this.deleteItem(data);
      }
    });
  }
}
