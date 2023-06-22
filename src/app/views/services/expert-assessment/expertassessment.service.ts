import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ExpertAssessmentModel } from '../../pages/experts/components/expertAssessmentModel/expertAssessment.model';

@Injectable({
  providedIn: 'root'
})
export class ExpertassessmentService {

  async(params: any, type: any) {
    throw new Error("Method not implemented.");
  }

  expertAssesment:ExpertAssessmentModel = new ExpertAssessmentModel();
  
  constructor(private http: HttpClient) { }

  getAllAssessments(expertId: string) {
    return this.http
      .get(`${environment.apiUrl}/api/Assessment/users/experts/${expertId}/assessments`)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }

  getAllActiveAssessments(expertId: string) {
    return this.http
      .get(`${environment.apiUrl}/api/Assessment/${expertId}/activeAssessments`)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }

  declinedAssessment(expertId: string){
    return this.http
      .get(`${environment.apiUrl}/api/Assessment/${expertId}/declinedAssessments`)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }
  getExpertAssessmentDetail(assessmentId:any){
    return this.http
      .get(`${environment.apiUrl}/api/Assessment/users/experts/assessments/${assessmentId}/details`)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }

  uploadFile(formData,assessmentId:any) {
    return this.http
      .post(`${environment.apiUrl}/api/Assessment/${assessmentId}/activity/upload`, formData)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }

  createExpertActivity(assessmentId:any,reqBody){
    return this.http
      .post(`${environment.apiUrl}/api/Assessment/${assessmentId}/activity`, reqBody)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }

  createMeetingStatus(assessmentId:any,reqBody){
    return this.http
      .put(`${environment.apiUrl}/api/Assessment/${assessmentId}/status`, reqBody)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }

  completedAssessments(expertId:any){
    return this.http
      .get(`${environment.apiUrl}/api/Assessment/${expertId}/completedAssessments`)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }
}
