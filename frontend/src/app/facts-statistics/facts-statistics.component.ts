import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { DbServiceService } from "../db-service.service";
import { HttpClient } from "@angular/common/http";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-facts-statistics',
  templateUrl: './facts-statistics.component.html',
  styleUrl: './facts-statistics.component.css'
})
export class FactsStatisticsComponent implements OnInit
{

  AllPackages: any;

  idPackage: number = 5;
  numberOfFacts1: number = 1;
  numberOfFacts2: number = 2;
  numberOfFacts3: number = 3;
  numberOfFacts4: number = 4;
  numberOfFacts: number = 0;

  currentPackage: any;

  chartOptions: any;
  highcharts:typeof Highcharts= Highcharts;

  constructor(private DbService: DbServiceService, private http: HttpClient) { }

  async ngOnInit() {
    console.log(101010);
    this.loadData();
  }

  loadData() {
    this.DbService.getAllPackages().subscribe((data: any[]) => {
      const observables = data.map((pack: any) => {
        return this.DbService.getNbFactInPackage(pack.id_package);
      });

      forkJoin(observables).subscribe(
        (results: any[]) => {
          for (let i = 0; i < data.length; i++) {
            data[i].numberOfFacts = results[i].count;
          }

          //Toutes les données des packages avec le nombre de facts associées
          this.AllPackages = data;
          console.log(this.AllPackages);

          if (this.AllPackages){
            const packs: string[] = this.AllPackages.map((pack: any) => pack.title_package);
            const data: number[] = this.AllPackages.map((pack: any) => pack.numberOfFacts);

            this.chartOptions = {
              chart: {
                type: 'column'
              },
              title: {
                text: 'NUMBER OF FACTS PER PACKAGE'
              },
              xAxis: {
                categories: packs
              },
              yAxis: {
                title: {
                  text: 'How many facts ?'
                }
              },
              series: [
                {
                  name: 'Number of facts',
                 //data: data
                  data: data.map((count: number, index: number) => ({
                    y: count,
                    color: count <= 1 ? '#eb5b5b' :
                      count >1 && count < 5 ? '#ffb6c1' :
                        count >= 5 && count < 10 ? '#89e0ae' :
                      count >= 10 ? '#27ae60' :
                        '#27ae60'
                  }))
                }
              ]
            };
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération du nombre de faits :', error);
        }
      );
    });
  }

  async getNumberOfFactsInPackage(idPackage: number): Promise<number> {
    try {
      const response = await this.http.get<{ count?: number }>(`/api/getNbFactLeft/${idPackage}`).toPromise();

      if (response && response.count !== undefined) {
        return response.count;
      } else {
        // Gérer le cas où la réponse n'a pas la propriété attendue
        console.error('Réponse invalide:', response);
        return 0;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de facts :', error);
      return 0;
    }
  }

  async getNumberOfUnfinishedFactsInPackage(idPackage: number): Promise<number> {
    try {
      const response = await this.http.get<{ count?: number }>(`/api/geteasyfact/${this.currentPackage.id_package}`).toPromise();
      if (response && response.count !== undefined) {
        return response.count;
      } else {
        // Gérer le cas où la réponse n'a pas la propriété attendue
        console.error('Réponse invalide:', response);
        return 0;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de facts :', error);
      return 0;
    }
  }


}
