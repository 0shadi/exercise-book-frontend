import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BillingDetailsDialogComponent } from '../billing-details-dialog/billing-details-dialog.component';
import { BookCustomizeService } from 'src/app/services/book-customize/book-customize.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-customize',
  standalone: false,
  templateUrl: './book-customize.component.html',
  styleUrl: './book-customize.component.scss'
})
export class BookCustomizeComponent {
  public currentLocation = 1;
  public noOfPages = 3;
  public maxLocatin = this.noOfPages + 1;
  // public isPageOneFlipped = false;
  // public isPageTwoFlipped = false;
  // public isPageThreeFlipped = false;
  // public page1Style;
  // public page2Style;
  // public page3Style;
  bookForm: FormGroup;
  coverPhotoUrl: string = '';
  imageUrl: string | ArrayBuffer | null = '/assets/images/dog.jpg';
  defaultBookImage = ''; // 'assets/plain-book.png';
  materials = [
    { title: 'Paper', value: 'paper' },
    { title: 'Pulp', value: 'pulp' },
    { title: 'Paper Board', value: 'paperboard' },
    { title: 'Washi', value: 'washi' }
  ];
  colors = [
    { title: 'White', value: 'white' },
    { title: 'Red', value: 'red' },
    { title: 'Green', value: 'green' },
    { title: 'Yellow', value: 'yellow' } /* Add more colors if want */
  ];

  sizes = [
    { title: 'A4', value: 'A4' },
    { title: 'A5', value: 'A5' },
    { title: 'B5', value: 'B5' }
  ];

  pagesCounts = [
    { title: '40', value: '40' },
    { title: '80', value: '80' },
    { title: '120', value: '120' },
    { title: '160', value: '160' },
    { title: '200', value: '200' },
  ];

  paperTypes = [
    { title: 'Single Ruled', value: 'Single Ruled' },
    { title: 'Square Ruled', value: 'Square Ruled' },
    { title: 'Double Ruled', value: 'Double Ruled' },
    { title: 'Blank', value: 'Blank' }
  ];

  paperQualities = [
    { title: '50 GSM', value: '50 GSM' },
    { title: '70 GSM', value: '70 GSM' },
    { title: '100 GSM', value: '100 GSM' }
  ];

  coverTexts = [
    { title: 'Name', value: 'Name' },
    { title: 'Subject', value: 'Subject' },
    { title: 'Grade', value: 'Grade' }
  ];

  selectedColor = 'white';
  selectedMaterial = 'paper';
  selectedSize = 'A4';
  selectedPagesCount = '120';
  selectedPaperType = 'Single Ruled';
  selectedPaperQuality ='50 GSM';
  quantity = 1;
  selectedFile: File | null = null;
  selectedPaymentMethod: string ;
  userId = null; // user id changes

  @ViewChild('prevBtn') prevBtn!: ElementRef;
  @ViewChild('nextBtn') nextBtn!: ElementRef;
  @ViewChild('book') book!: ElementRef;

  @ViewChild('p1') paper1!: ElementRef;
  @ViewChild('p2') paper2!: ElementRef;
  @ViewChild('p3') paper3!: ElementRef;

  @ViewChild('f1') f1!: ElementRef;
  billingDetails: any;
  billingDetailsSubmitted = false;
  paymentForm: FormGroup;
  submitted=false;

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      coverPhoto: [''],
      material: [''],
      paperColor: [''],
      size: [''],
      pagesCount : [''],
      paperType : [''],
      paperQuality : [''],
      quantity : ['']
    });

  }

  goToCheckout() {
  const bookDetails = this.bookForm.value;

  this.router.navigate(['/customized-order-checkout'], { state: { book: bookDetails,coverPhotoFile: this.selectedFile } });
  console.log("book details", bookDetails);
}

  public openBook(): void {
    const bookElement = this.book.nativeElement;
    this.renderer.setStyle(bookElement, 'transform', 'translateX(50%)');

    const prevBtnElement = this.prevBtn.nativeElement;
    this.renderer.setStyle(prevBtnElement, 'transform', 'translateX(-180px)');

    const nextBtnElement = this.nextBtn.nativeElement;
    this.renderer.setStyle(nextBtnElement, 'transform', 'translateX(180px)');
  }

  public closeBook(isAtBeginnig): void {
    const bookElement = this.book.nativeElement;

    if (isAtBeginnig) {
      this.renderer.setStyle(bookElement, 'transform', 'translateX(0%)');
    } else {
      this.renderer.setStyle(bookElement, 'transform', 'translateX(100%)');
    }

    const prevBtnElement = this.prevBtn.nativeElement;
    this.renderer.setStyle(prevBtnElement, 'transform', 'translateX(0px)');

    const nextBtnElement = this.nextBtn.nativeElement;
    this.renderer.setStyle(nextBtnElement, 'transform', 'translateX(0px)');
  }
  public goNextPage(): void {
    if (this.currentLocation < this.maxLocatin) {
      switch (this.currentLocation) {
        case 1:
          this.openBook();
          const paper1Element = this.paper1.nativeElement;
          this.renderer.addClass(paper1Element, 'flipped');
          this.renderer.setStyle(paper1Element, 'z-index', 1);
          // this.isPageOneFlipped = true;
          // this.page1Style = {
          //   'z-index': 1
          // };
          break;
        case 2:
          const paper2Element = this.paper2.nativeElement;
          this.renderer.addClass(paper2Element, 'flipped');
          this.renderer.setStyle(paper2Element, 'z-index', 2);
          // this.isPageTwoFlipped = true;
          // this.page2Style = {
          //   'z-index': 2
          // };
          break;
        case 3:
          const paper3Element = this.paper3.nativeElement;
          this.renderer.addClass(paper3Element, 'flipped');
          this.renderer.setStyle(paper3Element, 'z-index', 3);
          // this.isPageThreeFlipped = true;
          // this.page3Style = {
          //   'z-index': 3
          // };
          this.closeBook(false);
          break;
      }
      this.currentLocation++;
    }
  }
  public goPreviousPage(): void {
    if (this.currentLocation > 1) {
      switch (this.currentLocation) {
        case 2:
          this.closeBook(true);
          const paper1Element = this.paper1.nativeElement;
          this.renderer.removeClass(paper1Element, 'flipped');
          this.renderer.setStyle(paper1Element, 'z-index', 3);
          break;
        case 3:
          const paper2Element = this.paper2.nativeElement;
          this.renderer.removeClass(paper2Element, 'flipped');
          this.renderer.setStyle(paper2Element, 'z-index', 2);
          break;
        case 4:
          this.openBook();
          const paper3Element = this.paper3.nativeElement;
          this.renderer.removeClass(paper3Element, 'flipped');
          this.renderer.setStyle(paper3Element, 'z-index', 1);
          break;
      }
      this.currentLocation--;
    }
  }

  onFileChange(event: any) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64Image = e.target?.result;
      this.imageUrl = base64Image;
      this.bookForm.patchValue({ coverPhoto: base64Image });

      const f1Element = this.f1.nativeElement;
      this.renderer.setStyle(f1Element, 'background-image', `url(${base64Image})`);
    };
    reader.readAsDataURL(file);
  }
}


  updateBookPreview(values: any) {
    // This method can be expanded based on how you want to handle the updates
    // For now, it just updates the cover photo
    if (values.coverPhoto) {
      this.coverPhotoUrl = values.coverPhoto;
    }
  }

  public onColorChange(): void {}

  getPaperRuleClass(): string {
    switch (this.selectedPaperType) {
      case 'Single Ruled':
        return 'single-ruled';
      case 'Double Ruled':
        return 'double-ruled';
      case 'Square Ruled':
        return 'square-ruled';
      case 'Blank':
      default:
        return 'blank-paper';
    }
  }

  increase() {
    const current = this.bookForm.get('quantity')?.value || 0;
    this.bookForm.get('quantity')?.setValue(current + 1);
  }
  decrease() {
    const current = this.bookForm.get('quantity')?.value || 0;
    if (current > 1) {
      this.bookForm.get('quantity')?.setValue(current - 1);
    }
  }
}
