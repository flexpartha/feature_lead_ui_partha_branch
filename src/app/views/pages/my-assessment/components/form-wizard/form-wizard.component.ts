import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AssesmentSharedService } from "@pages/my-assessment/assesment-shared.service";
import Wizard from "src/assets/plugins/formvalidation/src/js/plugins/Wizard";

@Component({
  selector: "kt-form-wizard",
  templateUrl: "./form-wizard.component.html",
  styleUrls: ["./form-wizard.component.scss"],
})
export class FormWizardComponent implements OnInit {
  @ViewChild("wizard", { static: true }) el: ElementRef;
  step: number = 1;
  wizard: any;
  disabled: boolean = true;
  serviceTypeId: any;
  assessmentId: any;
  isAssessmentDetailsPage: any;
  visibility: boolean = false;
  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private assesment: AssesmentSharedService,
    private router: Router
  ) {
    this.serviceTypeId = this.route.snapshot.paramMap.get("serviceTypeId");
    this.assessmentId = this.route.snapshot.paramMap.get("assessmentId");
    if (this.serviceTypeId && this.assessmentId) {
      this.assesment.update({
        serviceTypeId: this.serviceTypeId,
        assessmentId: this.assessmentId,
        editMode: true,
      });
    }
  }
  isEditMode() {
    return (
      this.route.snapshot.paramMap.get("serviceTypeId") &&
      this.route.snapshot.paramMap.get("assessmentId")
    );
  }
  ngOnInit(): void {
    this.isAssessmentDetailsPage =
      this.serviceTypeId && this.assessmentId ? true : false;
  }

  ngOnDestroy() {
    this.assesment.clear();
  }
  ngAfterViewInit() {
    this.wizard = new KTWizard(this.el?.nativeElement, {
      startStep: this.step,
    });
    this.wizard.on("change", this.onWizardChange);
  }
  onWizardChange = ({ currentStep }: any) => {
    this.step = currentStep || 1;
    if (this.step === 3) {
      this.visibility = true
    } else {
      this.visibility = false
    }
    this.cdr.detectChanges();
  };
  next = () => {
    this.wizard && this.wizard.goNext(true);
  };
  prev = () => {
    this.wizard && this.wizard.goPrev(true);
  };
  goTo = (index: number) => {
    this.wizard && this.wizard.goTo(index, true);
  };
  onStatusChange = () => {
    this.disabled = false;
  };
  backToAssessmentPage() {
    this.router.navigateByUrl("/assessment");
  }
}
