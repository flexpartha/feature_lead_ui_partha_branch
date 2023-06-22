import { Component, OnInit, Input, ChangeDetectorRef, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import { AssesmentSharedService } from "@pages/my-assessment/assesment-shared.service";
import { AssessmentService } from "src/app/views/services/assessment/assessment.service";
import { forkJoin } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: "kt-form-pre-assesment",
  templateUrl: "./form-pre-assesment.component.html",
  styleUrls: ["./form-pre-assesment.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FormPreAssesmentComponent implements OnInit {
  @Input() next: () => void = () => {};
  @Input() prev: () => void = () => {};

  preAssessments: any = [];
  loading: boolean = true ;
  form: any;
  fileLoader : boolean = false;
  submitted: boolean = false;
  mandatoryPreAssIds: any = [];
  showInfoTile: boolean = false;
  constructor(
    private assesmentServive: AssessmentService,
    private assesment: AssesmentSharedService,
    private cdr: ChangeDetectorRef,
    public formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      checkList: [[], null],
    });
  }

  scrollToErrorField() {
    var ele = document.getElementsByClassName("has-error");
     ele && ele.length && KTUtil.scrollTo(ele[0] , 50 );
  }

  isValid(arr: any, target: any) {
    return target.every(v => arr.includes(v))
  }

  onSubmit = (values) => {
    this.submitted = true;
    let field = this.form.get("checkList").value;

    // if (!this.isValid(field, this.mandatoryPreAssIds)) {
    //   this.scrollToErrorField();
    //   return;
    // }
    let payload = this.assesment.getAssesment();
    var preAssesmentList = [];
    // if (values && values.checkList) {
    if (this.preAssessments && this.preAssessments.length) {
      let selectedItems = this.form.get("checkList").value;
      this.preAssessments.forEach((item) => {
        preAssesmentList.push({
          preAssessmentId: item.id,
          answer: selectedItems.indexOf(item.id) > -1 ? "true" : "false",
          assessmentId: payload.id,
          fileUploadUrls: JSON.stringify(this.assesment.getBlobUrlArray(item?.fileUploadArray))
        });
      });
      payload["preAssessmentMapping"] = preAssesmentList;
    }
    this.loading = true ;
    this.assesmentServive.createAssessment(payload).subscribe(this.onSave);
    this.assesment.update(payload);
  };
  onChange = ($event, id) => {
    let currentValue = this.form.get("checkList").value;
    let isChecked = $event.target.checked;
    if (!isChecked) {
      currentValue.splice(currentValue.indexOf(id), 1);
    } else {
      currentValue.push(id);
    }
    this.form.get("checkList").setValue(currentValue);
  };
  onSave = () => {
    this.loading = false ;
    this.next && this.next();
  };
  onFetch = ({ assesment, mapping }) => {
    this.loading = false;
    if (assesment && assesment.result) {
      this.preAssessments = assesment.result.map((item) => this.assesment.formatAnswersAndFileName(item, mapping?.result));
    }
    if (mapping && mapping.result) {
      let selectedItems = [];
      mapping.result.forEach((item) => {
        if (item.answer === "true") {
          selectedItems.push(item.preAssessmentId);
        }
      });
      if (selectedItems.length) {
        this.form.get("checkList").setValue(selectedItems);
      }
      // this.setMandatoryFields(this.preAssessments);
    }
    this.cdr.detectChanges();
    this.loading = false ;
  };

  setMandatoryFields = (list: any): void => {
    list &&
      list.forEach((item, index) => {
        if ( item.isMandatory) {
          this.mandatoryPreAssIds?.push(item.id);
          this.cdr.detectChanges();
        }
      });
  };

  generateId = (id: number): string => {
    return `${id}`;
  };

  isChecked = (id: string | number) => {
    return this.form.get("checkList")?.value?.indexOf(id) > -1;
  };
  ngOnInit(): void {
    let data = this.assesment.getAssesment();
    forkJoin({
      assesment: this.assesmentServive.getAllPreAssessments(data.serviceTypeId),
      mapping: this.assesmentServive.getAllPreAssessmentsMapping(data.id),
    }).subscribe(this.onFetch);
  }

  
  onChangeHandler(file, id) {
    this.fileLoader = true;
    this.cdr.detectChanges();
    const formData = new FormData();
    for (let i = 0; i < file?.length; i++) {
      formData.append("file[]", file[i]);
    }
    this.assesmentServive
      .uploadFile(formData)
      .subscribe((responseBody: any) => {
        if (responseBody?.status) {
          const blobUrls = responseBody?.result?.blobUrls;
          this.preAssessments?.map((dt) => {
            if (dt.id === id) {
              dt.fileUploadArray?.push(...this.assesment.getUploadFileArray(blobUrls));
            }
          });
        }
        this.fileLoader = false;
        this.cdr.detectChanges();
      }),
      (err) => {
        this.fileLoader = false;
        this.cdr.detectChanges();
      };
  }

  removeFile(id, blobUrl) {
    this.preAssessments?.map((dt) => {
      if (dt.id === id) {
        const objIndex = dt?.fileUploadArray?.findIndex(
          (obj) => obj.blobUrl === blobUrl
        );
        if (objIndex !== -1) {
          dt?.fileUploadArray?.splice(objIndex, 1);
        }
      }
      this.cdr.detectChanges();
    });
  }

  hasErrors = (preAssessmentData: any): boolean => {
    let field = this.form.get("checkList").value;
    if (this.submitted && !field?.includes(preAssessmentData?.id) && preAssessmentData?.isMandatory) {
      return !0;
    }
    return !1;
  };
}
