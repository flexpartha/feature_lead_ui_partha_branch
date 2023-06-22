import { Component, Input, OnInit } from '@angular/core';
import { AssesmentSharedService } from '@pages/my-assessment/assesment-shared.service';

@Component({
  selector: 'kt-pre-assessment',
  templateUrl: './pre-assessment.component.html',
  styleUrls: ['./pre-assessment.component.scss']
})
export class PreAssessmentComponent implements OnInit {

  @Input() preAssementMap = [];
  answer = []
  constructor(private assesment: AssesmentSharedService) { }

  ngOnInit(): void {
    //this.preAssementMap = this.preAssementMap.map(this.assesment.formatAnswers);

    if(this.preAssementMap){
      this.preAssementMap.map((preassessmentobj:any)=>{
        let preAssessment = [];
        preAssessment.push(preassessmentobj.preAssessment);
        preAssessment.forEach((ans:any)=>{
          this.answer = JSON.parse(ans.answers);
          preassessmentobj.addedanswer = this.answer;
        });
      });
      //console.log("this.preAssementMap::",this.preAssementMap);
    }
  }

}
