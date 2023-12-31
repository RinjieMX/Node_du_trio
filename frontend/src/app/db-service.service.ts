import { Injectable } from '@angular/core';
import {LearningPackage} from "../../../backend/DBManager";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private http: HttpClient, private router: Router) { }

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

  editPackageFinished(id_package: number, fini: boolean){
      const requestBody = {
          newfinishedvalue: fini
      }
      console.log('Right in the editPackageFinished');
      return this.http.put(`/api/editpackageFinished/${id_package}`, requestBody);
  }

  deleteFact(id_fact: number) {
    return this.http.delete(`/api/deleteFact/${id_fact}`);
  }

  deletePackage(id_package:number){
    //on a la confirmation on va aller récupérer tous les facts associés au package
      console.log("on récupère les facts", id_package);
      let facts: any = [];
      this.getAllFacts(id_package).subscribe((data) => {
        facts = data;
        console.log("on a récupérer les facts, longueur ", facts.length);

        //une fois récupérer on va les supprimer un par un
        if(facts.length != 0){ //on a trouver au moins un fact lié à la database
            for (const fact of facts) {
                console.log(fact.id_fact);
                const id = fact.id_fact; // Assuming your Fact object has an 'id' property
                this.deleteFact(id).subscribe(
                    () => {
                        console.log(`Fact ${id} deleted successfully.`);
                    },
                    (error) => {
                        console.error(`Error deleting fact ${id}:`, error);
                    }
                );
            }
            this.deletePackageDirectly(id_package);
        }
        else this.deletePackageDirectly(id_package);
    });

  }

    deletePackageDirectly(id_package: number) {
        console.log('Deleting the package directly.');
        this.http.delete(`/api/deletePackage/${id_package}`).subscribe(
            () => {

                console.log('Package deleted successfully.');
                //Success = on recharge la page display packages
                const navigationExtras: NavigationExtras = {
                    state: { refresh: true }
                };
                this.router.navigate(['/display-package'], navigationExtras);
            },
            (error) => {
                console.error('Error deleting package:', error);
            }
        );
    }

  getNbFactInPackage(idPackage: number): Observable<number> {
    return this.http.get<number>(`api/getNbFactinPackage/${idPackage}`);
  }

  setStateFact(id_fact: number, state: string, next_date: Date){
    const requestBody = {
      state_fact: state,
      next_date: next_date
    }
    this.http.put(`/api/setStateFact/${id_fact}`, requestBody).subscribe(
    (response) => {
      console.log('Fact_state updated successfully.', response);
    },
    (error) => {
      console.error('Error updating fact:', error);
    });
  }

  getNbActualFactFromPackage(packageId: number): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`/api/getNbactualfactfrompackage/${packageId}`);
  }
}
