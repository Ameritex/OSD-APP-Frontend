/* eslint-disable @typescript-eslint/no-unused-vars */
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {UserActivityComponent} from './user-activity.component';

describe('UserActivityComponent', () => {
    let component: UserActivityComponent;
    let fixture: ComponentFixture<UserActivityComponent>;
   
  
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [UserActivityComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(UserActivityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
