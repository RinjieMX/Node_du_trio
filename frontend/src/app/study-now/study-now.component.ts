import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { DbServiceService } from "../db-service.service";

@Component({
  selector: 'app-study-now',
  templateUrl: './study-now.component.html',
  styleUrl: './study-now.component.css'
})
export class StudyNowComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private DbService: DbServiceService) { }

  facts: any[] = [];
  currentFact: any = { recto: '', verso: '' };
  currentPackage: any;
  usedFacts: any[] = [];
  currentIndex: number = 0;
  selectedPackageId: number = 0;
  AllPackages: any[] = [];
  isVisible: boolean = false;
  isStated: boolean = false;

  numberofpackages: number= 0;

  totalFact: number = 0;

  ngOnInit() {
    this.DbService.getAllPackages().subscribe((data) => {
      this.AllPackages = data;
      let firstPackage: any;

      if(this.AllPackages.length != 0) firstPackage = this.AllPackages[0].id_package;

      if (!firstPackage || firstPackage == 0) { //on a aucun package alors on a aucun facts
        this.router.navigate(['/nomore-fact']).then(r => {});
      }
      else {
        this.getcurrentpackagefromId(firstPackage);
      }
    });

  }

  async getfactfromId(id: number) {
    try {
      const data = await this.http.get(`/api/getfact/${id}`).toPromise();
      this.currentFact = data;
    } catch (error) {
      console.error('Erreur lors de la récupération du fact :', error);
      throw error;
    }
  }


  getcurrentpackagefromId(id: number){
    this.DbService.getPackagesById(id).subscribe((data) => {
      this.currentPackage = data;
      this.loadFacts();
      this.getTotalFact();
    });
  }

  loadFacts(){
    this.http.get<any[]>(`/api/getfactfrompackage/${this.currentPackage.id_package}`).subscribe((data) => {
      this.facts = data;
      this.RandomFact();
    });
  }

  getTotalFact(){
    //Obtenir le nombre de fact dans le package
    this.http.get<{ count: number }>(`/api/getNbFactLeft/${this.currentPackage.id_package}`)
      .subscribe((response) => {
        this.totalFact = response.count;
      }, (error) => {
        console.error('Erreur lors de la récupération du nombre de facts :', error);
      });

    //Obtenir le nombre de fact finies dans le package
    this.http.get<{ count: number }>(`/api/geteasyfact/${this.currentPackage.id_package}`)
      .subscribe((response) => {
        this.currentIndex = response.count;
      }, (error) => {
        console.error('Erreur lors de la récupération du nombre de facts :', error);
      });
  }

  RandomFact() {
    const unusedFacts = this.facts.filter((fa) => !this.usedFacts.includes(fa.id_fact)); //Utiliser une liste avec les facts qui ne sont pas encore passées
    //console.log(unusedFacts);
    if (unusedFacts.length === 0) {
      this.currentFact = null;
      this.router.navigate(['/nomore-fact']);
      return;
    }

    const randomIndex = Math.floor(Math.random() * unusedFacts.length);
    this.getfactfromId(unusedFacts[randomIndex].id_fact); //currentFact prend la valeur du prochain fact
  }

  onNextClick() {
    this.RandomFact();
    this.isVisible = false;
    this.isStated = false;
    this.factIsUsed();
  }

  onPackageChange() {
    this.getcurrentpackagefromId(this.selectedPackageId);
    this.isVisible = false;
    this.isStated = false;
  }

  onReveal() {
    this.isVisible = !this.isVisible;
  }

  async setStateFact(state: string) {
    try {
      this.DbService.setStateFact(this.currentFact.id_fact, state);
      this.isStated = true;
      await this.getfactfromId(this.currentFact.id_fact);
      this.factIsUsed();
      this.getTotalFact();
    } catch (error) {
      console.error("Error in setStateFact:", error);
    }
  }

  factIsUsed(){
    if (this.isStated && this.currentFact.state_fact === 'Easy'){
      this.usedFacts.push(this.currentFact.id_fact);
    }
    else {
      console.log('This fact is not easy yet');
    }
  }
}
