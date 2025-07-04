import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiangonanaListComponent } from './fiangonana-list-component';

describe('FiangonanaListComponent', () => {
  let component: FiangonanaListComponent;
  let fixture: ComponentFixture<FiangonanaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiangonanaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiangonanaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
