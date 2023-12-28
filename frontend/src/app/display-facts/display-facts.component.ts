import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { DbServiceService } from "../db-service.service";

@Component({
  selector: 'app-display-facts',
  templateUrl: './display-facts.component.html',
  styleUrl: './display-facts.component.css'
})
export class DisplayFactsComponent implements OnInit {

  facts: any = [];
  package: any;
  id_package: number = 0;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private DbService: DbServiceService) { }

  ngOnInit() {
    //Prendre le paramètre de l'URL et trouver le currentPackage
    this.route.params.subscribe(params => {
      this.id_package = params['id_package'];
      this.DbService.getPackagesById(this.id_package).subscribe((data) => {
        this.package = data;
      });
      this.DbService.getAllFacts(this.id_package).subscribe((data) => {
        this.facts = data;
      });
    });
  };

  addNewFact() {
    const newFact = {
      recto: '',
      verso: '',
      id_package: this.id_package
    };

    this.DbService.addFact(newFact).subscribe((response) => {
      // Ajoutez la nouvelle fact à la liste
      this.facts.unshift(response);
    });
  }
}
