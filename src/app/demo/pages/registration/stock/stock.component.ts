import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { StockServiceService } from 'src/app/services/stock-service/stock-service.service';

@Component({
  selector: 'app-stock',
  standalone: false,
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent {
  stockForm: FormGroup;
  
  displayedColumns: string[] = ['stockItemName','qty','actions'];
  dataSource:MatTableDataSource<any>;

  selectedData;
  isDisabled = false;
  submitted = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb:FormBuilder,
    private stockService: StockServiceService,
    private messageService: MessageServiceService
  ){
    this.stockForm = this.fb.group({
      stockItemID: new FormControl(''),
      stockItemName: new FormControl(''),
      qty: new FormControl(''),
    })
}

ngOnInit(){
  this.populateData();
}

populateData(){
  try {
    this.stockService.getStock().subscribe({
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

onSubmit(){
  try {
    this.submitted = true;

    if(this.stockForm.invalid){
      return;
    }

    this.stockService.editStock(this.selectedData?.stockItemID, this.stockForm.value).subscribe({
      next: (datalist:any[]) => {
        if(datalist.length<=0){
          return;
        }

        let elementIndex = this.dataSource.data.findIndex((element) => element.stockItemID === this.selectedData?.stockItemID);
        this.dataSource.data[elementIndex] = datalist;       
        this.dataSource = new MatTableDataSource(this.dataSource.data);   
        this.dataSource.paginator = this.paginator;
        
        this.messageService.showSuccess('Stock Edited Successfully');
      },
      error: (error) => this.messageService.showError('Action failed with error'+ error)
    });
  } catch (error) {
      this.messageService.showError('Action failed with error'+ error);
  }
}

editItem(data:any){
  this.stockForm.patchValue(data);
  this.selectedData = data;
}

// deleteItem(data:any){
//   try{
//     const id = data.stockItemID;

//     this.stockService.deleteStock(id).subscribe({
//       next: (datalist:any[]) => {
//         if(datalist.length<=0){
//           return;
//         }

//         const index = this.dataSource.data.findIndex((element) => element.stockItemID === id);

//         if(index !== -1){//If the index is available
//           this.dataSource.data.splice(index,1); //Remove the item from the data source
//         }

//         this.dataSource = new MatTableDataSource(this.dataSource.data);

//         this.messageService.showSuccess('Data Deleted Successfully');
//       },
//       error: (error) => this.messageService.showError('Action failed with error'+ error)
//     });
//     }
//   catch (error) {
//     this.messageService.showError('Action failed with error ' + error);
//   }
// }

resetData(){
  this.stockForm.enable();
  this.isDisabled = false;

  this.stockForm.setErrors =null;
  this.stockForm.updateValueAndValidity();
  this.submitted=false;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

refreshData(){
  this.populateData();
}

}
