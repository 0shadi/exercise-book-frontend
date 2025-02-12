import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { findIndex } from 'rxjs';
import { FormDemoServiceService } from 'src/app/services/form-demo/form-demo-service.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';

const ELEMENT_DATA: any[] = [
  {firstName: 1, lastName: 'Hydrogen', age: 1.0079, email: 'H'},
];

@Component({
  selector: 'app-form-demo',
  standalone: false,
  templateUrl: './form-demo.component.html',
  styleUrl: './form-demo.component.scss'
})
export class FormDemoComponent implements OnInit{
    demoForm : FormGroup;

    displayedColumns: string[] = ['firstName', 'lastName', 'age', 'email','actions'];
    dataSource : MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    saveButtonLabel = 'Save';
    mode = 'add'; //To change mode between add and edit
    selectedData;
    isButtonDisabled = false;
    submitted = false;

    constructor(
      private fb : FormBuilder,
      private demoService : FormDemoServiceService,
      private messageService: MessageServiceService, //Import message Service
    ){
      this.demoForm= this.fb.group({
        firstName: new FormControl('',[Validators.required]),
        lastName: new FormControl('',[Validators.minLength(3),Validators.maxLength(8)]),
        age: new FormControl('',[Validators.min(1),Validators.max(70),this.customAgeValidator]),
        email: new FormControl('',[Validators.email]),
      });
    }

    //Get data request
    ngOnInit(): void {
      this.populateData();
    }

    customAgeValidator(control:AbstractControl){
      if(!control){
        return null;
      }
      const controlValue = +control.value; //if a string is inserted + converts it to int

      if(isNaN(controlValue)){
        return{
          customAgeValidator: true
        };
      }
      if(!Number.isInteger(controlValue)){
        return{
          customAgeValidator:true
        };
      }

      return null;
    }

    
    // public populateData() : void{
    //     try{
    //       this.demoService.getData().subscribe(
    //         (response : any[])=>{
    //         console.log('get data response: ', response);
  
    //         this.dataSource = new MatTableDataSource(response);
    //         this.dataSource.paginator = this.paginator;
    //         this.dataSource.sort = this.sort;
    //       },
    //       (error) => {
    //         this.messageService.showError("Action failed with error" + error);
    //       }
    //     );
    //     }catch(error){
    //       this.messageService.showError("Action failed with error" + error);
    //     }
    // }

    //Calling the service file
    public populateData() : void{
      try{
        this.demoService.getData().subscribe({
          next: (dataList :any[]) => {
            if(dataList.length<=0){
              return;
            }
            this.dataSource = new MatTableDataSource(dataList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error : (error) => {
            this.messageService.showError("Action failed with error" + error);
          }
        });
      }catch(error){
        this.messageService.showError("Action failed with error" + error);
      }
  }

    //Declares what to do when the onSumit function is called (When the form is submitted)
    onSubmit(){
      try{
        console.log("Mode = "+ this.mode);
        console.log("Form submitted");
        console.log(this.demoForm.value); //Print all the values in the demoForm

      this.submitted = true;

      //Check if the form is valid

      if(this.demoForm.invalid){
        return;
      }

      //If the mode is add

      if(this.mode === 'add'){
        // this.demoService.serviceCall(this.demoForm.value).subscribe((response)=>{
          
        //   if(this.dataSource && this.dataSource.data && this.dataSource.data.length >0){
        //     this.dataSource= new MatTableDataSource([response,...this.dataSource.data]);
        //   }
          
        //   else{
        //     this.dataSource= new MatTableDataSource([response]);
        //   }
        //   this.messageService.showSuccess("Data saved successfully");
        // }); 

        this.demoService.serviceCall(this.demoForm.value).subscribe({
          next:(response:any) =>{
            if(this.dataSource && this.dataSource.data && this.dataSource.data.length >0){
                  this.dataSource= new MatTableDataSource([response,...this.dataSource.data]);
                }
                
                else{
                  this.dataSource= new MatTableDataSource([response]);
                }
                this.messageService.showSuccess("Data saved successfully");
          },
          error:(error) => {
            this.messageService.showError("Action failed with error" + error);
          }
        }); 
      }

      //If the mode is edit
      else if(this.mode === 'edit'){
        
        // this.demoService.editData(this.selectedData?.id, this.demoForm.value).subscribe((response)=>{
        //   let elementIndex = this.dataSource.data.findIndex((element) => element.id === this.selectedData?.id);
        //   this.dataSource.data[elementIndex] = response;
          
        //   this.dataSource = new MatTableDataSource(this.dataSource.data); //Update the table in UI
        //   this.messageService.showSuccess("Data edited successfully");
        // });

        this.demoService.editData(this.selectedData?.id, this.demoForm.value).subscribe({
          next : (response :any) => {
            let elementIndex = this.dataSource.data.findIndex((element) => element.id === this.selectedData?.id);
            this.dataSource.data[elementIndex] = response;
            
            this.dataSource = new MatTableDataSource(this.dataSource.data); //Update the table in UI
            this.messageService.showSuccess("Data edited successfully");
          },
          error:(error) =>{
            this.messageService.showError("Action failed with error" + error);
          }
        });
      }
      
      this.mode = 'add';  //Changing the mode back to 'add' after editing something
      this.demoForm.disable(); //Disable the form after submit
      this.isButtonDisabled = true; //Disable the button after submit

      }catch(error){
        this.messageService.showError("Action failed with error" + error);
      }
    }

    public resetData(): void{
      this.demoForm.reset();
      this.saveButtonLabel ='Save';
      this.demoForm.enable(); //Enable the form again if disabled
      this.isButtonDisabled = false; //Enable the button again if disabled
      this.demoForm.setErrors = null;
      this.demoForm.updateValueAndValidity();
      this.submitted = false;
    }

    public editData(data : any): void{
      this.demoForm.patchValue(data);
      this.saveButtonLabel ='Edit';
      this.mode = 'edit';
      this.selectedData = data;
    }
    public deleteData(data:any): void{
      const id=data.id;

      try{
        //Calling the service
      this.demoService.deleteData(id).subscribe({
        next:(response:any) =>{
          const index = this.dataSource.data.findIndex((element) => element.id === id);

          if(index !== -1){//If the index is available
            this.dataSource.data.splice(index,1); //Remove the item from the data source
          }

          this.dataSource = new MatTableDataSource(this.dataSource.data);//Update the data source
          this.messageService.showSuccess("Data deleted successfully");
          },
          error :(error)=>{
            this.messageService.showError("Action failed with error" + error);
          }
      });
      }catch(error){
        this.messageService.showError("Action failed with error" + error);
      }
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    public refreshData(): void{
      this.populateData();
    }
    
}


