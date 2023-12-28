// Importer Highcharts

//import { Component, OnInit } from '@angular/core';
//import { HighchartsModule } from 'highcharts-angular';
import { Component, OnInit } from '@angular/core';
//import * as Highcharts from 'highcharts';
import * as Highcharts from 'highcharts';
//import { Highcharts } from 'highcharts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const chartElement = document.getElementById('myChart');

    if (chartElement) {
      const myChart = new Highcharts.Chart({
        chart: {
          renderTo: chartElement
        },
        series: [{
          type: 'waterfall',
          data: [10, 20, 30, 40, 50]
        }]
      });
    } else {
      console.error("L'élément avec l'ID 'myChart' n'a pas été trouvé dans le DOM.");
    }

    //myChart.title.text = 'statistics graph';
    //myChart.xAxis.title.text = 'x';
    //myChart.yAxis.title.text = 'y';

  }

}
