import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomoreFactComponent } from './nomore-fact.component';

describe('NomoreFactComponent', () => {
  let component: NomoreFactComponent;
  let fixture: ComponentFixture<NomoreFactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NomoreFactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NomoreFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
