import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDustbinComponent } from './add-dustbin.component';

describe('AddDustbinComponent', () => {
  let component: AddDustbinComponent;
  let fixture: ComponentFixture<AddDustbinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDustbinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDustbinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
