import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpService } from "@services/http-service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpService, private httpClient: HttpClient) {}
  getCountries() {
    return this.http.get(`/Masters/countries`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getLanguages() {
    return this.http.get(`/Masters/languages`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getTimeZone() {
    return this.http.get(`/Masters/timezones`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  validateUser(email: string) {
    return this.http.get(`/identity/validateUser?email=${email}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  userRegistration(userDetails: any) {
    return this.http.post(`/identity/register`, userDetails).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getOrganization(details: any) {
    return this.httpClient
      .post(
        `${environment.cloudLabsApiBaseUrl}AttendeePublic/GetOrganizations`,
        details
      )
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }
}
