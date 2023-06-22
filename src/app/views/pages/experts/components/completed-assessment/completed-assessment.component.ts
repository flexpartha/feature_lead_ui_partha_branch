import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDatepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ExpertassessmentService } from 'src/app/views/services/expert-assessment/expertassessment.service';
import { StorageManageService } from 'src/app/views/services/storageservice/storage.service';

@Component({
  selector: 'kt-completed-assessment',
  templateUrl: './completed-assessment.component.html',
  styleUrls: ['./completed-assessment.component.scss']
})
export class CompletedAssessmentComponent implements OnInit {

  isShowNodata:boolean = false;
  loading = false;
  experId: string = JSON.parse(this.storageService.get("userInfo"))?.id;
  completedAssignments = [];
  constructor(
    private translateSrv: TranslateService,
    private formBuilder: FormBuilder,
    private storageService: StorageManageService,
    private config: NgbDatepickerConfig,
    private route: ActivatedRoute,
    private router: Router,
    private experAssessmentService:ExpertassessmentService,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.getAllCompletedAssessment();
  }

  getAllCompletedAssessment(){
    this.loading = true;
    this.experAssessmentService.completedAssessments(this.experId).subscribe((completedRes:any)=>{
      if(completedRes?.status){
        this.completedAssignments = completedRes?.result;
      }
      this.loading = false;
      this.cdRef.detectChanges(); // <== added
      if(this.completedAssignments.length > 0){
        this.isShowNodata = false;
        console.log("length > 0")
      }
      else{
        this.isShowNodata = true;
        console.log("length = 0")
      }
    }),
    (err) => {
      this.loading = false;
      this.cdRef.detectChanges(); // <== added
    };
  }
}
