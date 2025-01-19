import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingHandleComponent } from './loader.component';

describe('LoadingHandleComponent', () => {
  let component: LoadingHandleComponent;
  let fixture: ComponentFixture<LoadingHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingHandleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
