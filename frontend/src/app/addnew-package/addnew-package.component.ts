import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-addnew-package',
  templateUrl: './addnew-package.component.html',
  styleUrl: './addnew-package.component.css'
})
export class AddnewPackageComponent {

  constructor(private http: HttpClient) {}

  title_package: string = '';
  description_package: string = '';
  category: string = '';
  target_audience: string = '';
  difficulty_level: string = '';
  packageAdded: boolean = false;

  insertPackage(){
    const PackageData = {
      title_package: this.title_package,
      description_package: this.description_package,
      category: this.category,
      target_audience: this.target_audience,
      difficulty_level: this.difficulty_level
    };

    this.http.post('/api/createpackage', PackageData)
      .subscribe(
        (response) => {

          this.packageAdded = true;

          // Réinitialiser les champs après l'ajout
          this.title_package = '';
          this.description_package = '';
          this.category = '';
          this.target_audience = '';
          this.difficulty_level = '';

          // Masquer le message après quelques secondes
          setTimeout(() => {
            this.packageAdded = false;
          }, 3000);

          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
