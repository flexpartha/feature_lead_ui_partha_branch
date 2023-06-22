import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectorRef,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AssessmentService } from "src/app/views/services/assessment/assessment.service";
import { AuthService } from "src/app/views/services/auth/auth.service";
import { AssesmentSharedService } from "@pages/my-assessment/assesment-shared.service";
import * as moment from "moment";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { NgbDatepickerConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "kt-form-book-assesment",
  templateUrl: "./form-book-assesment.component.html",
  styleUrls: ["./form-book-assesment.component.scss"],
})
export class FormBookAssesmentComponent implements OnInit {
  loading: boolean = true;
  @Input() next: () => void = () => {};
  @Input() prev: () => void = () => {};
  form: any;
  bookingDate: any = {};
  time: any;
  timeZoneList: any;
  timeZoneId: number = 1;
  constructor(
    public formBuilder: FormBuilder,
    private assesmentService: AssessmentService,
    private assesment: AssesmentSharedService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService,
    private config: NgbDatepickerConfig
  ) {
    const current = new Date();
    config.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
    config.outsideDays = "hidden";
  }
  onSubmit() {
    var dateObj = new Date(
      this.bookingDate.year,
      this.bookingDate.month - 1,
      this.bookingDate.day,
      this.time.hour,
      this.time.minute
    );
    let payload: any = {
      ...this.assesment.getAssesment(),
      bookAssessment: {
        timezoneId: this.timeZoneId,
        languageId: 1,
        expertId: 1,
        bookingDate: dateObj,
        assessmentId: this.assesment.getAssesment().id,
      },
    };
    this.assesmentService.createAssessment(payload).subscribe(
      (res) => {
        this.router.navigateByUrl("/assessment");
      },
      () => {
        // alert("Error");
      }
    );
  }

  onFetch = ({ booking, timeZone }) => {
    this.loading = false;
    this.cdr.detectChanges();
    if (booking && booking.result) {
      let data = booking.result;
      if (data && data.bookingDate) {
        var dateObj = new Date(moment.utc(data.bookingDate).local().format());
        this.bookingDate.year = dateObj.getFullYear();
        this.bookingDate.month = dateObj.getMonth() + 1;
        this.bookingDate.day = dateObj.getDate();
        this.time = {
          hour: dateObj.getHours(),
          minute: dateObj.getMinutes(),
        };
      }
      this.timeZoneId = data?.timezoneId;
      this.cdr.detectChanges();
    }
    if (timeZone && timeZone.result) {
      this.timeZoneList = timeZone.result;
      this.cdr.detectChanges();
    }
  };
  ngOnInit(): void {
    let data = this.assesment.getAssesment();
    data &&
      forkJoin({
        booking: this.assesmentService.getBookAssessment(data.id),
        timeZone: this.authService.getTimeZone(),
      }).subscribe(this.onFetch);
  }

  displayTimeZone(timeZone) {
    return `${timeZone?.name} (${timeZone?.description})`;
  }
}
