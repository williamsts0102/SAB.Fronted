import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaListComponent } from './alerta-list.component';

describe('AlertaListComponent', () => {
  let component: AlertaListComponent;
  let fixture: ComponentFixture<AlertaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
