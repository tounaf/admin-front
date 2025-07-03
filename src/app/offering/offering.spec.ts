import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Offering } from './offering';

describe('Offering', () => {
  let component: Offering;
  let fixture: ComponentFixture<Offering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Offering]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Offering);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
