import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiangonanaFormComponent } from './fiangonana-form-component';

describe('FiangonanaFormComponent', () => {
  let component: FiangonanaFormComponent;
  let fixture: ComponentFixture<FiangonanaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiangonanaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiangonanaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
