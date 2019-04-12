import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizer'
})

export class SanitizerPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string, args?: any): SafeStyle {
    if (args === 'URL') {
      return this.sanitizer.bypassSecurityTrustUrl(value);
    }
    const style = `background-image: url('${value}')`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

}
