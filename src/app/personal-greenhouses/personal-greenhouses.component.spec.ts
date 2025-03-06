import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalGreenhousesComponent } from './personal-greenhouses.component';

describe('PersonalGreenhousesComponent', () => {
  let component: PersonalGreenhousesComponent;
  let fixture: ComponentFixture<PersonalGreenhousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalGreenhousesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalGreenhousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
