import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertassessmentService } from 'src/app/views/services/expert-assessment/expertassessment.service';
import { StorageManageService } from 'src/app/views/services/storageservice/storage.service';

@Component({
  selector: 'kt-declined-assessment',
  templateUrl: './declined-assessment.component.html',
  styleUrls: ['./declined-assessment.component.scss']
})
export class DeclinedAssessmentComponent implements OnInit {

  loading : boolean = false;
  declinedAssessments = [];
  experId: string = JSON.parse(this.storageService.get("userInfo"))?.id;
  constructor(
    private router: Router,
    private expertassessmentService: ExpertassessmentService,
    private cdRef: ChangeDetectorRef,
    private storageService: StorageManageService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.expertassessmentService
    .declinedAssessment(this.experId)
    .subscribe((responseBody: any) => {
      if (responseBody?.status) {
        this.declinedAssessments = responseBody?.result;
        console.log("this.declinedAssessments:::--",this.declinedAssessments);
      }
      this.loading = false;
      this.cdRef.detectChanges(); // <== added

    }),
    (err) => {
      this.loading = false;
      this.cdRef.detectChanges(); // <== added
    };
  }

}
