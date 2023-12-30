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
  numberOfFacts1: number = 0;
  numberOfFacts2: number = 0;
  numberOfFacts3: number = 0;
  numberOfFacts4: number = 0;
  numberOfFacts: number = 0;



  chartOptions: any;
  highcharts:typeof Highcharts= Highcharts;

  constructor(private DbService: DbServiceService) { }


  ngOnInit()
  {
    this.barchart();
    this.numberOfFacts1 = this.getNumberOfFactsInPackage(1);
    /*this.numberOfFacts2 = this.getNumberOfFactsInPackage(2);
    this.numberOfFacts3= this.getNumberOfFactsInPackage(3);
    this.numberOfFacts4 = this.getNumberOfFactsInPackage(4);*/


  }

  getNumberOfFactsInPackage(idPackage: number): number {

    this.DbService.getNbFactInPackage(idPackage).subscribe(
      (data: any) => {
        this.numberOfFacts = data.count;

        this.numberOfFacts1 = this.getNumberOfFactsInPackage(1);
        this.numberOfFacts2 = this.getNumberOfFactsInPackage(2);
        this.numberOfFacts3 = this.getNumberOfFactsInPackage(3);
        this.numberOfFacts4 = this.getNumberOfFactsInPackage(5);

        //console.log('Nombre de faits dans le package :', this.numberOfFacts);
      },
      (error) => {
        this.numberOfFacts= -1;
        console.error('Erreur lors de la récupération du nombre de faits dans le package :', error);
      }
    );

    return this.numberOfFacts;
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
      data:[this.DbService.getNbFactInPackage(1),
            10,10,140]
    }

  ]



}
