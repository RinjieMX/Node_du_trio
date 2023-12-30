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

    type_charts: string = '';

    constructor(private DbService: DbServiceService, private http: HttpClient) {
    }

    async ngOnInit() {
        console.log("test");
        this.loadData_default();
    }

    loadData_default() {
        this.DbService.getAllPackages().subscribe((data: any[]) => {

            //on récupère tout les packages
            this.all_packages = data;

            const allCategories: string[] = ['Maths', 'English', 'History','Informatics','Geography','Philosophy' ,'Physics'];


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

    loadData_target() {
        this.DbService.getAllPackages().subscribe((data: any[]) => {

            //on récupère tout les packages
            this.all_packages = data;

            const allTarget: string[] = ['Children', 'Adults', 'Eldery','Any'];


            const targetCounts: { [category: string]: number } = allTarget.reduce((acc, target) => {
                acc[target] = 0;
                return acc;
            }, {} as { [target: string]: number });

            this.all_packages.forEach((pack) => {
                const targets = pack.target_audience;
                targetCounts[targets] += 1;
            });


            this.chartOptions = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'DISTRIBUTION OF TARGET'
                },
                xAxis: {
                    categories: allTarget
                },
                yAxis: {
                    title: {
                        text: 'How many instance per Target ?'
                    }
                },
                series: [
                    {
                        name: 'Number of Target Audience',
                        color: 'white',
                        data: allTarget.map((target_audience: string) => ({
                            y: targetCounts[target_audience],
                            color: targetCounts[target_audience] <= 1 ? '#eb5b5b' :
                                targetCounts[target_audience] > 1 && targetCounts[target_audience] < 5 ? '#ffb6c1' :
                                    targetCounts[target_audience] >= 5 ? '#27ae60' :
                                        '#27ae60'
                        }))
                    }
                ]
            };

        })

    }

    loadData_difficulty() {
        this.DbService.getAllPackages().subscribe((data: any[]) => {

            //on récupère tout les packages
            this.all_packages = data;

            const allDifficulties: string[] = ['Easy', 'Medium', 'Hard','Undefined'];


            const difficultyCount: { [category: string]: number } = allDifficulties.reduce((acc, level) => {
                acc[level] = 0;
                return acc;
            }, {} as { [level: string]: number });

            this.all_packages.forEach((pack) => {
                const level = pack.difficulty_level;
                difficultyCount[level] += 1;
            });


            this.chartOptions = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'DISTRIBUTION OF DIFFICULTY'
                },
                xAxis: {
                    categories: allDifficulties
                },
                yAxis: {
                    title: {
                        text: 'How many instance per Difficulty ?'
                    }
                },
                series: [
                    {
                        name: 'Number of Difficulty Level',
                        color: 'white',
                        data: allDifficulties.map((difficulty_level: string) => ({
                            y: difficultyCount[difficulty_level],
                            color: difficultyCount[difficulty_level] <= 1 ? '#eb5b5b' :
                                difficultyCount[difficulty_level] > 1 && difficultyCount[difficulty_level] < 5 ? '#ffb6c1' :
                                    difficultyCount[difficulty_level] >= 5 ? '#27ae60' :
                                        '#27ae60'
                        }))
                    }
                ]
            };

        })

    }

    updateChart(): void {

      //on lis la valeur dans le drop down
        console.log(this.type_charts);

        switch (this.type_charts) {

            case 'Target':
                this.loadData_target();
                break;
            case 'Difficulty':
                this.loadData_difficulty();
                break;
            default: //par défault c'est category
                this.loadData_default();
                break;
        }

    }
}
