import {Component, OnInit} from '@angular/core';
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
  private startTime: number =0;
  public time: number=0;

  constructor() { }

  ngOnInit()
  {
    this.barchart();
    // Enregistrez le temps de début lorsque le composant est initialisé
    //this.startTime = performance.now();
    //


  }


  /*ngOnDestroy(): number {
    // Calculez la durée totale lorsque le composant est détruit (par exemple, lorsque vous naviguez loin de la page)
    const endTime = performance.now();
    const elapsedTime = endTime - this.startTime;

    console.log(`Le temps passé sur ce composant est de ${elapsedTime} millisecondes.`);
    return elapsedTime;
  }*/
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
    name: 'Year 2000',
    data:[631, 727, 3202, 721]
  },
  {
    name: 'Year 2001',
    data:[814, 841, 3714, 726]
  },
  {
    name: 'Year 2002',
    data:[1276, 1007, 4561, 1000]
  }

]


}
