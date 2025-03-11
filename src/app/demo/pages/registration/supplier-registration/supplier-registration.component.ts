import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { SupplierRegistrationService } from 'src/app/services/supplier-registration/supplier-registration.service';


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

  constructor(
    private fb:FormBuilder,
    private supplierService: SupplierRegistrationService,
    private messageService: MessageServiceService
  ){
    this.supplierForm = this.fb.group({
      supplierId: new FormControl(''),
      supplierName: new FormControl(''),
      contactNo: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
    })
  }

  onSubmit(){
    if(this.mode === 'add'){
      this.supplierService.serviceCall(this.supplierForm.value).subscribe({
        next:(datalist:any[])=>{
          if(datalist.length <= 0){
            return;
          }
          console.log('Form Submitted!', this.supplierForm.value);
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
          
          this.messageService.showSuccess('Data Edited Successfully');
        },
        error: (error) => this.messageService.showError('Action failed with error'+ error)
      });
    }
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

  }

  reset(){
    this.saveButtonLabel = 'Save';
  }
}
