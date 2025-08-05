import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeedsComponent } from './leeds.component';

describe('LeedsComponent', () => {
  let component: LeedsComponent;
  let fixture: ComponentFixture<LeedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeedsComponent]
    });
    fixture = TestBed.createComponent(LeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
