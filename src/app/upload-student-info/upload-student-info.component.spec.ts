import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStudentInfoComponent } from './upload-student-info.component';

describe('UploadStudentInfoComponent', () => {
  let component: UploadStudentInfoComponent;
  let fixture: ComponentFixture<UploadStudentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStudentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStudentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
