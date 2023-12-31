import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import { DbServiceService } from "../db-service.service";

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrl: './fact.component.css'
})
export class FactComponent {
  @Input() fact: any;
  @Input() package: any;
  @Output() factDeleted: EventEmitter<void> = new EventEmitter<void>();

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
    this.deleteFact();
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

  confirmDelete(): void {
    const confirmation = confirm('Are you sure you want to delete this fact?');

    if (confirmation) {
      this.deleteFact();

    }
  }

  deleteFact(){
    this.DbService.deleteFact(this.fact.id_fact).subscribe(
      () => {
        this.factDeleted.emit();
      },
      (error) => {
        console.error('Error deleting fact:', error);
      }
    );
  }
}
