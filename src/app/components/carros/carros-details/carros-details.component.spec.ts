import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosDetailsComponent } from './carros-details.component';

describe('CarrosDetailsComponent', () => {
  let component: CarrosDetailsComponent;
  let fixture: ComponentFixture<CarrosDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrosDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
