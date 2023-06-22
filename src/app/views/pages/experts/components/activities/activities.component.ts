import { Component, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { AssesmentSharedService } from '@pages/my-assessment/assesment-shared.service';
import * as moment from "moment";
import * as momentTimeZone from "moment-timezone";
import { saveAs } from 'file-saver';

@Component({
  selector: 'kt-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements  OnInit, OnChanges {

  //@Input() activities:any;
  @Input() ActivitiesList = [];
  @Input() activitityObj:any;
  @Input() activitydetails:any;
  filesArr = [];
  isShowNodata = true;
  userTimeZone:string;
  isCollapsed = false;
  isCollapsed2 = false;
  daysMonth:any;
  constructor(private assesment: AssesmentSharedService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.userTimeZone = this.activitydetails.timezoneName;
    if(this.activitityObj == null){
      if(this.ActivitiesList){
        this.ActivitiesList.map((activity:any)=>{
          let expertActivity = [];
          expertActivity = activity.expertActivities;
          expertActivity.map((findfileurl:any)=>{
            let fileUrlsData = JSON.parse(findfileurl.fileURLs);
            let urls:any=[];
            let fullUrl = [];
            fileUrlsData.forEach(url => {
          var copyUrl= url.split("_").pop();
          urls.push(copyUrl);
          fullUrl.push(url)
          findfileurl.urlLst = urls;
          findfileurl.fullurlList = fullUrl;
         });
        })
        });
        if(this.ActivitiesList.length > 0){
          this.isShowNodata = false;
        }
      }
    }
    if(this.activitityObj != null){
      if(this.ActivitiesList){
        this.ActivitiesList.map((activity:any)=>{
          let expertActivity = [];
          expertActivity = activity.expertActivities;
          let activityDatefrmres = moment.utc(activity.activityDate).format("DD");
          let currentUploadDate = moment(new Date()).format("DD");
          if(activityDatefrmres == currentUploadDate){
            expertActivity.push(this.activitityObj);
            expertActivity.map((findfileurl:any)=>{
              let fileUrlsData = JSON.parse(findfileurl.fileURLs);
              let urls:any=[];
              let fullUrl = [];
              fileUrlsData.forEach(url => {
              var copyUrl= url.split("_").pop();
              urls.push(copyUrl);
              fullUrl.push(url)
              findfileurl.urlLst = urls;
              findfileurl.fullurlList = fullUrl;
             });
            });
          }
        });
        if(this.ActivitiesList.length > 0){
          this.isShowNodata = false;
        }
      }
    }
  }

  getFileName(url:any){
    return url.split("_").pop();
  }
  getFormattedTime(time) {
    if (time) {
      return momentTimeZone
        .tz(moment.utc(time), this.userTimeZone).local()
        .format("hh:mm a");
    } else {
      return "Not Booked";
    }
  }

  getFormattedDate(time) {
    if (time) {
      return momentTimeZone.tz(moment(time), this.userTimeZone).format("DD MMM YYYY");
    } else {
      return "Not Booked";
    }
  }

  getFormatedHeaderDate(time){
    if (time) {
      return moment.utc(time).format("DD MMM");
      //return momentTimeZone.tz(moment(time), this.userTimeZone).format("DD MMM");
    } else {
      return "Not Booked";
    }
  }

  downloadFile(linkUrl:any) {
    saveAs(linkUrl, linkUrl?.split("_").pop());
    // console.log(linkUrl);
    // const link = this.renderer.createElement('a');
    // link.setAttribute('target', '_blank');
    // link.setAttribute('href', linkUrl);
    // link.setAttribute('download', decodeURI(linkUrl?.split("_").pop()));
    // document.body.appendChild(link);
    // link.click();
  }
}
