import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterIntake } from './starter-intake';

describe('StarterIntake', () => {
  let component: StarterIntake;
  let fixture: ComponentFixture<StarterIntake>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarterIntake]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarterIntake);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
