import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-progress-statistics',
  templateUrl: './progress-statistics.component.html',
  styleUrl: './progress-statistics.component.css'
})
export class ProgressStatisticsComponent  implements OnInit
{
  chartOptions: any;
  highcharts:typeof Highcharts= Highcharts;
  idPackage = 1; // Remplacez par l'ID du package souhaité
  apiUrl = `/api/getactualfactfrompackage/${(this.idPackage)}`;
  public learningFacts: any[] = [];


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    console.log('Début de ngOnInit');

    this.barchart();

    console.log('Avant la requête HTTP');

    this.httpClient.get('/api/getactualfactfrompackage/1').subscribe(
      (response) => {
        console.log('inside');
        console.log('Réponse de l\'API réussie :', response);
        this.learningFacts = response as any[];
        //console.log(this.learningFacts[0]);
      },
      (error) => {
        console.error('Erreur lors de la requête API :', error);
      }
    );
    console.log('outside');

      /*for (let i = 0; i < this.learningFacts.length; i++) {
        let fact = this.learningFacts[i];
        console.log(`Fact ${fact.id_fact}: ${fact.state_fact}`);
      }*/
    console.log('Fin de ngOnInit');
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
    name: 'Easy',
    data:[631, 727, 3202, 721]
  },
  {
    name: 'correct',
    data:[814, 841, 3714, 726]
  },
  {
    name: 'dificult',
    data:[1276, 1007, 4561, 1000]
  },
   {
     name: 'To review',
     data:[1276, 1007, 4561, 1000]
   }

]

}
