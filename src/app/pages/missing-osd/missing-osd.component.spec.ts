import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingOsdComponent } from './missing-osd.component';

describe('MissingOsdComponent', () => {
  let component: MissingOsdComponent;
  let fixture: ComponentFixture<MissingOsdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingOsdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingOsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
