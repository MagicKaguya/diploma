import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-edit-add-page-courses-duration',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditAddPageCoursesDurationComponent),
      multi: true,
    }
  ],
  templateUrl: './edit-add-page-courses-duration.component.html',
  styleUrls: ['./edit-add-page-courses-duration.component.css']
})
export class EditAddPageCoursesDurationComponent implements OnInit, ControlValueAccessor {

  public durationValue: number;

  constructor() { }

  ngOnInit() {
  }

  writeValue(duration: number) {
    this.durationValue = duration;
  }

  registerOnChange(fn: (duration: number) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  onDurationChange() {
    this.onChange(this.durationValue ? +this.durationValue : undefined);
  }

  onChange(duration: number) {}

  onTouched() {}
}
