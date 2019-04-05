import { Component, OnChanges, SimpleChanges, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Author } from '../author.model';
import { AuthorControl } from '../author-control.model';

@Component({
  selector: 'app-edit-add-page-courses-autors',
  templateUrl: './edit-add-page-courses-autors.component.html',
  styleUrls: ['./edit-add-page-courses-autors.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditAddPageCoursesAutorsComponent),
      multi: true,
    }
  ]
})
export class EditAddPageCoursesAutorsComponent implements OnChanges, ControlValueAccessor {
  @Input() authors: Author[] = [];
  public authorControls: AuthorControl[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (!(changes.authors && changes.authors.currentValue)) {
      return;
    }

    const newAuthors: Author[] = changes.authors.currentValue;
    if (!newAuthors.length) {
      this.authorControls = [];
      return;
    }

    const newAuthorControls: AuthorControl[] = newAuthors.map((newAuthor) => {
      const existingAuthor = this.authorControls.find(author => author.id === newAuthor.id);

      return {
        ...newAuthor,
        isSelected: existingAuthor ? existingAuthor.isSelected : false
      };
    });

    this.authorControls = newAuthorControls;
  }

  writeValue(authors: Author[]) {
    if (!authors || !authors.length) {
      this.authorControls.forEach(author => author.isSelected = false);
      return;
    }

    this.authorControls.forEach((authorControl) => {
      if (authors.find(author => author.id === authorControl.id)) {
        authorControl.isSelected = true;
      } else {
        authorControl.isSelected = false;
      }
    });
  }

  registerOnChange(fn: (authors: Author[]) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  onAuthorBoxClick() {
    this.onTouched();
    this.onAuthorsChange();
  }

  private onChange(authors: Author[]) {}

  private onTouched() {}

  private onAuthorsChange() {
    const changedAuthors = this.authorControls
      .filter(author => author.isSelected)
      .map((author) => {
        return {
          id: author.id,
          firstName: author.firstName,
          lastName: author.lastName
        }
      });

    this.onChange(changedAuthors);
  }
}
