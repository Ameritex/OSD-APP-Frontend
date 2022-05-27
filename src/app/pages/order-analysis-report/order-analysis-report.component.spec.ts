/* eslint-disable @typescript-eslint/no-unused-vars */
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {OrderAnalysisReportComponent} from './order-analysis-report.component';

describe('OrderAnalysisReportComponent', () => {
    let component: OrderAnalysisReportComponent;
    let fixture: ComponentFixture<OrderAnalysisReportComponent>;
   
  
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OrderAnalysisReportComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderAnalysisReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
