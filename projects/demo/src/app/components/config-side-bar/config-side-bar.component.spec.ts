import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSideBarComponent } from './config-side-bar.component';

describe('ConfigSideBarComponent', () => {
  let component: ConfigSideBarComponent;
  let fixture: ComponentFixture<ConfigSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
