import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveIntegrations } from './active-integrations';

describe('ActiveIntegrations', () => {
  let component: ActiveIntegrations;
  let fixture: ComponentFixture<ActiveIntegrations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveIntegrations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveIntegrations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
