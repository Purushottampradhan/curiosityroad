import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedataComponent } from './issuedata.component';

describe('IssuedataComponent', () => {
  let component: IssuedataComponent;
  let fixture: ComponentFixture<IssuedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuedataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
