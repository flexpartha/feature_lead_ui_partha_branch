import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@env/environment";
type ParamsType = Record<string, string | number | boolean>;
@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {}
  serialize(obj: ParamsType ): string {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.length ? str.join("&") : "";
  }
  _url(path: string): string {
    return `${environment.apiUrl}/api${path}`;
  }
  get<T>(url: string, params: ParamsType = {}): Observable<T> {
    let headers = new HttpHeaders();
    let queryString = this.serialize(params);
    return this.http.get<T>(
      this._url(url + (queryString ? `?${queryString}` : "")),
      { headers }
    );
  }
  post<T>(url: string, data: ParamsType): Observable<T> {
    let headers = new HttpHeaders();
    return this.http.post<T>(this._url(url), data, { headers });
  }
  putdata<T>(url): Observable<T> {
    let headers = new HttpHeaders();
    return this.http.put<T>(this._url(url), { headers });
  }
  put<T>(url, data: ParamsType): Observable<T> {
    let headers = new HttpHeaders();
    return this.http.put<T>(this._url(url), data, { headers });
  }
  delete<T>(url: string): Observable<T> {
    let headers = new HttpHeaders();
    return this.http.delete<T>(this._url(url), { headers });
  }
}
