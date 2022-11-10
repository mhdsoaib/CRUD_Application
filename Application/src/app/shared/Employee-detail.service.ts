import { Injectable } from '@angular/core';
import { EmployeeDetail } from './Employee-detail.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailService {

  constructor(private http: HttpClient) { }
  
  readonly baseURL = 'https://localhost:7075/api/EmployeeDetails'
  formData: EmployeeDetail = new EmployeeDetail();
  list: EmployeeDetail[];
  lst:EmployeeDetail[];

  postEmployeeDetail() {
    return this.http.post(this.baseURL, this.formData);
  }

  putEmployeeDetail() {
    return this.http.put(`${this.baseURL}/${this.formData.employeeId}`, this.formData);
  }

  deleteEmployeeDetail(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  async refreshList() {
    const res = await this.http.get(this.baseURL)
      .toPromise();
    return this.list = res as EmployeeDetail[];
  }
  // refreshList(): Observable<any[]> {
  //   return this.http.get<any[]>(this.baseURL);
  // }
}
