import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-newaccount-form',
  templateUrl: './newaccount-form.component.html',
  styleUrl: './newaccount-form.component.css'
})
export class NewaccountFormComponent {
  constructor(private http: HttpClient) {}

  firstname_user: string = '';
  lastname_user: string = '';
  email_user: string = '';
  password_user: string = '';

  insertUser() {
    const userData = {
      email_user: this.email_user,
      password_user: this.password_user,
      firstname_user: this.firstname_user,
      lastname_user: this.lastname_user
    };

    this.http.post('/api/createUser', userData)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
