import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewaccountFormComponent } from './newaccount-form.component';

describe('NewaccountFormComponent', () => {
  let component: NewaccountFormComponent;
  let fixture: ComponentFixture<NewaccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewaccountFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewaccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
