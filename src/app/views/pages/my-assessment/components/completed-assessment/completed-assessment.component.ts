import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AssessmentService } from "src/app/views/services/assessment/assessment.service";
import * as moment from "moment";
import * as momentTimeZone from "moment-timezone";
import { Router } from "@angular/router";
import { StorageManageService } from "src/app/views/services/storageservice/storage.service";
@Component({
  selector: "kt-completed-assessment",
  templateUrl: "./completed-assessment.component.html",
  styleUrls: ["./completed-assessment.component.scss"],
})
export class CompletedAssessmentComponent implements OnInit {
  completedAssessment: any = [];
  loading: boolean = false;
  userTimeZone: string;
  userId: string = JSON.parse(this.storageService.get("userInfo")).id;
  constructor(
    private assessmentService: AssessmentService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private storageService: StorageManageService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(this.storageService.get("userInfo")).id;
    this.userTimeZone = momentTimeZone.tz.guess();
    this.loading = true;
    this.assessmentService
      .getAllAssessments()
      .subscribe((responseBody: any) => {
        this.loading = false;
        if (responseBody?.status) {
          this.completedAssessment = responseBody?.result.filter(
            (x) => x.status == 3
          );
          // responseBody?.result;
        }
        this.cdRef?.detectChanges(); // <== added

      }),
      (err) => {
        this.loading = false;          this.cdRef?.detectChanges(); // <== added

      };
  }

  getFormattedDate(time) {
    return time
      ? momentTimeZone.tz(moment(time), this.userTimeZone).format("LL")
      : "";
  }

  navigateAssessmentPage(serviceTypeId, assessmentId) {
    this.router.navigateByUrl(
      `/assessment/update/${serviceTypeId}/${assessmentId}`
    );
  }

  navigateNewAssessmentPage() {
    this.router.navigateByUrl("/assessment/create");
  }
}
