import {
  Component,
  ComponentRef,
  OnInit,
  ViewChildren,
  QueryList,
  ViewContainerRef,
  ChangeDetectorRef
} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { DbServiceService } from "../db-service.service";
import { FactComponent } from "../fact/fact.component";

@Component({
  selector: 'app-display-facts',
  templateUrl: './display-facts.component.html',
  styleUrl: './display-facts.component.css'
})
export class DisplayFactsComponent implements OnInit {

  @ViewChildren(FactComponent) factComponents!: QueryList<FactComponent>;

  facts: any = [];
  package: any;
  id_package: number = 0;
  newFact: any;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient, private router: Router, private route: ActivatedRoute, private DbService: DbServiceService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    //Prendre le paramètre de l'URL et trouver le currentPackage
    this.route.params.subscribe(params => {
      this.id_package = params['id_package'];
      this.DbService.getPackagesById(this.id_package).subscribe((data) => {
        this.package = data;
      });
      this.refreshFacts(this.id_package);
    });
  };

  addNewFact() {
    const newFactbody = {
      recto: '',
      verso: '',
      id_package: this.id_package
    };

    this.DbService.addFact(newFactbody).subscribe((response) => {
      // Ajoutez la nouvelle fact en haut de la liste
      if ('result' in response){
        this.facts.unshift(response.result);
      }
      //Mettre à jour les facts dans la liste
      //this.refreshFacts(this.id_package);
      this.cdr.detectChanges();

      //Activer l'edit de la nouvelle fact
      this.newFact = response;
      //console.log(this.newFact.result);
      if (this.newFact) {
        this.startFactEdit(this.newFact.result);
      }
    });
  }

  refreshFacts(id_pack: number){
    this.DbService.getAllFacts(id_pack).subscribe((data) => {
      this.facts = data
      //console.log(data);

      this.facts.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
    });
  }

  startFactEdit(fact: any) {
    const factComponentRef = this.findFactComponentByFact(fact);
    console.log(factComponentRef);

    if (factComponentRef) {
      factComponentRef.startEdit();
    }
  }

  private findFactComponentByFact(fact: any): FactComponent | undefined {
    console.log('Valeur de fact recherchée :', fact.id_fact);
    console.log(this.facts);
    for (const factItem of this.facts) {
      if (factItem.id_fact === fact.id_fact) {
        // Trouvé correspondance, renvoie le composant correspondant
        console.log("coucou", this.factComponents.find((factComponent: FactComponent) => factComponent.fact.id_fact === fact.id_fact));
        return this.factComponents.find((factComponent: FactComponent) => factComponent.fact.id_fact === fact.id_fact);
      }
    }
    // Si aucune correspondance n'est trouvée, renvoie undefined
    return undefined;
  }
}
