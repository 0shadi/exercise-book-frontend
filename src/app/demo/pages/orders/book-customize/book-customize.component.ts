import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  selectedColor = 'white';
  selectedMaterial = 'paper';

  @ViewChild('prevBtn') prevBtn!: ElementRef;
  @ViewChild('nextBtn') nextBtn!: ElementRef;
  @ViewChild('book') book!: ElementRef;

  @ViewChild('p1') paper1!: ElementRef;
  @ViewChild('p2') paper2!: ElementRef;
  @ViewChild('p3') paper3!: ElementRef;

  @ViewChild('f1') f1!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      coverPhoto: [''],
      material: [''],
      paperColor: ['']
    });
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
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target?.result;
        // this.coverPhotoUrl = '/assets/images/dog.jpg';
        this.bookForm.patchValue({ coverPhoto: this.coverPhotoUrl });

        const f1Element = this.f1.nativeElement;
        this.renderer.setStyle(f1Element, 'background-image', `url(${this.coverPhotoUrl})`);
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
}
