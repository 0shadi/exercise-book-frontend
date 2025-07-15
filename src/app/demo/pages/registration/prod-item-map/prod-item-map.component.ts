import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormDemoServiceService } from 'src/app/services/form-demo/form-demo-service.service';
import { ItemRegistrationService } from 'src/app/services/item-registration/item-registration.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { ProdItemMapService } from 'src/app/services/prod-item-map-service/prod-item-map.service';
import { SellingItemRegistrationService } from 'src/app/services/selling-item-registration/selling-item-registration.service';

@Component({
  selector: 'app-prod-item-map',
  standalone: false,
  templateUrl: './prod-item-map.component.html',
  styleUrl: './prod-item-map.component.scss'
})
export class ProdItemMapComponent implements OnInit {
  itemMapForm: FormGroup;
  showElementType: boolean = false;

  saveButtonLabel = 'Save';
  mode = 'save';
  selectedData;
  isDisabled = false;
  submitted = false;
  lastAddedRow: any = null;

  suppliers: any[] = [];
  productItems: any[] = [];
  selectedProductItem: any;
  availableItems: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings = {};
  filteredItems: any[] = [];
  catogories: any[] = [];
  itemCategories = [
    { id: 1, name: 'Kg' },
    { id: 2, name: 'Liter' },
    { id: 3, name: 'Pcs' }
  ];

  displayedColumns: string[] = ['id', 'productName', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemRegistrationService,
    private messageService: MessageServiceService, //Import message Service
    private notificationService: NotificationService,
    private selllingItemService: SellingItemRegistrationService,
    private itemRegistration: ItemRegistrationService,
    private prodItemsMapService: ProdItemMapService
  ) {
    this.itemMapForm = this.fb.group({
      product: new FormControl(''),
      productName: new FormControl(''),
      itemList: this.fb.array([])
    });

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Countries',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }
  onSubmit() {
    console.log(this.itemMapForm.getRawValue());

    if (this.mode == 'add') {
      this.prodItemsMapService.addProductItemMap(this.itemMapForm.getRawValue()).subscribe({
        next: (response: any) => {
          this.populateData();
          this.messageService.showSuccess('Data saved successfully!');
        },
        error: (error: any) => {
          this.messageService.showError('Error Occured! Please try again');
        }
      });
    } else if (this.mode == 'edit') {
      this.prodItemsMapService.updateProductItemMap(this.itemMapForm.getRawValue(), this.selectedData?.id).subscribe({
        next: (response: any) => {
          this.populateData();
          this.messageService.showSuccess('Data saved successfully!');
        },
        error: (error: any) => {
          this.messageService.showError('Error Occured! Please try again');
        }
      });
    }
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
    this.getSellingProducts();
    this.getRegisteredItems();
  }

  populateData() {
    try {
      this.prodItemsMapService.getData().subscribe({
        next: (datalist: any[]) => {
          if (datalist.length <= 0) {
            return;
          }

          // let dataSourceArray = [];

          // datalist.forEach((data: any) => {
          //   let id = data.id;
          //   let product = data.product;
          //   let productName = data.productName;
          //   let itemList = data.itemList;
          //   let dataSourceobj = {};
          //   itemList.forEach((item: any) => {
          //     dataSourceobj = {
          //       id: id,
          //       product: product,
          //       productName: productName,
          //       ...item
          //     };
          //   });

          //   dataSourceArray.push(dataSourceobj);
          // });
          this.dataSource = new MatTableDataSource(datalist);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => this.messageService.showError('Action failed with error ' + error)
      });
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
  }

  editItem(data: any) {
    this.resetData();
    this.mode = 'edit';
    this.itemMapForm.patchValue({
      product: data.product,
      productName: data.productName
    });
    this.itemMapForm.enable();

    data.itemList.forEach((item: any) => {
      this.itemList.push(
        this.fb.group({
          id: [item.id],
          itemId: [item.itemId],
          itemName: [item.itemName],
          categoryName: [item.categoryName],
          itemQuantity: [item.itemQuantity]
        })
      );
    });

    this.selectedData = data;
    this.saveButtonLabel = 'Edit';
  }

  public resetData() {
    const itemListFormArray = this.itemList;
    itemListFormArray.clear();
    this.resetFormManually();
    this.itemMapForm.reset();
    this.saveButtonLabel = 'Save';
    // this.isButtonDisable = false;
    this.enableFormManually();

    while (itemListFormArray.length !== 0) {
      itemListFormArray.removeAt(0);
    }
  }

  public resetFormManually() {
    this.itemMapForm.get('product')?.reset({}, { emitEvent: false });
    this.itemMapForm.get('productName')?.reset();
  }

  public enableFormManually() {
    this.itemMapForm.get('product')?.enable({ emitEvent: false });
    this.itemMapForm.get('productName')?.enable();
  }

  deleteItem(data: any) {}

  resetItem() {
    this.resetData();
  }

  refreshData() {
    this.populateData();
  }

  public getSellingProducts(): void {
    try {
      this.selllingItemService.getItem().subscribe({
        next: (datalist: any[]) => {
          if (datalist.length <= 0) {
            return;
          }
          this.productItems = datalist;
        },
        error: (error) => this.messageService.showError('Action failed with error ' + error)
      });
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
  }
  public getRegisteredItems(): void {
    try {
      this.itemRegistration.getItem().subscribe({
        next: (datalist: any[]) => {
          if (datalist.length <= 0) {
            return;
          }
          console.log(datalist);
          this.availableItems = datalist.map((item) => ({ ...item }));
          this.filteredItems = this.availableItems.map((item) => ({ ...item }));
        },
        error: (error) => this.messageService.showError('Action failed with error ' + error)
      });
    } catch (error) {
      this.messageService.showError('Action failed with error ' + error);
    }
  }

  onItemSelectChange() {
    // Set `selected` flag
    this.availableItems.forEach((item) => {
      item.selected = this.selectedItems.includes(item);
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  get itemList() {
    return this.itemMapForm.get('itemList') as FormArray;
  }

  public onItemChange(inputValue: any, index: number) {
    const tempItems: any[] = this.availableItems.map((item) => ({
      itemId: item.itemId,
      itemCategory: item.itemCategory,
      itemName: item.itemName
    }));

    const selectedItem = tempItems.find((item: any) => item.itemId == inputValue.value);

    const itemGroup = this.itemList.at(index) as FormGroup;
    itemGroup.get('itemName')?.patchValue(selectedItem.itemName);
    itemGroup.get('categoryName')?.patchValue(selectedItem.itemCategory);
  }

  public onCategoryChange(inputId: any, index: number) {}
  addItem() {
    this.itemList.push(
      this.fb.group({
        id: [null],
        itemId: [''],
        itemName: [''],
        categoryName: [''],
        itemQuantity: ['']
      })
    );
  }
  removeItem(index: number) {
    this.itemList.removeAt(index);
  }

  public onProductChange(input: any) {
    const selectedProduct = this.productItems.find((prod: any) => prod.itemId == input.value);

    this.itemMapForm.patchValue({
      productName: selectedProduct.itemName
    });
  }
}
