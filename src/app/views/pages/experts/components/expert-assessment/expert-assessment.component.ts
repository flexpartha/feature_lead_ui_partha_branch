import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from 'src/app/views/services/assessment/assessment.service';
import { StorageManageService } from 'src/app/views/services/storageservice/storage.service';
import * as moment from "moment";
import * as momentTimeZone from "moment-timezone";
import { ExpertassessmentService } from 'src/app/views/services/expert-assessment/expertassessment.service';

@Component({
  selector: 'kt-expert-assessment',
  templateUrl: './expert-assessment.component.html',
  styleUrls: ['./expert-assessment.component.scss']
})
export class ExpertAssessmentComponent implements OnInit {

  allAssessments = [];

  userTimeZone: string;
  zone: string;
  loading: boolean = false;
  experId: string = JSON.parse(this.storageService.get("userInfo"))?.id;
  //experId: string = '1';

  constructor(
    private router: Router,
    private expertassessmentService: ExpertassessmentService,
    private cdRef: ChangeDetectorRef,
    private storageService: StorageManageService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.expertassessmentService
      .getAllActiveAssessments(this.experId)
      .subscribe((responseBody: any) => {
        if (responseBody?.status) {
          this.allAssessments = responseBody?.result;
          console.log("this.allAssessments:::--",this.allAssessments);
        }
        this.loading = false;
        this.cdRef.detectChanges(); // <== added

      }),
      (err) => {
        this.loading = false;
        this.cdRef.detectChanges(); // <== added
      };
    this.userTimeZone = momentTimeZone.tz.guess();
    this.zone = momentTimeZone.tz(this.userTimeZone).format("Z"); // -05:00
  }

  getFormattedTime(time) {
    if (time) {
      return momentTimeZone
        .tz(moment.utc(time), this.userTimeZone)
        .format("hh:mm a");
    } else {
      return "Not Booked";
    }
  }

  getFormattedDate(time) {
    if (time) {
      return momentTimeZone.tz(moment(time), this.userTimeZone).format("LL");
    } else {
      return "Not Booked";
    }
  }

  getUserTimeZone() {
    // return `${this.userTimeZone} (GMT${this.zone})`;

    return `GMT${this.zone}`;
  }

  navigateAssessmentPage(assessmentId:any){
    console.log("ASSESSMENT ID::--",assessmentId);
    this.router.navigateByUrl(
      `/experts/expertassessmentdetail/${assessmentId}`
    );
  }

}
