import { ChangeDetectorRef, Component, Input} from '@angular/core';
import { DbServiceService } from "../db-service.service";

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrl: './fact.component.css'
})
export class FactComponent {
  @Input() fact: any;
  @Input() package: any;

  isEditing: boolean = false;
  editedRecto: string = '';
  editedVerso: string = '';

  constructor(private cdr: ChangeDetectorRef, private DbService: DbServiceService) { }

  startEdit() {
    this.isEditing = true;
    this.editedRecto = this.fact.recto;
    this.editedVerso = this.fact.verso;
    this.cdr.detectChanges();
  }

  cancelEdit() {
    this.isEditing = false;
  }

  commitEdit() {
    this.fact.recto = this.editedRecto;
    this.fact.verso = this.editedVerso;
    this.isEditing = false;

    this.DbService.editFact(this.fact.id_fact, this.editedRecto, this.editedVerso).subscribe(
      (updatedFact) => {
        this.fact = updatedFact;
      },
      (error) => {
        console.error('Error updating fact:', error);
      }
    );
  }

  deleteFact(){
    this.DbService.deleteFact(this.fact.id_fact).subscribe(
      (error) => {
        console.error('Error deleting fact:', error);
      }
    );
  }
}