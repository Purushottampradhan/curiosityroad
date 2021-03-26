import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedetailComponent } from './issuedetail.component';

describe('IssuedetailComponent', () => {
  let component: IssuedetailComponent;
  let fixture: ComponentFixture<IssuedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuedetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
