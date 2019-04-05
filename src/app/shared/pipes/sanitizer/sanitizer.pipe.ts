import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizer'
})

export class SanitizerPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string, args?: any): SafeStyle {
    const style = `background-image: url('assets/img/${value}')`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

}
