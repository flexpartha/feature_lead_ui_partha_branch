import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kt-active-assessment',
  templateUrl: './active-assessment.component.html',
  styleUrls: ['./active-assessment.component.scss']
})
export class ActiveAssessmentComponent implements OnInit {

  @Input() requesterNm:any;
  @Input() chngProgressbar:any;
  @Input() chngProgressbarAS:any;
  @Input() chngProgressbarCompleted:any
  constructor() { }

  ngOnInit(): void {
  }

}
