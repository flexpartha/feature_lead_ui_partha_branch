import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { AssessmentService } from "../../../../services/assessment/assessment.service";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AssesmentSharedService } from "@pages/my-assessment/assesment-shared.service";
@Component({
  selector: "kt-form-setup",
  templateUrl: "./form-setup.component.html",
  styleUrls: ["./form-setup.component.scss"],
})
export class FormSetupComponent implements OnInit {
  @Output() onStatusChange = new EventEmitter<boolean>();
  @Input() next: () => void = () => {};
  @Input() prev: () => void = () => {};
  loading: boolean = false;
  serviceTypes: any[] = [];
  form: any;
  google: "google.com";
  constructor(
    private assessmentService: AssessmentService,
    public formBuilder: FormBuilder,
    private assesment: AssesmentSharedService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      serviceTypeId: [
        this.assesment.getAssesment().serviceTypeId || "",
        Validators.required,
      ],
    });
  }
  onSuccess = (responseBody: any) => {
    if (responseBody?.status) {
      this.serviceTypes = responseBody?.result;
      this.loading = false;
      this.updateView();
    }
  };
  updateView() {
    this.cdr.detectChanges();
  }
  ngOnInit(): void {
    this.loading = true;
    this.assessmentService
      .getAllServiceType()
      .subscribe(this.onSuccess.bind(this));
  }
  onSelect(id: string, name: string) {
    this.form.controls[name].setValue(id);
    this.onStatusChange.emit(!!id);
  }
  isChecked(id: any) {
    return id == this.form.controls["serviceTypeId"].value;
  }
  onSubmit = (values: any) => {
    if (this.loading) {
      return;
    }
    if (!this.form.valid) {
      alert("Error");
    }
    this.loading = true;
    this.assessmentService.createAssessment(values).subscribe((res: any) => {
      if (res && res.result) {
        this.assesment.update(res.result, () => {
          this.next && this.next();
          this.updateView();
        });
      }
    });
  };
}
