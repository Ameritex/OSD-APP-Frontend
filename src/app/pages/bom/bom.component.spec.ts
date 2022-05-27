/* eslint-disable @typescript-eslint/no-unused-vars */
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {BOMComponent} from './bom.component';

describe('BOMComponent', () => {
    let component: BOMComponent;
    let fixture: ComponentFixture<BOMComponent>;
   
  
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [BOMComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(BOMComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
