/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VesselComponent } from './Vessel.component';

describe('VesselComponent', () => {
  let component: VesselComponent;
  let fixture: ComponentFixture<VesselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VesselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
