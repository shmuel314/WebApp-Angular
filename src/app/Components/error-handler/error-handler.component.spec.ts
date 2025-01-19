import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorHandleComponent } from './error-handler.component';

describe('ErrorHandleComponent', () => {
  let component: ErrorHandleComponent;
  let fixture: ComponentFixture<ErrorHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorHandleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
