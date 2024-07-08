import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoPersonalComponent } from './grupo-personal.component';

describe('GrupoPersonalComponent', () => {
  let component: GrupoPersonalComponent;
  let fixture: ComponentFixture<GrupoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoPersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
