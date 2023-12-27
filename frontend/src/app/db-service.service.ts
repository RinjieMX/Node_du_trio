import { Injectable } from '@angular/core';
import {LearningPackage} from "../../../backend/DBManager";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private http: HttpClient) { }

  getAllPackages(): Observable<number[]> {
    return this.http.get<number[]>('/api/getpackage');
  }

  getPackagesById(id: number): Observable<any> {
    return this.http.get(`/api/getpackage/${id}`);
  }
}
