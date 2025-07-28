import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasDetailsComponent } from './marcas-details.component';

describe('MarcasDetailsComponent', () => {
  let component: MarcasDetailsComponent;
  let fixture: ComponentFixture<MarcasDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcasDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
