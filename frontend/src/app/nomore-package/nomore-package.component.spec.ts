import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomorePackageComponent } from './nomore-package.component';

describe('NomorePackageComponent', () => {
  let component: NomorePackageComponent;
  let fixture: ComponentFixture<NomorePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NomorePackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NomorePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
