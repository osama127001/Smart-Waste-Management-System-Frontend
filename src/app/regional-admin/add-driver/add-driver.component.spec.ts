import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDriverComponent } from './add-driver.component';

describe('AddDriverComponent', () => {
  let component: AddDriverComponent;
  let fixture: ComponentFixture<AddDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
