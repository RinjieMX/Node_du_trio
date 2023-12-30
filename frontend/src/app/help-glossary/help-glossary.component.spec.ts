import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpGlossaryComponent } from './help-glossary.component';

describe('HelpGlossaryComponent', () => {
  let component: HelpGlossaryComponent;
  let fixture: ComponentFixture<HelpGlossaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpGlossaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpGlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
