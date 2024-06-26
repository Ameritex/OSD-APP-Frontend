/* eslint-disable @typescript-eslint/no-unused-vars */
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ReportsComponent} from './reports.component';

describe('ReportsComponent', () => {
    let component: ReportsComponent;
    let fixture: ComponentFixture<ReportsComponent>;
   
  
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ReportsComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
