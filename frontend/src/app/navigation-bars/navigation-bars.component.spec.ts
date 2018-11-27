import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarsComponent } from './navigation-bars.component';

describe('NavigationBarsComponent', () => {
  let component: NavigationBarsComponent;
  let fixture: ComponentFixture<NavigationBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationBarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
