import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddPageContainerComponent } from './edit-add-page-container.component';

describe('EditAddPageContainerComponent', () => {
  let component: EditAddPageContainerComponent;
  let fixture: ComponentFixture<EditAddPageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddPageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
