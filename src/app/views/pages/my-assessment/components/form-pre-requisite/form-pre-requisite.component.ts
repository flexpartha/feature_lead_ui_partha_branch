import { Component, OnInit, Input, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";
import { AssessmentService } from "../../../../services/assessment/assessment.service";
import { AssesmentSharedService } from "@pages/my-assessment/assesment-shared.service";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { forkJoin } from "rxjs";
@Component({
  selector: "kt-form-pre-requisite",
  templateUrl: "./form-pre-requisite.component.html",
  styleUrls: ["./form-pre-requisite.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FormPreRequisiteComponent implements OnInit {
  loading: boolean = true;
  preRequisites: any[] = [];
  preRequisiteMapping: any;
  serviceTypeId: string = "2";
  assessmentId: number = 2;
  userId: string = "90";
  test: number = 0;
  // New
  form: any = false;
  submitted: boolean = false;
  @Input() next: () => void = () => {};
  @Input() prev: () => void = () => {};

  constructor(
    private assessmentService: AssessmentService,
    private assesment: AssesmentSharedService,
    private cdr: ChangeDetectorRef,
    public formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({});
  }
  ngOnInit(): void {
    let data = this.assesment.getAssesment();
    if (data && data.serviceTypeId) {
      forkJoin({
        requisite: this.assessmentService.getAllPrerequisites(
          data.serviceTypeId
        ),
        requsiteMapping: this.assessmentService.getAllPreRequisitesMapping(
          data.id
        ),
      }).subscribe(this.onFetch);
    }
  }
  onFetch = ({ requisite, requsiteMapping }): void => {
    if (requisite && requisite.result) {
      let result = requisite.result;
      try {
        result = result.map(this.assesment.formatAnswers);
      } catch (e) {}

      this.preRequisites = result;
      this.buildForm(result, requsiteMapping.result || []);
      this.loading = false;
      this.cdr.detectChanges();
    }
    this.loading = false;
  };

  buildForm = (list: any, mapping: any): void => {
    let schema: Record<string, any[]> = {};
    list &&
      list.forEach((item, index) => {
        let mappedItem = mapping.find((obj) => obj.preRequisiteId == item.id);
        let name = this.generateId(item.id);
        schema[name] = [
          (mappedItem && mappedItem.answer) || "",
          item.isMandatory ? Validators.required : null,
        ];
      });
    this.form = this.formBuilder.group(schema);
  };
  generateId = (id: number): string => {
    return `${id}`;
  };
  scrollToErrorField() {
    var ele = document.getElementsByClassName("has-error");
     ele && ele.length && KTUtil.scrollTo(ele[0] , 50 );
  }
  onSubmit = (values: any) => {
    this.submitted = true;
    if (!this.form.valid) {
      this.scrollToErrorField();
      return;
    }
    const payload = this.assesment.getAssesment();
    if (values && Object.keys(values).length) {
      let preRequisiteMapping = Object.keys(values).map((keyName) => {
        return {
          assessmentId: payload.id,
          preRequisiteId: keyName,
          answer: values[keyName],
        };
      });
      payload["preRequisiteMapping"] = preRequisiteMapping;
    }
    this.submitted = false;
    this.loading = true;
    this.assessmentService.createAssessment(payload).subscribe((res) => {
      this.loading = false;
      this.next && this.next();
      this.assesment.update(payload);
    });
    return;
  };
  hasErrors = (id: number): boolean => {
    let fieldName = this.generateId(id);
    let field = this.form.get(fieldName);
    if (field && field.status === "INVALID") {
      if (
        (this.submitted || field.dirty || field.touched) &&
        field.errors &&
        field.errors.required
      ) {
        return !0;
      }
    }
    return !1;
  };
}
