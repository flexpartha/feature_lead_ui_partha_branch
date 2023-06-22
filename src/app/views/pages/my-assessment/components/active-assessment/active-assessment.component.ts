import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AssessmentService } from "src/app/views/services/assessment/assessment.service";
import * as moment from "moment";
import * as momentTimeZone from "moment-timezone";
import { StorageManageService } from "src/app/views/services/storageservice/storage.service";

@Component({
  selector: "kt-active-assessment",
  templateUrl: "./active-assessment.component.html",
  styleUrls: ["./active-assessment.component.scss"],
})
export class ActiveAssessmentComponent implements OnInit {
  allAssessments: any = [];
  userTimeZone: string;
  zone: string;
  loading: boolean = false;
  userId: string = JSON.parse(this.storageService.get("userInfo"))?.id;
  constructor(
    private router: Router,
    private assessmentService: AssessmentService,
    private cdRef: ChangeDetectorRef,
    private storageService: StorageManageService
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.assessmentService
      .getAllAssessments()
      .subscribe((responseBody: any) => {
        if (responseBody?.status) {
          this.allAssessments = responseBody?.result;
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

  navigateNewAssessmentPage() {
    this.router.navigateByUrl("/assessment/create");
  }

  navigateAssessmentPage(serviceTypeId, assessmentId) {
    this.router.navigateByUrl(
      `/assessment/update/${serviceTypeId}/${assessmentId}`
    );
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
      return momentTimeZone.tz(moment.utc(time), this.userTimeZone).format("LL");
    } else {
      return "Not Booked";
    }
  }

  getUserTimeZone() {
    // return `${this.userTimeZone} (GMT${this.zone})`;

    return `GMT${this.zone}`;
  }
}
