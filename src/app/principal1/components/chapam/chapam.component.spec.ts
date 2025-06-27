import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapamComponent } from './chapam.component';

describe('ChapamComponent', () => {
  let component: ChapamComponent;
  let fixture: ComponentFixture<ChapamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChapamComponent]
    });
    fixture = TestBed.createComponent(ChapamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
