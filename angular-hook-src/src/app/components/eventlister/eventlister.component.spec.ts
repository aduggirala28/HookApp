/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventlisterComponent } from './eventlister.component';

describe('EventlisterComponent', () => {
  let component: EventlisterComponent;
  let fixture: ComponentFixture<EventlisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventlisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventlisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
