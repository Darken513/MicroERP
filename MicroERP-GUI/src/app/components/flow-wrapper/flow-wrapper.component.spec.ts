import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowWrapperComponent } from './flow-wrapper.component';

describe('FlowWrapperComponent', () => {
  let component: FlowWrapperComponent;
  let fixture: ComponentFixture<FlowWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlowWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
