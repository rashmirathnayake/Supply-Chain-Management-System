import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RailwayManagementComponent } from './railway-management.component';

describe('RailwayManagementComponent', () => {
  let component: RailwayManagementComponent;
  let fixture: ComponentFixture<RailwayManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RailwayManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RailwayManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
