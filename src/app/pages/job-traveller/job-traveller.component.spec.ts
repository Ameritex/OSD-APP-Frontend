/* eslint-disable @typescript-eslint/no-unused-vars */
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {JobTravellerComponent} from './job-traveller.component';

describe('JobTravellerComponent', () => {
    let component: JobTravellerComponent;
    let fixture: ComponentFixture<JobTravellerComponent>;
   
  
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [JobTravellerComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(JobTravellerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
