import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DbServiceService} from "../db-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrl: './edit-package.component.css'
})

export class EditPackageComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute,private DbService: DbServiceService) {}

  currentPackage: any;

  isEditing: boolean = false;

  editedTitle: string = '';
  editedDescription: string = '';
  editedCategory: string = '';
  editedDifficulty: string = '';
  editedAudience: string = '';

  ngOnInit(){

    //Prendre le paramètre de l'URL et trouver le currentPackage
    this.route.params.subscribe(params => {
      const packid = params['id_package'];
      this.getcurrentpackagefromId(packid);
    });

  }

  getcurrentpackagefromId(id: number){
    this.DbService.getPackagesById(id).subscribe((data) => {
      this.currentPackage = data;

    });
  }

  startEdit() {
    this.isEditing = true;
    this.editedTitle = this.currentPackage.title_package;
    this.editedCategory = this.currentPackage.category;
    this.editedDifficulty = this.currentPackage.difficulty_level;
    this.editedAudience = this.currentPackage.target_audience;
    this.editedDescription = this.currentPackage.description_package;

  }

  cancelEdit() {
    this.isEditing = false;
  }

  commitEdit() {
    this.editedTitle = this.currentPackage.title_package;
    this.editedCategory = this.currentPackage.category;
    this.editedDifficulty = this.currentPackage.difficulty_level;
    this.editedAudience = this.currentPackage.target_audience;
    this.editedDescription = this.currentPackage.description_package;
    this.isEditing = false;

    this.DbService.editPackage(this.currentPackage.id_package, this.editedTitle, this.editedDescription, this.editedCategory,this.editedAudience,this.editedDifficulty).subscribe(
    (updatedPackage) => {
      console.log('Right in the .ts');
      this.currentPackage = updatedPackage;
    },
    (error) => {
      console.error('Error updating fact:', error);
    });
  }

  getWidthDescription(): string {
    const factor = 10;
    return (this.currentPackage.description_package.length) * factor + 'px';
  }
  getWidthTitle(): string {
    const factor = 25;
    return (this.currentPackage.title_package.length) * factor + 'px';
  }

  confirmDelete(): void {
    const confirmation = confirm('Are you sure you want to delete this package?');

    if (confirmation) {
        this.DbService.deletePackage(this.currentPackage.id_package);

    }
  }


}
