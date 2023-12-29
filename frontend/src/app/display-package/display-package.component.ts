import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display-package',
  templateUrl: './display-package.component.html',
  styleUrl: './display-package.component.css'
})
export class DisplayPackageComponent implements OnInit {
  constructor(private http: HttpClient) {}

  packages: any[] = [];


  ngOnInit() {
    this.http.get<any[]>('/api/getpackage').subscribe(
      (data) => {
        this.packages = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des packages:', error);
      }
    );
  };
}
