import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalAdminComponent } from './regional-admin.component';

describe('RegionalAdminComponent', () => {
  let component: RegionalAdminComponent;
  let fixture: ComponentFixture<RegionalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
