import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPageComponent } from './success-page.component';

describe('SuccessComponent', () => {
  let component: SuccessPageComponent;
  let fixture: ComponentFixture<SuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
