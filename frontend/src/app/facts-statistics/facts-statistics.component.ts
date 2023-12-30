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
  unfinishedfactindex: number=77;
  currentPackage: any;

  chartOptions: any;
  highcharts:typeof Highcharts= Highcharts;

  constructor(private DbService: DbServiceService, private http: HttpClient) { }

  async ngOnInit() {
    console.log(101010);
    this.loadData();

    /*const responses = await forkJoin([
      this.getNumberOfFactsInPackage(1),
      this.getNumberOfFactsInPackage(2),
      this.getNumberOfFactsInPackage(3),
      this.getNumberOfFactsInPackage(4)
    ]).toPromise();


    if (responses) {
      this.numberOfFacts1 = responses[0];
      this.numberOfFacts2 = responses[1];
      this.numberOfFacts3 = responses[2];
      this.numberOfFacts4 = responses[3];

      this.Chartdata[0].data[0] = this.numberOfFacts1;
      this.Chartdata[0].data[1] = this.numberOfFacts2;
      this.Chartdata[0].data[2] = this.numberOfFacts3;
      this.Chartdata[0].data[3] = this.numberOfFacts4;
      console.log(this.Chartdata[0]);

      this.barchart();
      console.log(this.Chartdata[0]);
    } else {
      console.error('Réponses invalides:', responses);
    }*/
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
                  data: data
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



  Chartdata= [
    {
      name: 'NUMBER OF FACTS',
      data:[ {y: this.numberOfFacts1 , point: { color: '#89e0ae' }} ,this.numberOfFacts2 , this.numberOfFacts3 ,this.numberOfFacts4]
    }

  ]

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










  numeroaprint:number=10;
  barchart()
  {
    this.chartOptions =
      {
        chart:
          {
            type: 'column'
          },
        title:
          {
            text: 'NUMBER OF FACTS WORKED ON'
          },
        subtitle:
          {
            text: 'What happened here in anki?'
          },
        xAxis:
          {
            categories:[
              'Maths', 'python', 'geography', 'english'
            ]

          },
        credits:
          {enabled : false

          },
        /*plotOptions:
          {
            series:
              {
              stacking:'normal'
              },
            bar:
              {
                dataLables:
                  {
                    enabled: true
                  }
              }
          },*/
        series: this.Chartdata


      }

    console.log(this.numberOfFacts1);

  }


  //highchartdata




}
