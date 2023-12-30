import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts/highstock';
import {Observable} from "rxjs";
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
    try {
      const [response1, response2, response3, response4] = await Promise.all([
        this.getApiResponse(1),
        this.getApiResponse(2),
        this.getApiResponse(3),
        this.getApiResponse(4),
      ]);

      //console.log('Réponses de l\'API réussies :', response1, response2, response3, response4);

      this.tableau1 = response1;
      this.tableau2 = response2;
      this.tableau3 = response3;
      this.tableau4 = response4;
      console.log(response1)
      this.showdata();
      this.barchart();
      //console.log(response1[0].state_fact);
      //console.log(response1[1].state_fact);

      for (let i = 0; i < response1.length; i++) {
        console.log(response3[i].state_fact);
      }



    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }

    console.log('Fin de ngOnInit');
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
      data:[2, 3, 1, 8]
    },
    {
      name: 'correct',
      data:[4, 1, 3, 1]
    },
    {
      name: 'difficult',
      data:[1, 0, 2, 3]
    },
    {
      name: 'To review',
      data:[1, 7, 1, 1]
    }

  ]

}
