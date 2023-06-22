import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class ExpertsService {
  async(params: any, type: any) {
    throw new Error("Method not implemented.");
  }
  constructor(private http: HttpClient) {}

  getAllExperts(respObj: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('Page', respObj.Page);
    queryParams = queryParams.append('Size', respObj.Size);
    if (respObj?.Name) {
      queryParams = queryParams.append('Name', respObj.Name);

    }
    if (respObj?.LanguageIds?.length) {
      for (let i = 0; i < respObj?.LanguageIds?.length; i++) {
        queryParams = queryParams.append('LanguageIds', respObj.LanguageIds[i]);

      }
    }
    return this.http
      .get(`${environment.apiUrl}/api/identity/users/experts`, {params: queryParams})
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }
}
