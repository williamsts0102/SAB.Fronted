import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalListaComponent } from './personal-lista.component';

describe('PersonalListaComponent', () => {
  let component: PersonalListaComponent;
  let fixture: ComponentFixture<PersonalListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
