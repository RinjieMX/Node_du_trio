import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-display-facts',
  templateUrl: './display-facts.component.html',
  styleUrl: './display-facts.component.css'
})
export class DisplayFactsComponent implements OnInit {
  facts: any[] = [];
  currentFact: any;
  usedFacts: any[] = [];
  currentIndex: number = 1;

  totalFact: number = 0;
  getTotalFact(){
    this.http.get<{ count: number }>('/api/getNbFactinPackage/1')
      .subscribe((response) => {
        this.totalFact = response.count;
      }, (error) => {
        console.error('Erreur lors de la récupération du nombre de facts :', error);
      });
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loadFacts();
    this.getTotalFact();
  }

  loadFacts(){
    this.http.get<any[]>('/api/getfactfrompackage/1').subscribe((data) => {
      this.facts = data;
      this.RandomFact();
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
    this.currentFact = unusedFacts[randomIndex];
    this.usedFacts.push(this.currentFact.id_fact);
  }

  onNextClick() {
    this.RandomFact();
    this.currentIndex++;
  }
}
