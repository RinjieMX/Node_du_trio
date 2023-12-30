import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts/highstock';
import {forkJoin, Observable} from "rxjs";
import { DbServiceService } from "../db-service.service";

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
  //public learningFacts: any;
  packageId:number=4 ;
  public tableau1: any[]= [];
  public tableau2: any[]= [];
  public tableau3: any[]= [];
  public tableau4: any[]= [];
  public AllPackages: any;


  async getApiResponse(packagenumber: number): Promise<any[]> {
    try {
      const response = await this.httpClient.get(`/api/getactualfactfrompackage/${packagenumber}`).toPromise();
      const tab = response as any[];
      //console.log(tab[0]);
      return tab;
    } catch (error) {
      console.error('Erreur lors de la requête API :', error);
      throw error; // Rejeter l'erreur pour qu'elle soit gérée par l'appelant
    }
  }

  constructor(private DbService: DbServiceService,private httpClient: HttpClient) { }
  showdata(): void
  {
    console.log('showdatarunning');
    console.log(this.tableau1);


  }

  /*getpackaenumer():number
  {
   this.DbService.getAllPackages()
  }*/
  async ngOnInit() {
    console.log('Début de ngOnInit');
      this.loadData();
      //this.barchart();
    console.log('Fin de ngOnInit');
  }

  loadData() {
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

            this.chartOptions =
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
                    text: 'what was easy ? dificult?'
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





  /*
  console.log('Avant la requête HTTP');

  this.httpClient.get(`/api/getactualfactfrompackage/${this.packageId}`).subscribe(
    (response) => {
      console.log('Réponse de l\'API réussie :', response);
      this.learningFacts = response as any;
      console.log(this.learningFacts[0].state_fact);
      for (let i = 0; i < this.learningFacts.length; i++) {
        let fact = this.learningFacts[i];
        console.log(`Fact ${fact.id_fact}: ${fact.state_fact}`);
      }

    },
    (error) => {
      console.error('Erreur lors de la requête API :', error);
    }
  );*/




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
            text: 'PROGRESS IN ANKI'
          },
        subtitle:
          {
            text: 'what was easy? dificult?'
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

        series: this.Chartdata

      }

  }


  //highchartdata
  Chartdata= [
    {
      name: 'Easy',
      data:[2, 3, 1, 8],
      color: '#27ae60'
    },
    {
      name: 'correct',
      data:[4, 1, 3, 1],
      color: '#89e0ae'
    },
    {
      name: 'To review',
      data:[1, 7, 1, 1],
      color: '#ffb6c1'
    },
    {
      name: 'difficult',
      data:[1, 0, 2, 3],
      color: '#f06c84'
    }

  ]

}
