
import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from "../db-service.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrl: './edit-package.component.css'
})

export class EditPackageComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute,private DbService: DbServiceService,private router: Router) {}

  currentPackage: any;

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


}
