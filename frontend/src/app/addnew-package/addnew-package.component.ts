import {Component, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { NgForm } from '@angular/forms';

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


  @ViewChild('packageForm') packageForm!: NgForm;

  insertPackage(){

    if (this.packageForm.form.valid) {

      console.log('Insert Package method called');

      const packageData = {
        title_package: this.title_package,
        description_package: this.description_package,
        category: this.category,
        target_audience: this.target_audience,
        difficulty_level: this.difficulty_level
      };

      this.http.post('/api/createpackage', packageData)
        .subscribe(
          (response) => {
            this.packageAdded = true;

            // Reset the form fields after adding
            this.title_package = '';
            this.description_package = '';
            this.category = '';
            this.target_audience = '';
            this.difficulty_level = '';

            // Hide the message after a few seconds
            setTimeout(() => {
              this.packageAdded = false;
            }, 3000);

            console.log(response);
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      // Form is invalid, do something (optional)
      console.log('Insert Package not valid');
    }
  }
}
