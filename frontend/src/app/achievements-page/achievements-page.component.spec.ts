import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAchievements } from './achievements-page.component';

describe('DisplayAchievements', () => {
  let component: DisplayAchievements;
  let fixture: ComponentFixture<DisplayAchievements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayAchievements]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DisplayAchievements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
