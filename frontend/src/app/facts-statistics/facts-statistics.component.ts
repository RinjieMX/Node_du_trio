import {Component, Input} from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { DbServiceService } from "../db-service.service";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-facts-statistics',
  templateUrl: './facts-statistics.component.html',
  styleUrl: './facts-statistics.component.css'
})
export class FactsStatisticsComponent
{

  @Input() fact: any;
  @Input() package: any;



  idPackage: number = 5;
  numberOfFacts: number = 0;


  chartOptions: any;
  highcharts:typeof Highcharts= Highcharts;

  constructor(private DbService: DbServiceService) { }


  ngOnInit()
  {
    this.barchart();
    this.getNumberOfFactsInPackage(4);


  }

  getNumberOfFactsInPackage(idPackage: number): void {
    this.DbService.getNbFactInPackage(idPackage).subscribe(
      (data: any) => {
        this.numberOfFacts = data.count;
        //console.log('Nombre de faits dans le package :', this.numberOfFacts);
      },
      (error) => {
        console.error('Erreur lors de la récupération du nombre de faits dans le package :', error);
      }
    );
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

  }


  //highchartdata
  Chartdata= [
    {
      name: 'NUMBER OF FACTS',
      data:[this.getNumberOfFactsInPackage(1),
            this.getNumberOfFactsInPackage(2),
            this.getNumberOfFactsInPackage(3),
            this.getNumberOfFactsInPackage(4)]
    }

  ]



}
