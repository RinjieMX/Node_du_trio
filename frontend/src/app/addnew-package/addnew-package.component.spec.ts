import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewPackageComponent } from './addnew-package.component';

describe('AddnewPackageComponent', () => {
  let component: AddnewPackageComponent;
  let fixture: ComponentFixture<AddnewPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddnewPackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddnewPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
