import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCutText]',
  standalone: true
})
export class CutTextDirective {
  @Input() appCutText: any = 100;
  @HostListener("click", ["$event"]) public onClick(event: any): void {

    this.elementRef.nativeElement.innerText.length == this.appCutText ?  this.truncateText(this.originalText, 0) :this.truncateText(this.originalText,this.appCutText)
}
  constructor(private elementRef: ElementRef) { }
  originalText:string = ''
  ngAfterViewInit() {
    this.originalText = this.elementRef.nativeElement.innerText
    const text = this.elementRef.nativeElement.innerText;
    if (text.length > this.appCutText) {
      this.truncateText(text,this.appCutText)
    }
  }
  truncateText(text:string,truncateLength:number) {
    const truncatedText = truncateLength > 0 ? text.substring(0, truncateLength)  : text ;
    this.elementRef.nativeElement.innerText = truncatedText;
  }
}
