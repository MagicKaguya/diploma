import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PopupService } from '../popup.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CoursesService } from '../courses.service';

const types = ['Практика', 'Лекция'];

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit, OnChanges {

  @Input() pair;
  @Input() item;
  @Input() index;

  public data;
  public dayForm: FormGroup;
  public isVisible = false;
  private isInitialized = false;

  constructor(
    private popupService: PopupService,
    private formBuilder: FormBuilder,
    private coursesService: CoursesService
    ) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  acceptDelete() {
    this.popupService.onAcceptHandler();
    this.popupService.hidePopup();
  }

  hideVisiblePop() {
    this.isInitialized = false;
    this.popupService.hidePopup();
  }

  showVisiblePop() {
    this.isVisible = this.popupService.isVisible;
    if (this.isVisible) {
      this.data = this.pair;
      if (this.data && !this.isInitialized) {
        this.createForm(this.data);
      }
    }
    return this.isVisible;
  }

  saveChanges() {
    const form = this.dayForm;

    const json = {
      title: form.get('title').value,
      type: form.get('type').value,
      teacher: form.get('teacher').value,
      class: form.get('class').value
    }

    this.coursesService.updateSchedule$(this.item.id, this.index, json).subscribe(() => {
      
    });

    this.hideVisiblePop();
  }

  private createForm(data): FormGroup {

    this.dayForm = this.formBuilder.group({
      title: [data.title],
      type: [data.type],
      teacher: [data.teacher],
      class: [data.class]
    });

    this.isInitialized = true;

    return this.dayForm;
  }

}
