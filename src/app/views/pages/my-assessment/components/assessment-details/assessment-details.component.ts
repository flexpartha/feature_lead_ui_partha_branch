import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "kt-assessment-details",
  templateUrl: "./assessment-details.component.html",
  styleUrls: ["./assessment-details.component.scss"],
})
export class AssessmentDetailsComponent implements OnInit {
  constructor(private el: ElementRef, private router: Router) {}
  isCollapsed = true;
  isCollapsed2 = false;
  ngOnInit(): void {
    const elements = this.el.nativeElement.querySelectorAll(".example");
    KTLayoutExamples.init(elements);
  }

  backToActiveAssessment() {
    this.router.navigateByUrl("assessment/active");
  }
}
