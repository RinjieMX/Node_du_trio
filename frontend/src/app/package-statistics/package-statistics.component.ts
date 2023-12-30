import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { DbServiceService } from "../db-service.service";
import { HttpClient } from "@angular/common/http";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-package-statistics',
  templateUrl: './package-statistics.component.html',
  styleUrl: './package-statistics.component.css'
})
export class PackageStatisticsComponent implements OnInit {

    all_packages: any[] = [];
    numberOfFacts: number = 0;

    chartOptions: any;
    highcharts: typeof Highcharts = Highcharts;

    constructor(private DbService: DbServiceService, private http: HttpClient) {
    }

    async ngOnInit() {
        console.log("test");
        this.loadData();
    }

    loadData() {
        this.DbService.getAllPackages().subscribe((data: any[]) => {

            //on récupère tout les packages
            this.all_packages = data;

            const allCategories: string[] = ['Maths', 'English', 'History','Informatics','Geography','Philosophy' ,'Physics'];

            /*
            const categoryCounts: { [category: string]: number } = this.all_packages.reduce((acc, pack) => {
                const category = pack.category;
                acc[category] = (acc[category] || 0) + 1;
                return acc;
            }, {});

            const categories: string[] = Object.keys(categoryCounts);
            const counts: number[] = Object.values(categoryCounts);

             */

            const categoryCounts: { [category: string]: number } = allCategories.reduce((acc, category) => {
                acc[category] = 0;
                return acc;
            }, {} as { [category: string]: number });

            this.all_packages.forEach((pack) => {
                const category = pack.category;
                categoryCounts[category] += 1;
            });


                this.chartOptions = {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'DISTRIBUTION OF CATEGORY'
                    },
                    xAxis: {
                        categories: allCategories
                    },
                    yAxis: {
                        title: {
                            text: 'How many instance per Category ?'
                        }
                    },
                    series: [
                        {
                            name: 'Number of Category',
                            color: 'white',
                            data: allCategories.map((category: string) => ({
                                y: categoryCounts[category],
                                color: categoryCounts[category] <= 1 ? '#eb5b5b' :
                                    categoryCounts[category] > 1 && categoryCounts[category] < 5 ? '#ffb6c1' :
                                        categoryCounts[category] >= 5 ? '#27ae60' :
                                                '#27ae60'
                            }))
                        }
                    ]
                };

        })

    }
}
