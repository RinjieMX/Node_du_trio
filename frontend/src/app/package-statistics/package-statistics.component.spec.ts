import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageStatisticsComponent } from './package-statistics.component';

describe('PackageStatisticsComponent', () => {
  let component: PackageStatisticsComponent;
  let fixture: ComponentFixture<PackageStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackageStatisticsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PackageStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
