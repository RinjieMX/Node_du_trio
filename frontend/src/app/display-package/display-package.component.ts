import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-display-package',
  templateUrl: './display-package.component.html',
  styleUrl: './display-package.component.css'
})
export class DisplayPackageComponent implements OnInit {
  constructor(private http: HttpClient,private route: ActivatedRoute) {}

  packages: any[] = [];
  all_packages: any[]=[];

  selectedCategory: string = 'Any';
  selectedAudience: string = 'Any';
  selectedLevel: string = 'Any';

  ngOnInit() {
    const refresh = this.route.snapshot?.data['refresh'];
    if (refresh) {
      this.refreshPackages();
    }
  };

  refreshPackages(){
    this.http.get<any[]>('/api/getpackage').subscribe(
        (data) => {
          this.packages = data; //packages qui seront affiché
          this.all_packages = data; //sauvegarde pour stocker tout les packages
        },
        (error) => {
          console.error('Une erreur s\'est produite lors du chargement des packages:', error);
        }
    );
  }

  applyFilters() {
    // Filter packages based on selected filters
    console.log("on filtre");
    let filteredPackages = this.all_packages;

    if (this.selectedAudience !== 'Any') {
      filteredPackages = filteredPackages.filter(pkg => pkg.target_audience === this.selectedAudience);
    }

    if (this.selectedLevel !== 'Any') {
      filteredPackages = filteredPackages.filter(pkg => pkg.difficulty_level === this.selectedLevel);
    }

    if (this.selectedCategory !== 'Any') {
      filteredPackages = filteredPackages.filter(pkg => pkg.category === this.selectedCategory);
    }

    if(this.selectedAudience == 'Any' && this.selectedLevel == 'Any' && this.selectedCategory == 'Any')
    {
      //on refresh
      console.log("0 filtres");
      this.refreshPackages();
    }
    else this.packages = filteredPackages; //les packages qu'on affiche

  }


}
