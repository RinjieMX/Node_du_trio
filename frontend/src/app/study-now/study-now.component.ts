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
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private DbService: DbServiceService) { }

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
      console.log('First Package:', firstPackage);

      if (!firstPackage || firstPackage == 0) { //on a aucun package alors on a aucun facts
        // Redirect to another route (you can replace 'redirect-route' with the desired route)
        this.router.navigate(['/nomore-fact']).then(r => {});
      }
      else {
        this.getcurrentpackagefromId(firstPackage);

      }
    });

  }

  getfactfromId(id: number){
    this.http.get(`/api/getfact/${id}`).subscribe((data) => {
      this.currentFact = data;
    });
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
    this.http.get<{ count: number }>(`/api/getNbFactLeft/${this.currentPackage.id_package}`)
      .subscribe((response) => {
        this.totalFact = response.count;
      }, (error) => {
        console.error('Erreur lors de la récupération du nombre de facts :', error);
      });
  }

  RandomFact() {
    const unusedFacts = this.facts.filter((fa) => !this.usedFacts.includes(fa.id_fact)); //Utiliser une liste avec les facts qui ne sont pas encore passées
    console.log(unusedFacts);
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

  setStateFact(state: string){
    this.DbService.setStateFact(this.currentFact.id_fact, state);
    this.isStated = true;
    this.getTotalFact();
    this.factIsUsed();
  }

  factIsUsed(){
    console.log(this.isStated, this.currentFact);
    if (this.isStated && this.currentFact.state_fact === 'Easy'){
      this.usedFacts.push(this.currentFact.id_fact);
      console.log(this.usedFacts);
      this.currentIndex++;
      console.log(this.currentIndex)
    }
    else {
      console.log('This fact is not easy yet');
    }
  }
}
