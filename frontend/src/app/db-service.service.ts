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
    return this.http.put(`/api/editfact/${id_fact}`, requestBody);
  }

  addFact(newFact: any){
    const requestBody = {
      recto: newFact.recto,
      verso: newFact.verso,
      id_package: newFact.id_package
    }
    return this.http.post(`api/createFact`, requestBody);
  }

  editPackage(id_package: number,new_title:string, new_description: string, new_category: string, new_target:string, new_difficulty: string){
    const requestBody = {
      newtitle: new_title,
      newdecription: new_description,
      newcategory: new_category,
      newtarget: new_target,
      newdifficulty: new_difficulty
    }
    console.log('Right in the editPackage');
    return this.http.put(`/api/editpackage/${id_package}`, requestBody);
  }

  deleteFact(id_fact: number) {
    return this.http.delete(`/api/deleteFact/${id_fact}`);
  }

  deletePackage(id_package:number){
    console.log("on delete un package", id_package);
    return this.http.delete(`/api/deletePackage/${id_package}`)
  }
}
