import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddGroupComponent } from './edit-add-group.component';

describe('EditAddGroupComponent', () => {
  let component: EditAddGroupComponent;
  let fixture: ComponentFixture<EditAddGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
