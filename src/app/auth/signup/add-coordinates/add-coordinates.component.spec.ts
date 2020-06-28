import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoordinatesComponent } from './add-coordinates.component';

describe('AddCoordinatesComponent', () => {
  let component: AddCoordinatesComponent;
  let fixture: ComponentFixture<AddCoordinatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoordinatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
