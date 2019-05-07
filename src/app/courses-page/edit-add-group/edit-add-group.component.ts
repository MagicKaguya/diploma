import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Group } from '../groups.model';
import { map } from 'rxjs/operators';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-add-group',
  templateUrl: './edit-add-group.component.html',
  styleUrls: ['./edit-add-group.component.css']
})
export class EditAddGroupComponent implements OnInit {

  public groupForm: FormGroup;
  public isConfirmButtonDisabled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createGroupForm();
    this.groupForm.controls.name.valueChanges.pipe(
      map(value => {
        this.isConfirmButtonDisabled = value && value !== '' ?  false : true;
        return this.generateId(value);
      })
    ).subscribe(id => this.groupForm.patchValue({ id }))
  }

  public saveGroup() {
    const groupData: Group = {
      id: this.groupForm.get('id').value,
      name: this.groupForm.get('name').value
    }

    this.coursesService.createGroup$(groupData).subscribe(() => {
      this.router.navigateByUrl('/groups');
    });
  }

  public cancel() {
    this.router.navigateByUrl('/groups');
  }

  private createGroupForm() {
    return this.groupForm = this.formBuilder.group({
      id: [''],
      name: ['']
    });
  }

  private generateId(value: string) {
    if (value) {
      const _firstLetterAssociations = {
        "а": "a",
        "б": "b",
        "в": "v",
        "ґ": "g",
        "г": "g",
        "д": "d",
        "е": "e",
        "ё": "e",
        "є": "ye",
        "ж": "zh",
        "з": "z",
        "и": "i",
        "і": "i",
        "ї": "yi",
        "й": "i",
        "к": "k",
        "л": "l",
        "м": "m",
        "н": "n",
        "о": "o",
        "п": "p",
        "р": "r",
        "с": "s",
        "т": "t",
        "у": "u",
        "ф": "f",
        "х": "h",
        "ц": "c",
        "ч": "ch",
        "ш": "sh",
        "щ": "sh'",
        "ъ": "",
        "ы": "i",
        "ь": "",
        "э": "e",
        "ю": "yu",
        "я": "ya",
      };

      const _associations = Object.assign({}, _firstLetterAssociations);
      const input = value;
      const spaceReplacement = "_"
      const normalizedInput = input.normalize();

      let newStr = "";
      for (let i = 0; i < normalizedInput.length; i++) {
        const isUpperCaseOrWhatever = normalizedInput[i] === normalizedInput[i].toUpperCase();
        let strLowerCase = normalizedInput[i].toLowerCase();
        if (strLowerCase === " " && spaceReplacement) {
          newStr += spaceReplacement;
          continue;
        }
        let newLetter = (i === 0 ? _firstLetterAssociations : _associations)[strLowerCase];
        if ("undefined" === typeof newLetter) {
          newStr += isUpperCaseOrWhatever ? strLowerCase.toUpperCase() : strLowerCase;
        }
        else {
          newStr += isUpperCaseOrWhatever ? newLetter.toUpperCase() : newLetter;
        }
      }
      return newStr;
    }
  }

}
