import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specialPipe'
})
export class SpecialPipePipe implements PipeTransform {

  transform(value: string): string {
    let cleanString = value.replace(/\|&;\$%@"[\"\"]<>\(\)\,/g, "");
    if(cleanString != ''){
      return JSON.parse(cleanString);
    }
  }

}
