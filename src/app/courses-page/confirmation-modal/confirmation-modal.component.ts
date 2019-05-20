import { Component, OnInit, Input } from '@angular/core';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() pair;
  @Input() item;
  @Input() index;

  public data;

  constructor(private popupService: PopupService) { }

  ngOnInit() {
    this.data = this.pair;
    console.log(this.data)

  }

  acceptDelete() {
    this.popupService.onAcceptHandler();
    this.popupService.hidePopup();
  }

  undoDelete() {
    this.popupService.hidePopup();
  }

  showVisiblePop() {
    return this.popupService.isVisible;
  }

}
