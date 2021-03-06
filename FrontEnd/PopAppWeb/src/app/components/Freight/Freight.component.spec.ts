/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FreightComponent } from './Freight.component';

describe('FreightComponent', () => {
  let component: FreightComponent;
  let fixture: ComponentFixture<FreightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
