import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AssesmentSharedService } from '@pages/my-assessment/assesment-shared.service';
import { ExpertassessmentService } from 'src/app/views/services/expert-assessment/expertassessment.service';
import { StorageManageService } from 'src/app/views/services/storageservice/storage.service';

@Component({
  selector: 'kt-expert-assessment-details',
  templateUrl: './expert-assessment-details.component.html',
  styleUrls: ['./expert-assessment-details.component.scss']
})
export class ExpertAssessmentDetailsComponent implements OnInit {

  userTimeZone: string;
  loading: boolean = false;
  isShowAppoint = true;
  isShowDecline = false;
  joiningButtonText:string = '';
  optionalCls:any;
  assessmentId:any;
  activityDetails = {};
  expertassessmentRes:any;
  activityResultfromAppontment = [];
  activityFromUpload:any;
  expertNameFromList:any;
  objectLenght:any;
  IsasessmentDetailRow = false;
  isSqlLogoShow = false;
  isWnSqlLogoShow = false;
  serviceTypeName:any;
  preAssmentMapping = [];
  preRequisiteMapping = [];
  underReviewStatus:any;
  UnderAssessmentStatus:any;
  underCompletedStatus:any;
  bookingDateTime:any;
  constructor(
    private translateSrv: TranslateService,
    private formBuilder: FormBuilder,
    private storageService: StorageManageService,
    private config: NgbDatepickerConfig,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    public expertassessmentService: ExpertassessmentService, 
    private assesment: AssesmentSharedService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.assessmentId = this.route.snapshot.paramMap.get('assessmentId');
    this.joiningButtonText = this.translateSrv.instant('ASSESSMENT_DETAILS.ACCEPT_ASSESSMENT');
    this.expertassessmentService.getExpertAssessmentDetail(this.assessmentId).subscribe((responseBody:any)=>{
      if(responseBody?.status){
        this.expertassessmentRes = responseBody.result;
        this.preAssmentMapping = this.expertassessmentRes.preAssessmentMapping;
        this.preRequisiteMapping = this.expertassessmentRes.preRequisiteMapping;
        this.activityResultfromAppontment = this.expertassessmentRes.expertActivities;
        this.activityResultfromAppontment.map((itemExpert:any)=>{
          let innerExpertActivities = [];
          innerExpertActivities = itemExpert.expertActivities;
          innerExpertActivities.forEach((item)=>{
            this.expertNameFromList = item.expertName;
          })
        })
        this.activityDetails = {
          assessmedId:this.assessmentId,
          expertId: responseBody.result.expertId,
          expertName: this.expertNameFromList,
          assessmentRequesterName: responseBody.result.assessmentRequesterName,
          status: responseBody.result.status,
          timezoneName: responseBody.result.timezoneName,
          timezoneDescription: responseBody.result.timezoneDescription
        };
        if(this.expertassessmentRes.status == 1){
          this.underReviewStatus = "progress-bar";
        }
         if(this.expertassessmentRes.status == 2){
          this.underReviewStatus = "progress-bar";
          this.UnderAssessmentStatus = "progress-bar";
        }
        if(this.expertassessmentRes.status == 3){
          this.underReviewStatus = "progress-bar";
          this.UnderAssessmentStatus = "progress-bar";
          this.underCompletedStatus = "progress-bar";
        }
        let bookingTime = responseBody.result.bookingDate;
        this.bookingDateTime = bookingTime;
      }
      this.IsasessmentDetailRow = true;
      this.loading = false;
      this.cdRef.detectChanges();
    });
    (err) => {
      this.loading = false;
      this.cdRef.detectChanges(); // <== added
    };
  }

  changeStatusBg(value){
    if(value == 1){
      this.underReviewStatus = "progress-bar";
    }
    
  }

  changeStatusBgAs(value){
    if(value == 2){
      this.UnderAssessmentStatus = "progress-bar";
    }
  }

  dispatchActivityRes(result:any){
    this.activityFromUpload = result;
  }
  redirectToExpert(){
    this.router.navigate(['/experts/expert-assessment']);
  }
}
