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

  constructor() { }

  ngOnInit()
  {
    this.barchart();

  }
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
            text: 'PROGRESS STATISTICS'
          },
        subtitle:
          {
            text: 'What happened here in anki?'
          },
        xAxis:
          {
            categories:[
              'Africa', 'America', 'Asia', 'Europe'
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
