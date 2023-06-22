import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpService } from "@services/http-service";
import { StorageManageService } from "src/app/views/services/storageservice/storage.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AssessmentService {
  async(params: any, type: any) {
    throw new Error("Method not implemented.");
  }
  constructor(
    private http: HttpService,
    private storageService: StorageManageService
  ) {}
  getAllServiceType() {
    return this.http.get(`/Masters/servicetypes`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getUserId = ()=>{
    return JSON.parse(this.storageService.get("userInfo")).id || '' ;
  }
  createAssessment(assessmentDetails: any) {
    return this.http
      .post(`/Assessment`, {
        ...{
          status: 0,
          preRequisiteMapping: [],
          preAssessmentMapping: [],
          bookAssessment: null,
          userId: this.getUserId() ,
        },
        ...assessmentDetails,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAllPrerequisites(serviceTypeId: string) {
    return this.http
      .get(`/Masters/servicetypes/${serviceTypeId}/prerequisites`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  getAllPreAssessmentsMapping(assessmentId: number) {
    return this.http
      .get(
        `/Assessment/users/${ this.getUserId()}/assessments/${assessmentId}/preassessments`
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  getAllPreRequisitesMapping(assessmentId: number, ) {
    return this.http
      .get(
        `/Assessment/users/${ this.getUserId()}/assessments/${assessmentId}/prerequisites`
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getBookAssessment(assessmentId: number) {
    return this.http
      .get(
        `/Assessment/users/${ this.getUserId()}/assessments/${assessmentId}/bookassessment`
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAllPreAssessments(serviceTypeId: string) {
    return this.http
      .get(`/Masters/servicetypes/${serviceTypeId}/preassessments`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  getAllAssessments( ) {
    return this.http.get(`/Assessment/users/${this.getUserId()}/assessments`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  uploadFile(formData) {
    return this.http
      .post(`/Assessment/upload`, formData)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );

  }
}
