import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { forkJoin } from "rxjs";
import { DbServiceService } from "../db-service.service";

@Component({
  selector: 'app-progress-statistics',
  templateUrl: './progress-statistics.component.html',
  styleUrl: './progress-statistics.component.css'
})

export class ProgressStatisticsComponent  implements OnInit {

  chartOptions_1: any;
  highcharts:typeof Highcharts= Highcharts;

  public AllPackages: any;

  constructor(private DbService: DbServiceService) { }

  ngOnInit() {
    this.graph1();
  }

  graph1() {
    this.DbService.getAllPackages().subscribe((data: any[]) => {
      const observables = data.map((pack: any) => {
        return this.DbService.getAllFacts(pack.id_package);
      });

      forkJoin(observables).subscribe(
        (results: any[]) => {
          for (let i = 0; i < data.length; i++) {
            data[i].Facts = results[i];
          }

          //Toutes les données des packages avec le nombre de facts associées
          this.AllPackages = data;

          let state_easy = [];
          let state_correct = [];
          let state_difficult = [];
          let state_review = [];

          for (let i = 0; i < this.AllPackages.length; i++){

            let easy = 0;
            let correct = 0;
            let difficult = 0;
            let review = 0;

            for (let j = 0; j < this.AllPackages[i].Facts.length; j++) {
              switch (this.AllPackages[i].Facts[j].state_fact){
                case 'Easy': {
                  easy++;
                  break;
                }
                case 'Correct': {
                  correct++;
                  break;
                }
                case 'Difficult': {
                  difficult++;
                  break;
                }
                case 'To review': {
                  review++;
                  break;
                }
                default: {
                  break;
                }
              }
            }
            state_easy.push(easy);
            state_correct.push(correct);
            state_difficult.push(difficult);
            state_review.push(review);
          }

          if (this.AllPackages){
            const packs: string[] = this.AllPackages.map((pack: any) => pack.title_package);

            let data_f = [
              {
                name: 'Easy',
                data: state_easy,
                color: '#27ae60'
              },
              {
                name: 'Correct',
                data: state_correct,
                color: '#89e0ae'
              },
              {
                name: 'To review',
                data: state_review,
                color: '#ffb6c1'
              },
              {
                name: 'Difficult',
                data: state_difficult,
                color: '#f06c84'
              }
            ]

            this.chartOptions_1 =
              {
                chart:
                  {
                    type: 'column'
                  },
                title:
                  {
                    text: 'PROGRESS IN ANKI'
                  },
                subtitle:
                  {
                    text: 'What was easy ? Difficult?'
                  },
                xAxis:
                  {
                    categories: packs
                  },
                credits: {
                  enabled : false
                },
                series: data_f
              }
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération du nombre de faits :', error);
        }
      );
    });
  }
}
