import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { SellingItemRegistrationService } from 'src/app/services/selling-item-registration/selling-item-registration.service';



const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'}
];

@Component({
  selector: 'app-selling-item-registration',
  standalone: false,
  templateUrl: './selling-item-registration.component.html',
  styleUrl: './selling-item-registration.component.scss'
})

export class SellingItemRegistrationComponent implements OnInit{
  sellingItemForm: FormGroup;

  showBookDetails: boolean = false;
  showBrand: boolean = false;

  photoFile: File | null = null;
  photoPreview: string | null = null;
  selectedImageUrl;

  displayedColumns: string[] = ['itemId', 'itemType', 'bookType', 'pagesCount','bookSize','itemBrand','itemName','itemDescription','actions'];
  dataSource:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  saveButtonLabel='Save';
  mode = 'add';
  selectedData;
  isDisabled=false;

  submitted = false;

  constructor(
    private fb:FormBuilder,
    private selllingItemService: SellingItemRegistrationService,
    private messageService: MessageServiceService,
  ){
    this.sellingItemForm = this.fb.group({
      itemId:new FormControl(''),
      itemType:new FormControl('',[Validators.required]),
      bookType:new FormControl(''),
      pagesCount:new FormControl(''),
      bookSize:new FormControl(''),
      itemBrand:new FormControl('',[Validators.pattern(/^[A-Za-z0-9\s(),&-]{1,100}$/)]),
      itemName:new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z0-9\s(),&-]{1,100}$/)]),
      itemDescription:new FormControl('',[Validators.pattern(/^[A-Za-z0-9.,()'"\s-]{5,200}$/)]),
      imageName: new FormControl(''),
      imageType: new FormControl(''),
      itemImage:new FormControl(null),
    });
  }

  ngOnInit(){
    this.showBookInfo();
    this.showStationaryInfo();
    this.populateData();
  }

  showBookInfo(){
    this.sellingItemForm.get('itemType')?.valueChanges.subscribe((value ) => {
      if (value === 'exercise_books') {
        this.showBookDetails = true;
        this.sellingItemForm.get('bookType')?.enable(); // Enable the field
      } else {
        this.showBookDetails = false;
        this.sellingItemForm.get('bookType')?.setValue(''); // Reset value
        this.sellingItemForm.get('bookType')?.disable(); // Disable the field
      }
      });

      this.sellingItemForm.get('bookType')?.disable();
  }

  showStationaryInfo(){
    this.sellingItemForm.get('itemType')?.valueChanges.subscribe((value ) => {
      if (value === 'stationaries') {
        this.showBrand = true;
        this.sellingItemForm.get('itemBrand')?.enable(); // Enable the field
      } else {
        this.showBrand = false;
        this.sellingItemForm.get('itemBrand')?.setValue(''); // Reset value
        this.sellingItemForm.get('itemBrand')?.disable(); // Disable the field
      }
    });
  
      // Initially disable elementType
      this.sellingItemForm.get('itemBrand')?.disable();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photoFile = input.files[0];
  
      // Store the file in form control
      this.sellingItemForm.patchValue({ itemImage: this.photoFile });
  
      // Generate a preview of the image
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result as string;
      };
      reader.readAsDataURL(this.photoFile);
    }
  }

  onSubmit(){
    try{
      this.submitted = true;

      if(this.sellingItemForm.invalid){
        console.log("Form is invalid");
        return;
      }
      console.log("Form submitted", this.sellingItemForm.value);

      if(this.mode === 'add'){
        console.log("submitted");
        this.selllingItemService.serviceCall(this.prepareFormData()).subscribe({
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
      }
      else if(this.mode === 'edit'){
        this.selllingItemService.editItem(this.selectedData?.itemId, this.prepareFormData()).subscribe({
          next: (datalist:any[]) => {
            if(datalist.length<=0){
              return;
            }
            console.log("Item ID:", this.selectedData?.itemId);
            let elementIndex = this.dataSource.data.findIndex((element) => element.itemId === this.selectedData?.itemId);
            this.dataSource.data[elementIndex] = datalist;          
            this.dataSource = new MatTableDataSource(this.dataSource.data);
  
            this.messageService.showSuccess('Data Edited Successfully');
          },
          error: (error) => this.messageService.showError('Action failed with error'+ error)
        });
      }
  
      this.mode='add';
      this.sellingItemForm.disable();
      this.isDisabled=true;
    }
    catch (error) {
      this.messageService.showError('Action failed with error'+ error);
    }
    
  }

  populateData(){
    try{
      this.selllingItemService.getItem().subscribe({
        next: (datalist:any[]) => {
          if(datalist.length<=0){
            return;
          }
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
    this.sellingItemForm.patchValue(data);
    this.saveButtonLabel ='Edit';
    this.mode = 'edit';
    this.selectedData = data;
  }

  deleteItem(data){
    try{
      this.selectedData = data;
      const id = data.itemId;

    this.selllingItemService.deleteItem(id).subscribe({
      next: (datalist:any[]) => {
        if(datalist.length<=0){
          return;
        }

        const index = this.dataSource.data.findIndex((element) => element.itemId === id);

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

  resetItem(){
    this.saveButtonLabel = 'Save';
    this.sellingItemForm.enable();
    this.isDisabled=false;

    this.sellingItemForm.setErrors = null;
    this.sellingItemForm.updateValueAndValidity();
    this.submitted = false;
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

  public prepareFormData(): FormData {
    const sellingItemFormData = new FormData();
    
    sellingItemFormData.append('sellingItemForm', new Blob([JSON.stringify(this.sellingItemForm.value)], { type: 'application/json' }));

    if (this.photoFile) {
      sellingItemFormData.append('itemImage', this.sellingItemForm.get('itemImage').value, this.sellingItemForm.get('itemImage').value.name);
    } else {
      const imageBlob = this.base64ToBlob(this.sellingItemForm.get('itemImage').value, this.sellingItemForm.get('imageType').value);
      const file = new File([imageBlob], this.sellingItemForm.get('imageName').value, { type: this.sellingItemForm.get('imageType').value });
      sellingItemFormData.append('itemImage', file, file.name);
    }

    return sellingItemFormData;
  }

  base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  
}
