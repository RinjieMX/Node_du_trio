import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFactsComponent } from './display-facts.component';

describe('DisplayFactsComponent', () => {
  let component: DisplayFactsComponent;
  let fixture: ComponentFixture<DisplayFactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayFactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
