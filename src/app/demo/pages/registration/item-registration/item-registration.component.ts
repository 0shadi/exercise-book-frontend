import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ItemRegistrationService } from 'src/app/services/item-registration/item-registration.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-item-registration',
  standalone: false,
  templateUrl: './item-registration.component.html',
  styleUrl: './item-registration.component.scss'
})
export class ItemRegistrationComponent implements OnInit {
  itemForm: FormGroup;
  showElementType: boolean = false;

  saveButtonLabel = 'Save';
  mode = 'save';
  selectedData;
  isDisabled = false;
  submitted = false;
  lastAddedRow: any = null;

  suppliers: any[] = [];

  displayedColumns: string[] = [
    'itemId',
    'itemCode',
    'itemName',
    'itemType',
    'elementType',
    'itemBrand',
    'description',
    'supplier',
    'actions'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  itemCategories = [
    { id: 1, name: 'Kg' },
    { id: 2, name: 'Liter' },
    { id: 3, name: 'Pcs' }
  ];

  types = [
    { id: 1, name: 'Paper/cover' },
    { id: 2, name: 'Binding material' },
    { id: 3, name: 'Machinery' }
  ];

  elementTypes = [
    { id: 1, name: 'Glue' },
    { id: 2, name: 'Stapler' },
    { id: 3, name: 'Threads' },
    { id: 4, name: 'Needles' }
  ];

  itemBrands = [
    { id: 1, name: 'Atlas' },
    { id: 2, name: 'Chemfix' },
    { id: 3, name: 'Kangaro' },
    { id: 4, name: 'Other' }
  ];

  constructor(
    private fb: FormBuilder,
    private itemService: ItemRegistrationService,
    private messageService: MessageServiceService
  ) {
    this.itemForm = this.fb.group({
      itemId: new FormControl(''),
      itemCode: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]{3}(-?\d{1,4})$/)]),
      itemName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s(),&-]{1,100}$/)]),
      itemType: new FormControl(''),
      elementType: new FormControl(''),
      itemBrand: new FormControl(''),
      description: new FormControl('', [Validators.pattern(/^[A-Za-z0-9.,()'"\s-]{5,200}$/)]),
      itemCategory: new FormControl(''),
      supplier: new FormControl('')
    });
  }

  onSubmit() {
    this.submitted = true;
    try {
      if (this.itemForm.invalid) {
        return;
      }

      if (this.mode === 'save') {
        console.log('Form Submitted!', this.itemForm.value);

        this.itemService.serviceCall(this.itemForm.value).subscribe({
          next: (datalist: any) => {
            if (datalist.length <= 0) {
              return;
            }

            if (this.dataSource && this.dataSource.data && this.dataSource.data.length > 0) {
              this.dataSource = new MatTableDataSource([datalist, ...this.dataSource.data]);
            } else {
              this.dataSource = new MatTableDataSource([datalist]);
            }
            this.lastAddedRow = datalist; // Track the last added row
            this.messageService.showSuccess('Data Saved Successfully');
            const addedID = (datalist as { itemId: number }).itemId;

            setTimeout(() => {
              this.lastAddedRow = null;
              const dataObj = { stockItemID: addedID, qty: 0, stockItemName: this.itemForm.getRawValue()?.itemName };
              console.log(dataObj);

              this.itemService.createStock(dataObj).subscribe({
                next: (response: any) => {
                  console.log('stock data Server Response', response);
                },
                error: (error) => {
                  console.log(error);
                }
              });
            }, 3000);
          },
          error: (error) => {
            this.messageService.showError('Action failed with error ' + error);
          }
        });
      } else if (this.mode === 'edit') {
        this.itemService.editItem(this.selectedData?.itemId, this.itemForm.value).subscribe({
          next: (datalist: any[]) => {
            if (datalist.length <= 0) {
              return;
            }

            let elementIndex = this.dataSource.data.findIndex((element) => element.itemId === this.selectedData?.itemId);
            this.dataSource.data[elementIndex] = datalist;
            this.dataSource = new MatTableDataSource(this.dataSource.data);

            this.messageService.showSuccess('Data Edited Successfully');
          },
          error: (error) => this.messageService.showError('Action failed with error' + error)
        });
      }
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }

    this.mode = 'save';
    this.itemForm.disable();
    this.isDisabled = true;
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
    this.showElement();
  }

  populateData() {
    try {
      this.itemService.getItem().subscribe({
        next: (datalist: any[]) => {
          if (datalist.length <= 0) {
            return;
          }

          console.log('get data response: ', datalist);
          this.dataSource = new MatTableDataSource(datalist);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => this.messageService.showError('Action failed with error ' + error)
      });

      this.itemService.getSuppliers().subscribe({
        next: (datalist: any[]) => {
          if (datalist.length <= 0) {
            return;
          }

          this.suppliers = datalist;
        },
        error: (error) => this.messageService.showError('Action failed with error ' + error)
      });
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
  }

  editItem(data: any) {
    this.itemForm.patchValue(data);
    this.saveButtonLabel = 'Edit';
    this.mode = 'edit';
    this.selectedData = data;
  }

  deleteItem(data: any) {
    this.selectedData = data;
    const id = data.itemId;

    try {
      this.itemService.deleteItem(id).subscribe({
        next: (datalist: any[]) => {
          if (datalist.length <= 0) {
            return;
          }

          const index = this.dataSource.data.findIndex((element) => element.itemId === id);

          if (index !== -1) {
            //If the index is available
            this.dataSource.data.splice(index, 1); //Remove the item from the data source
          }

          this.dataSource = new MatTableDataSource(this.dataSource.data);

          this.messageService.showSuccess('Data Deleted Successfully');
        },
        error: (error) => this.messageService.showError('Action failed with error' + error)
      });
    } catch (error) {
      this.messageService.showError('Action failed with error' + error);
    }
  }

  showElement() {
    this.itemForm.get('itemType')?.valueChanges.subscribe((value) => {
      if (value === 'binding material') {
        this.showElementType = true;
        this.itemForm.get('elementType')?.enable(); // Enable the field
      } else {
        this.showElementType = false;
        this.itemForm.get('elementType')?.setValue(''); // Reset value
        this.itemForm.get('elementType')?.disable(); // Disable the field
      }
    });

    // Initially disable elementType
    this.itemForm.get('elementType')?.disable();
  }

  resetItem() {
    this.saveButtonLabel = 'Save';
    this.itemForm.enable();
    this.isDisabled = false;

    this.itemForm.setErrors = null;
    this.itemForm.updateValueAndValidity();
    this.submitted = false;
  }

  refreshData() {
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
