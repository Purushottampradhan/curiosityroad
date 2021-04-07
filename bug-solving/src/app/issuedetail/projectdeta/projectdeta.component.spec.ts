import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectdetaComponent } from './projectdeta.component';

describe('ProjectdetaComponent', () => {
  let component: ProjectdetaComponent;
  let fixture: ComponentFixture<ProjectdetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectdetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectdetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
