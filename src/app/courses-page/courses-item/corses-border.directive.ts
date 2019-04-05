import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCorsesBorder]'
})


export class CorsesBorderDirective implements OnInit{
  @Input('appCorsesBorder') date: string;

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
    let today = new Date().getTime();

    if ((Number(this.date) < today) && (Number(this.date) >= today - 14 * 86400000)) {
      this.elementRef.nativeElement.style.border = '1px solid green';
    } else if (Number(this.date) > today) {
      this.elementRef.nativeElement.style.border = '1px solid blue';
    }
  }
} 