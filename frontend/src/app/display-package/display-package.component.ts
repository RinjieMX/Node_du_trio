import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-package',
  templateUrl: './display-package.component.html',
  styleUrl: './display-package.component.css'
})
export class DisplayPackageComponent implements OnInit {
  constructor(private http: HttpClient,private route: ActivatedRoute) {}

  packages: any[] = [];

  ngOnInit() {
    const refresh = this.route.snapshot?.data['refresh'];
    if (refresh) {
      this.refreshPackages();
    }
  };

  refreshPackages(){
    this.http.get<any[]>('/api/getpackage').subscribe(
        (data) => {
          this.packages = data;
        },
        (error) => {
          console.error('Une erreur s\'est produite lors du chargement des packages:', error);
        }
    );
  }


}
