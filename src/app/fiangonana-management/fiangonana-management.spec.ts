import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiangonanaManagement } from './fiangonana-management';

describe('FiangonanaManagement', () => {
  let component: FiangonanaManagement;
  let fixture: ComponentFixture<FiangonanaManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiangonanaManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiangonanaManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
