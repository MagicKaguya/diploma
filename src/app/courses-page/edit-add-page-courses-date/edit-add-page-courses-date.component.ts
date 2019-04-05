import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-edit-add-page-courses-date',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditAddPageCoursesDateComponent),
      multi: true,
    }
  ],
  templateUrl: './edit-add-page-courses-date.component.html',
  styleUrls: ['./edit-add-page-courses-date.component.css']
})
export class EditAddPageCoursesDateComponent implements OnInit, ControlValueAccessor {

  public dateValue: string;

  constructor() { }

  ngOnInit() { }

  writeValue(date: Date) {
    this.dateValue = date ? date.toLocaleDateString() : '';
  }

  registerOnChange(fn: (date: Date) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  onDateChange() {
    if (!this.dateValue) {
      this.onChange(null);
      return;
    }

    const dateMatched = /(\d{1,2})\.(\d{2})\.(\d{4})/.exec(this.dateValue);
    if (!dateMatched) {
      this.onChange(null);
      return;
    }

    const [, day, month, year] = dateMatched;
    const date = new Date(`${month}.${day}.${year}`);

    this.onChange(this.isDateInvalid(date) ? null : date);
  }

  onTouched() {}

  private onChange(date: Date) {
  }


  private isDateInvalid(date) {
    return isNaN(Date.parse(date.toString()));
  }
}
