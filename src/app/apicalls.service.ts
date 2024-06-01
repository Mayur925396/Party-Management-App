import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APICallsService {

  constructor(private http: HttpClient) {

  }
  public baseUrl: any = 'https://ap.greatfuturetechno.com/'
  getData(): Observable<any> {
    return this.http.get(this.baseUrl + "party/");
  }

  postData(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "party/", data)
  }

  deleteData(data: any): Observable<any> {
    return this.http.delete(this.baseUrl + "party/?id=" + data);
  }

  updateApiData(data: any): Observable<any> {
    return this.http.put(this.baseUrl + 'party/?id=' + data.id, data)
  }

  loginPage(data: any) {
    return this.http.post('https://ap.greatfuturetechno.com/login/', data)
  }
  logoutPage(data: any) {
    return this.http.post('https://ap.greatfuturetechno.com/logout/', data)
  }
}

