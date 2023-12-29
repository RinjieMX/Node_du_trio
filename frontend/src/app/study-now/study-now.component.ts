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
  currentIndex: number = 1;
  selectedPackageId: number = 0;
  AllPackages: any[] = [];
  isVisible: boolean = false;

  numberofpackages: number= 0;

  totalFact: number = 0;

  ngOnInit() {
    //Prendre le paramètre de l'URL et trouver le currentPackage
    this.route.params.subscribe(params => {
      const packid = params['id_package'];
      this.getcurrentpackagefromId(packid);
    });

    this.DbService.getAllPackages().subscribe((data) => {
      this.AllPackages = data;
    });
  }

  getfactfromId(id: number){
    this.http.get(`/api/getfact/${id}`).subscribe((data) => {
      this.currentFact = data;
      this.usedFacts.push(this.currentFact.id_fact);
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
    this.http.get<{ count: number }>(`/api/getNbFactinPackage/${this.currentPackage.id_package}`)
      .subscribe((response) => {
        this.totalFact = response.count;
      }, (error) => {
        console.error('Erreur lors de la récupération du nombre de facts :', error);
      });
  }

  RandomFact() {
    const unusedFacts = this.facts.filter((fa) => !this.usedFacts.includes(fa.id_fact)); //Utiliser une liste avec les facts qui ne sont pas encore passées
    if (unusedFacts.length === 0) {
      this.currentFact = null;
      this.router.navigate(['/nomore-fact']);
      return;
    }

    const randomIndex = Math.floor(Math.random() * unusedFacts.length);
    this.getfactfromId(unusedFacts[randomIndex].id_fact); //currentFact prend la valeur du prochain fact
    this.usedFacts.push(this.currentFact.id_fact);
  }

  onNextClick() {
    this.RandomFact();
    this.currentIndex++;
    this.isVisible = false;
  }

  onPackageChange() {
    this.getcurrentpackagefromId(this.selectedPackageId);
    this.isVisible = false;
  }

  onReveal() {
    this.isVisible = !this.isVisible;
  }
}
