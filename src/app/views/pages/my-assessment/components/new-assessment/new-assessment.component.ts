import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AssessmentService } from "../../../../services/assessment/assessment.service";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StorageManageService } from "src/app/views/services/storageservice/storage.service";
import { forkJoin } from "rxjs";
import { NgbDatepickerConfig } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

@Component({
  selector: "kt-new-assessment",
  templateUrl: "./new-assessment.component.html",
  styleUrls: ["./new-assessment.component.scss"],
})
export class NewAssessmentComponent implements OnInit, AfterViewInit {
  @ViewChild("wizard", { static: true }) el: ElementRef;
  submitted = false;
  serviceTypes: any;
  loading: boolean = false;
  preRequisites: any;
  preRequisiteMappingFields: any;
  preAssessments: any;
  serviceTypeId: string;
  currentStep: number;
  userId: string = JSON.parse(this.storageService.get("userInfo")).id;
  assessmentId: any;
  time = { hour: 12, minute: 0 };
  bookingDate: any;
  constructor(
    private assessmentService: AssessmentService,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private storageService: StorageManageService,
    private config: NgbDatepickerConfig,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const current = new Date();
    config.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
    config.outsideDays = "hidden";
  }
  newAssessmentForm = this.formBuilder.group({});
  preRequisiteMapping: any = [];
  preAssessmentMapping: any = [];
  bookAssessment: any;
  isAssessmentDetailsPage: boolean = false;
  saveText: string = "save";
  files: any = [];
  fileUploadLoader: boolean = false;

  ngOnInit() {
    this.serviceTypeId = this.route.snapshot.paramMap.get("serviceTypeId");
    this.assessmentId = this.route.snapshot.paramMap.get("assessmentId");
    this.isAssessmentDetailsPage =
      this.route.snapshot.paramMap.get("serviceTypeId") &&
      this.route.snapshot.paramMap.get("assessmentId")
        ? true
        : false;
    this.loading = true;
    this.assessmentService
      .getAllServiceType()
      .subscribe((responseBody: any) => {
        if (responseBody?.status) {
          this.serviceTypes = responseBody?.result;
          this.loading = false;
          // if (!this.serviceTypeId || !this.serviceTypeId?.length) {
          //   this.serviceTypeId = this.serviceTypes[0]?.id
          // }
          this.cdRef.detectChanges(); // <== added
        }
      }),
      (err) => {};
  }

  ngAfterViewInit(): void {
    // Initialize form wizard
    const wizard = new KTWizard(this.el?.nativeElement, {
      startStep: 1,
    });
    console.log( wizard , 'WIZARD' )
    // Change event
    wizard.on("change", (event) => {
      this.currentStep = event?.currentStep;
      if (this.currentStep === 2 && this.serviceTypeId) {
        this.loading = true;
        setTimeout(() => {
          this.assessmentService
            .getAllPrerequisites(this.serviceTypeId)
            .subscribe((responseBody: any) => {
              if (responseBody?.status) {
                this.preRequisites = responseBody?.result;
                this.assessmentService
                  .getAllPreRequisitesMapping(this.assessmentId )
                  .subscribe((responseBody1: any) => {
                    if (responseBody1?.status) {
                      responseBody1?.result.map((dt1) => {
                        let preRequisiteData: any = {
                          assessmentId: this.assessmentId,
                          preRequisiteId: dt1.preRequisiteId,
                          answer: dt1.answer,
                        };
                        this.preRequisiteMapping.push(preRequisiteData);
                      });
                      this.loading = false;
                      this.preRequisites.map((dt) => {
                        let selectedAnswer: string;
                        this.preRequisiteMapping.map((dta) => {
                          if (dta.preRequisiteId == dt.id) {
                            selectedAnswer = dta.answer;
                          }
                        });
                        dt.selectedAnswer = selectedAnswer;
                        dt.answersArray =
                          dt.answers === "" ? [] : JSON.parse(dt.answers);
                      });
                      this.cdRef.detectChanges(); // <== added
                    }
                  });

                // this.preRequisiteMapping = preReq || [];
                // console.log(this.preRequisiteMapping);

                this.cdRef.detectChanges(); // <== added
              }
            });
        }, 3000);

        // forkJoin(
        //   this.assessmentService.getAllPrerequisites(this.serviceTypeId),
        //   this.assessmentService.getAllPreRequisitesMapping(
        //     this.assessmentId,
        //     this.userId
        //   )
        // ).subscribe(([call1Response, call2Response]) => {
        //   let resp1: any = call1Response;
        //   let resp2: any = call2Response;
        //   this.preRequisites = resp1?.result;
        //   if (resp2.status) {
        //     resp2?.result.map((dt) => {
        //       let preRequisteData: any = {
        //         assessmentId: this.assessmentId,
        //         preRequisiteId: dt.preRequisteId,
        //         answer: dt.answer,
        //       };
        //       this.preRequisiteMapping.push(preRequisteData);
        //     });
        //     this.loading = false;
        //     let preReq = [];
        //     this.preRequisites.map((dt) => {
        //       let selectedAnswer: string;
        //       this.preRequisiteMapping.map((dta) => {
        //         if (dta.preRequisiteId == dt.Id) {
        //           selectedAnswer = dta.answer;
        //         }
        //       });
        //       dt.selectedAnswer = selectedAnswer;
        //       dt.answersArray = dt.answers === "" ? [] : JSON.parse(dt.answers);

        //       preReq = [
        //         ...preReq,
        //         {
        //           preRequisite: dt,
        //         },
        //       ];
        //     });
        //   }
        // }),
        //   (err) => {};
      } else if (this.currentStep === 3 && this.serviceTypeId) {
        console.log(this.preRequisites);
        this.loading = true;
        setTimeout(() => {
          this.assessmentService
            .getAllPreAssessments(this.serviceTypeId)
            .subscribe((responseBody: any) => {
              if (responseBody?.status) {
                this.preAssessments = responseBody?.result;
                this.assessmentService
                  .getAllPreAssessmentsMapping(this.assessmentId )
                  .subscribe((responseBody1: any) => {
                    if (responseBody1?.status) {
                      responseBody1?.result.map((dt1) => {
                        let preAssessmentData: any = {
                          assessmentId: this.assessmentId,
                          preAssessmentId: dt1.preAssessmentId,
                          answer: dt1.answer,
                        };
                        this.preAssessmentMapping.push(preAssessmentData);
                      });
                      this.loading = false;
                      this.preAssessments.map((dt) => {
                        let selectedAnswer: string;
                        let uploadedFiles: string;
                        this.preAssessmentMapping.map((dta) => {
                          if (dta.preAssessmentId == dt.id) {
                            selectedAnswer = dta.answer;
                          }
                          if (dta.fileUploadUrls?.length) {
                            uploadedFiles = dta.fileUploadUrls;
                          }
                        });
                        dt.selectedAnswer = selectedAnswer;
                        dt.answersArray =
                          dt.answers === "" ? [] : JSON.parse(dt.answers);
                      });
                      this.cdRef.detectChanges(); // <== added
                    }
                  });

                // this.preRequisiteMapping = preReq || [];
                // console.log(this.preRequisiteMapping);

                this.cdRef.detectChanges(); // <== added
              }
            }),
            (err) => {};
        }, 3000);
      } else if (this.currentStep === 4 && this.serviceTypeId) {
        this.loading = true;
        this.assessmentService
          .getBookAssessment(this.assessmentId )
          .subscribe((responseBody: any) => {
            this.loading = false;
            if (responseBody.status) {
              if (responseBody.result) {
                var dateObj = new Date(
                  moment.utc(responseBody.result.bookingDate).local().format()
                );
                this.bookingDate = {};
                this.bookingDate.year = dateObj.getFullYear();
                this.bookingDate.month = dateObj.getMonth() + 1;
                this.bookingDate.day = dateObj.getDate();
                this.time = {
                  hour: dateObj.getHours(),
                  minute: dateObj.getMinutes(),
                };
              }
              this.cdRef.detectChanges(); // <== added
            }
          });
      } else if (this.currentStep === 1) {
        this.loading = false;
        this.cdRef.detectChanges(); // <== added
      }
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  }

  onSubmit(type: string = "next") {
    
      this.loading = true;
    if (type == "save" || (type == "topSave" && this.currentStep === 4)) {
      var dateObj = new Date(
        this.bookingDate.year,
        this.bookingDate.month - 1,
        this.bookingDate.day,
        this.time.hour,
        this.time.minute
      );

      this.bookAssessment = {};
      this.bookAssessment.assessmentId = this.assessmentId;
      this.bookAssessment.timezoneId = 1;
      this.bookAssessment.expertId = 1;
      this.bookAssessment.languageId = 1;
      this.bookAssessment.bookingDate = dateObj;
    }
    const assessmentDetails: any = {
      serviceTypeId: this.serviceTypeId,
      userId: this.userId,
      status: 0,
      preRequisiteMapping: this.preRequisiteMapping?.length
        ? this.preRequisiteMapping
        : [],
      preAssessmentMapping: this.preAssessmentMapping?.length
        ? this.preAssessmentMapping
        : [],
      bookAssessment: this.bookAssessment ? this.bookAssessment : null,
    };
    if (this.assessmentId !== null && this.assessmentId !== undefined) {
      assessmentDetails.id = this.assessmentId;
    }
    this.assessmentService
      .createAssessment(assessmentDetails)
      .subscribe((responseBody: any) => {
        this.cdRef.detectChanges(); // <== added
        if (responseBody?.status) {
          this.assessmentId = responseBody.result?.id;
          if (type == "save" || type == "topSave") {
            this.router.navigate(["assessment"]);
          }
        }
      }),
      (err) => {};
     
  }

  onSelect(answer, index, dataType, inputType) {
    if (dataType === "serviceTypeId") {
      this.serviceTypeId = answer;
    } else if (dataType === "preRequisite") {
      var existing = this.preRequisiteMapping?.filter(function (element) {
        return element.preRequisiteId == index;
      }).length;
      if (existing > 0) {
        this.preRequisiteMapping?.map((dt) => {
          if (dt.preRequisite?.id === index) {
            dt.answer = answer;
          }
        });
      } else {
        let preRequisteData: any = {
          assessmentId: this.assessmentId,
          preRequisiteId: index,
          answer: answer,
        };
        this.preRequisiteMapping.push(preRequisteData);
      }
    } else if (dataType === "preAssessment") {
      let isChecked = answer.target.checked;
      let checkedString = isChecked ? "true" : "false";
      var existing = this.preAssessmentMapping?.filter(function (element) {
        return element.preAssessmentId == index;
      }).length;
      if (existing > 0) {
        this.preAssessmentMapping?.map((dt) => {
          if (dt.preAssessmentId === index) {
            dt.answer = checkedString;
          }
        });
      } else {
        let preAssessmentData: any = {
          assessmentId: this.assessmentId,
          preAssessmentId: index,
          answer: checkedString,
        };
        this.preAssessmentMapping.push(preAssessmentData);
      }
    }
  }
  backToAssessmentPage() {
    this.router.navigateByUrl("/assessment");
  }

  onPrevious() {
    this.loading = true;
    this.cdRef.detectChanges();
  }
}
