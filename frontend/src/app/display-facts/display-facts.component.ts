import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router, ActivatedRoute} from "@angular/router";
import { getAllPackages, getPackagesById } from "../../../../backend/DBManager";

@Component({
  selector: 'app-display-facts',
  templateUrl: './display-facts.component.html',
  styleUrl: './display-facts.component.css'
})
export class DisplayFactsComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  facts: any[] = [];
  currentFact: any = { recto: '', verso: '' };
  currentPackage: any;
  usedFacts: any[] = [];
  currentIndex: number = 1;
  selectedPackageId: number = 0;
  AllPackagesid: number[] = [];
  AllPackages: any[] = [];

  totalFact: number = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const packid = params['id_package'];
      this.getcurrentpackagefromId(packid);
    });

    //Remplir la liste d'ID
    fetchAllPackages().then((AllPackagesid) => {
      console.log('Liste des id_package de tous les packages :', AllPackagesid);
    }).catch((error) => {
      console.error('Une erreur s\'est produite :', error);
    });

    this.AllPackages = this.getListPackages(this.AllPackagesid);
  }

  getfactfromId(id: number){
    this.http.get(`/api/getfact/${id}`).subscribe((data) => {
      this.currentFact = data;
      this.usedFacts.push(this.currentFact.id_fact);
    });
  }

  getcurrentpackagefromId(id: number){
    this.http.get(`/api/getpackage/${id}`).subscribe((data) => {
      this.currentPackage = data;
      this.loadFacts();
      this.getTotalFact();
    });
  }

  getListPackages(AllPackagesId: number[]){
    const packages = [];
    for (const id of AllPackagesId) {
      try {
        const pack = getPackagesById(id);
        packages.push(pack);
      } catch (error) {
        console.error(`Erreur lors de la récupération du package avec l'ID ${id} :`, error);
      }
    }
    return packages;
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
  }

  onPackageChange() {
    this.getcurrentpackagefromId(this.selectedPackageId);
  }
}

async function fetchAllPackages() {
  try {
    const allPackages = await getAllPackages(); // Utilisez await ici
    return allPackages;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des packages :', error);
    throw error;
  }
}
