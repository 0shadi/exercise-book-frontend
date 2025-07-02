import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeLoginService } from 'src/app/services/employee-login-service/employee-login.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';


@Component({
  selector: 'app-employee-login',
  standalone: false,
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.scss'
})

export class EmployeeLoginComponent implements OnInit {
  employeeLoginForm : FormGroup;

  displayedColumns: any[] = ['firstName','lastName','userName','password'];
  dataSource:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  submitted = false;

  constructor(
    private fb : FormBuilder,
    private employeeLoginService: EmployeeLoginService,
    private messageService: MessageServiceService
  ){
    this.employeeLoginForm= this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {
    this.populateData();
  }

  populateData() {
    try{
      this.employeeLoginService.getEmployeeLogin().subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshData(){
    this.populateData();
  }

  onSubmit(){
    this.submitted= true;

    try{
      if(this.employeeLoginForm.invalid){
      return;
    }

    this.employeeLoginService.serviceCall(this.employeeLoginForm.value).subscribe({
      next: (datalist:any[]) => {
        if(datalist.length<=0){
          return;
        }
        if(this.dataSource && this.dataSource.data && this.dataSource.data.length >0){
          this.dataSource= new MatTableDataSource([datalist,...this.dataSource.data]);
        }
        
        else{
          this.dataSource= new MatTableDataSource([datalist]);
        }

        console.log("Login details submitted");
        this.messageService.showSuccess('Data Saved Successfully');
    },
      error: (error) => this.messageService.showError('Action failed with error ' + error)
    });
    }
    catch(error){
      this.messageService.showError('Action failed with error ' + error);
    }
  }

}
