import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinnyPage } from './finny-page';

describe('FinnyPage', () => {
  let component: FinnyPage;
  let fixture: ComponentFixture<FinnyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinnyPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinnyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
