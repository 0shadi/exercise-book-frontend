import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeRegistrationServiceService } from 'src/app/services/employee-registration/employee-registration-service.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';


const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
];


@Component({
  selector: 'app-employee-registration',
  standalone: false,
  templateUrl: './employee-registration.component.html',
  styleUrl: './employee-registration.component.scss',
})
export class EmployeeRegistrationComponent implements OnInit {
  displayedColumns: any[] = ['employeeNumber', 'fullName', 'callingName', 'nic','contactNo','bDay','gender','address','emergencyContactNumber','email','jobRole','actions'];
  dataSource:MatTableDataSource<any>;
  saveButtonLabel='Save';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  mode='add';
  selectedData;
  isDisabled = false;
  submitted = false;
  
  employeeForm: FormGroup;

  constructor(
    private fb : FormBuilder,
    private employeeService: EmployeeRegistrationServiceService,
    private messageService: MessageServiceService
  ){
    this.employeeForm = this.fb.group({
      employeeNumber:new FormControl(''),
      fullName:new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z ]+$')]),
      callingName:new FormControl('',[Validators.minLength(3),Validators.maxLength(15),Validators.pattern('^[A-Za-z]+$')]),
      nic:new FormControl('',[Validators.pattern(/^(?:\d{9}[VvXx]|\d{12})$/)]),
      contactNo: new FormControl('',[Validators.required,Validators.pattern(/^0?[1-9]\d-?\d{7}$/)]),
      bDay:new FormControl('',[this.validateAge]),
      gender:new FormControl(''),
      address:new FormControl(''),
      emergencyContactNumber:new FormControl('',[Validators.pattern(/^0?[1-9]\d-?\d{7}$/)]),
      email:new FormControl('',[Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      jobRole:new FormControl('')
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  ngOnInit(): void {
    this.populateData();
  }
  populateData() {
    try{
      this.employeeService.getEmployee().subscribe({
        next:(datalist:any[]) =>{
        if(datalist.length <= 0){
          return;
        }

        console.log('get data response: ',datalist);
        this.dataSource= new MatTableDataSource(datalist);
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(error) =>{
        this.messageService.showError('Action failed with error ' + error);
      }
    });
    }catch(error){
      this.messageService.showError('Action failed with error ' + error);
    }
  }

  onSubmit(){
    console.log('Submitted');
    console.log(this.employeeForm.value);
    this.submitted=true;

    try{
      if(this.employeeForm.invalid){
        return;
      }

      if(this.mode === 'add'){
        this.employeeService.serviceCall(this.employeeForm.value).subscribe({
          next:(datalist:any[])=>{
            if(datalist.length <= 0){
              return;
            }

            if(this.dataSource && this.dataSource.data && this.dataSource.data.length >0){
              this.dataSource= new MatTableDataSource([datalist,...this.dataSource.data]);
            }
            
            else{
              this.dataSource= new MatTableDataSource([datalist]);
            }
            this.messageService.showSuccess('Data Saved Successfully');
          },
          error:(error)=>{
            this.messageService.showError('Action failed with error ' + error);
          }
          
        });
    
      }else if(this.mode ==='edit'){
        this.employeeService.editData(this.selectedData?.employeeNumber, this.employeeForm.value).subscribe({
          next:(datalist:any[]) =>{
          if(datalist.length <= 0){
            return;
          }
          let elementIndex = this.dataSource.data.findIndex((element) => element.employeeNumber === this.selectedData?.employeeNumber);
              this.dataSource.data[elementIndex] = datalist;          
              this.dataSource = new MatTableDataSource(this.dataSource.data);
              this.messageService.showSuccess('Data Edited Successfully');
            },
          error:(error)=>{
            this.messageService.showError('Action failed with error ' + error);
          }
        });
        
      }
  
      this.mode='add';
      this.employeeForm.disable();
      this.isDisabled=true;

    }catch(error){
      this.messageService.showError('Action failed with error ' + error);
    }
  }

  editEmployee(data:any){
    this.employeeForm.patchValue(data);
    this.selectedData = data;
    this.saveButtonLabel='Edit';
    this.mode='edit'
  }

  deleteEmployee(data:any){
    try{
      this.selectedData = data;
      const id = data.employeeNumber;

    this.employeeService.deleteData(id).subscribe({
      next:(datalist:any[]) =>{
        if(datalist.length <= 0){
          return;
        }

        const index = this.dataSource.data.findIndex((element) => element.employeeNumber === id);

          if(index !== -1){//If the index is available
            this.dataSource.data.splice(index,1); //Remove the item from the data source
          }

          this.dataSource = new MatTableDataSource(this.dataSource.data);
          this.messageService.showSuccess('Data Deleted Successfully');
        },
        error:(error)=> {
          this.messageService.showError('Action failed with error ' + error);
        }
    });

    }catch(error){
      this.messageService.showError('Action failed with error ' + error);
    }

  }

  resetEmployee(){
    this.employeeForm.reset();
    this.saveButtonLabel='Save';
    this.employeeForm.enable();
    this.isDisabled=false;

    this.employeeForm.setErrors =null;
    this.employeeForm.updateValueAndValidity();
    this.submitted=false;
  }

  refreshData(){
    this.populateData();
  }

  validateAge(control: AbstractControl) {
    if(!control){
      return null;
    }
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      return { underage: true };
    }
    return null;
  }
}
