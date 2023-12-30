import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-achievements-page',
  templateUrl: './achievements-page.component.html',
  styleUrl: './achievements-page.component.css'
})
export class DisplayAchievements implements OnInit {
  constructor(private http: HttpClient,private route: ActivatedRoute) {}

  packages: any[] = [];
  completed_packages: any[] = [];
  Achievements = false;

  ngOnInit() {
    this.http.get<any[]>('/api/getpackage').subscribe(
      (data) => {
        this.packages = data; //listes de tt les packages

        if(this.packages != null)
        {
          this.packages.forEach((packageInstance) => {
            // Do something with each packageInstance
            console.log(packageInstance);

            //on check si la package est fini
            if(packageInstance.finished_package){
              this.completed_packages.push(packageInstance);
            }
          });

          if(this.completed_packages.length == 0){
            console.log("nothing");
            this.Achievements = false;
          }
          else this.Achievements = true;
        }
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des packages:', error);
      }
    );
  };


}
