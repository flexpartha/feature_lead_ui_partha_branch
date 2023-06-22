import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDatepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ExpertassessmentService } from 'src/app/views/services/expert-assessment/expertassessment.service';
import { StorageManageService } from 'src/app/views/services/storageservice/storage.service';
import * as moment from "moment";
import * as momentTimeZone from "moment-timezone";
@Component({
  selector: 'kt-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  declineFormGrp:FormGroup;
  submitActivityFormGrp:FormGroup;
  isdeclined = false;
  issubmittedActivity = false;
  @Input() activitydetails:any = {};
  @Input() bookingDateTime:any;
  activityResult:any;
  bookingTm:any;
  weekdaysName:any;
  currentDate:any;
  currentctimestamp :any;
  userTimeZone:string;
  UTCbookingTime:any;
  UTCbookingTimeLocal:any;
  UTCWeekdays:any;
  zone: string;
  timezneDescription
  isShowAppoint = true;
  isShowDecline = false;
  isSubmitFilesSec = false;
  isJoinggrey = false;
  isJoingBlue = false;
  isSubmitFiles = false;
  isShowDeclineLink = true;
  isRecheduleMeeting = false;
  assessmentButtonText:string = '';
  joiningButtonText:string = '';
  optionalCls:any;
  assessmentId:any;
  counter:number = 1;
  fileLoader : boolean = false;
  declineLoader :boolean = false;
  uploadedFiles = [];
  fileList:any;
  blobUrls:any;
  @Output() changeStatusBg:EventEmitter<any> = new  EventEmitter();
  @Output() changeStatusBgAs:EventEmitter<any> = new  EventEmitter();
  @Output() dispatchActivity:EventEmitter<any> = new  EventEmitter();

  @ViewChild('uploadActivities',{static:false}) activities:any;

  constructor(
    private translateSrv: TranslateService,
    private formBuilder: FormBuilder,
    private storageService: StorageManageService,
    private config: NgbDatepickerConfig,
    private route: ActivatedRoute,
    private router: Router,
    private experAssessmentService:ExpertassessmentService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.assessmentButtonText = this.translateSrv.instant('ASSESSMENT_DETAILS.ACCEPT_ASSESSMENT');
    this.userTimeZone = this.activitydetails.timezoneName;
    this.timezneDescription = this.activitydetails.timezoneDescription;
    this.currentDate = new Date();
    this.currentctimestamp = this.currentDate.getTime();
    this.createSubmitActivityForm();
    if(this.activitydetails.status == 0){
      this.isShowAppoint = true;
      this.UTCbookingTimeLocal = moment.utc(this.bookingDateTime).local().format();
      let bookingTimeStamp = new Date(this.UTCbookingTimeLocal)
      if(this.currentctimestamp >= bookingTimeStamp.getTime()){
        this.isJoinggrey = false;
        this.isJoingBlue = true;
      }
      else{
        this.isJoinggrey = true;
        this.isJoingBlue = false;
      }
    }
    if(this.activitydetails.status == 1){
      this.isShowAppoint = false;
      this.isSubmitFiles = false;
      this.UTCbookingTimeLocal = moment.utc(this.bookingDateTime).local().format();
      let bookingTimeStamp = new Date(this.UTCbookingTimeLocal)
      if(this.currentctimestamp >= bookingTimeStamp.getTime()){
        this.isJoinggrey = false;
        this.isJoingBlue = true;
      }
      else{
        this.isJoinggrey = true;
        this.isJoingBlue = false;
      }
    }
    if(this.activitydetails.status == 2){
      this.isShowAppoint = false;
      this.isSubmitFiles = true;
    }
    //this.userTimeZone = momentTimeZone.tz.guess();
    //this.zone = momentTimeZone.tz(this.userTimeZone).format("Z");
  }

  createDeclineForm(){
    this.declineFormGrp = this.formBuilder.group({
      declineReson: new FormControl()
    })
  }

  createSubmitActivityForm(){
    this.submitActivityFormGrp = this.formBuilder.group({
      description: new FormControl()
    })
  }

  decline(){
      this.isdeclined =true
      this.declineFormGrp.get('declineReson')?.setValidators([Validators.required]);
      this.declineFormGrp.get('declineReson')?.updateValueAndValidity();
      if(this.declineFormGrp.invalid){
        return;
      }
      else{
        this.declineLoader = true;
        let requestBody ={
          "userId": this.activitydetails.expertId,
          "status": 5,
          "reason": this.declineFormGrp.get('declineReson')?.value
        }
        console.log("REQUEST BODY",requestBody);
        // this.experAssessmentService.createMeetingStatus(this.activitydetails.assessmedId,requestBody).subscribe((res)=>{
        //   this.declineLoader = false;
        // })
        this.router.navigate(['/experts/declined'])
      }
  }

  get f() { return this.declineFormGrp.controls; }
  get s() { return this.submitActivityFormGrp.controls; }
  
  submitActivityFiles(){
    this.issubmittedActivity = true;
    this.submitActivityFormGrp.get('description')?.setValidators([Validators.required]);
      this.submitActivityFormGrp.get('description')?.updateValueAndValidity();
      if(this.submitActivityFormGrp.invalid){
        return;
      }
      else{
       this.declineLoader = true;
        let requestBody ={
          "assessmentId": this.activitydetails.assessmedId,
          "expertId": this.activitydetails.expertId,
          "name": this.activitydetails.assessmentRequesterName,
          "expertName": this.activitydetails.expertName,
          "description": this.submitActivityFormGrp.get('description')?.value,
          "status": this.activitydetails.status,
          "activityDate": new Date(),
          "fileURLs": JSON.stringify(this.blobUrls)
        };
        console.log("ReqBody:::--",requestBody);
        this.experAssessmentService.createExpertActivity(this.activitydetails.assessmedId,requestBody).subscribe((res:any)=>{
          console.log("Result:::--",res);
          console.log("Result file url:::--",JSON.parse(res.result.fileURLs));
          this.declineLoader = false;
          this.isSubmitFilesSec = false;
          this.isSubmitFiles = true;
          this.activityResult = res.result;
          this.dispatchActivity.emit(this.activityResult);
          window.location.reload();
        })
      }
  }
  declineMeeting(){
    this.isShowAppoint = false;
    this.isShowDeclineLink = false;
    this.isShowDecline = true;
  }
  back(){
    this.isShowAppoint = true;
    this.isShowDecline = false;
    this.isShowDeclineLink = true;
  }

  acceptAssessment(){
    this.declineLoader = true;
    let requestBody ={
      "userId": this.activitydetails.expertId,
      "status": 1,
      "reason": ""
    }
    this.isRecheduleMeeting = true;
    this.isShowDeclineLink = false;
    this.isShowAppoint = false;
    this.experAssessmentService.createMeetingStatus(this.activitydetails.assessmedId,requestBody).subscribe((res:any)=>{
      if(res.message =="Success"){
        this.declineLoader = false;
        this.changeStatusBg.emit(1);
      }
    })
  }
  
  joiningMeetingGray(){
    this.joiningButtonText = this.translateSrv.instant('ASSESSMENT_DETAILS.JOIN_MEETING');
    this.isJoinggrey = false;
    this.isJoingBlue = true;
    this.isRecheduleMeeting = false;
    this.changeStatusBgAs.emit(2);
  }

  joinMeeting(){
    this.declineLoader = true;
    this.takeUserToTeams();
    this.isSubmitFiles = true;
    this.isJoingBlue = false;
    let requestBody ={
      "userId": this.activitydetails.expertId,
      "status": 2,
      "reason": ""
    }
    this.experAssessmentService.createMeetingStatus(this.activitydetails.assessmedId,requestBody).subscribe((res:any)=>{
      if(res.message =="Success"){
        this.declineLoader = false;
        this.changeStatusBgAs.emit(2);
      }
    })
  }
  submitFiles(){
    this.isSubmitFilesSec = true;
    this.isSubmitFiles = false;
    //this.modalService.open(this.activities, { size: 'md' });
  }
  dismissModal(){
    this.modalService.dismissAll();
  }

  onChangeHandler(file) {
    this.fileLoader = true;
    this.cdr.detectChanges();
    const formData = new FormData();
    for (let i = 0; i < file?.length; i++) {
      this.fileList = file[i].name;
      this.uploadedFiles.push(file[i].name);
      console.log(file[i].name);
      formData.append("file[]", file[i]);
    }
    this.experAssessmentService
      .uploadFile(formData,this.activitydetails.assessmedId)
      .subscribe((responseBody: any) => {
        if (responseBody?.status) {
          this.blobUrls = responseBody?.result?.blobUrls;
          this.dismissModal();
        }
        this.fileLoader = false;
        this.cdr.detectChanges();
      }),
      (err) => {
        this.fileLoader = false;
        this.cdr.detectChanges();
      };
  }

  removeFile(idx:number){
    this.uploadedFiles.splice(idx,1);
  }

  takeUserToTeams(){
    window.open('http://teams.microsoft.com/l/chat/0/0?users=someone@domain.com',"_blank");
  }

  getFormattedTime(time) {
    if (time) {
      return momentTimeZone
        .tz(moment.utc(time), this.userTimeZone)
        .format("hh:mm A");
    } else {
      return "Not Booked";
    }
  }

  getFormattedDate(time) {
    if (time) {
      let timeStamp = momentTimeZone.tz(moment(time), this.userTimeZone).format("dddd DD MMM YYYY");
      return timeStamp;
    } else {
      return "Not Booked";
    }
  }
}
