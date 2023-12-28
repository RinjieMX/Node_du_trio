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

  getAllFacts(id_package: number){
    return this.http.get(`/api/getfactfrompackage/${id_package}`);
  }

  editFact(id_fact: number, newrecto: string, newverso: string){
    const requestBody = {
      newrecto: newrecto,
      newverso: newverso
    }
    console.log(requestBody);
    return this.http.put(`/api/editfact/${id_fact}`, requestBody);
  }
}
