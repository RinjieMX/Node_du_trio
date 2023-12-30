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
  ngOnInit() {
    this.http.get<any[]>('/api/getpackage').subscribe(
      (data) => {
        this.packages = data; //packages qui seront affiché
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des packages:', error);
      }
    );
  };


}
