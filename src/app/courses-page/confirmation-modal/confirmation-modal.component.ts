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
  }

  acceptDelete() {
    this.popupService.onAcceptHandler();
    this.popupService.hidePopup();
  }

  undoDelete() {
    this.popupService.hidePopup();
  }

  showVisiblePop() {
    const isVisible = this.popupService.isVisible;
    if (isVisible) {
      this.data = this.pair;
    }
    return isVisible;
  }

}
