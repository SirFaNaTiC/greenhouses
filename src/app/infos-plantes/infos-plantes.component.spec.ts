import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosPlantesComponent } from './infos-plantes.component';

describe('InfosPlantesComponent', () => {
  let component: InfosPlantesComponent;
  let fixture: ComponentFixture<InfosPlantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfosPlantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfosPlantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
