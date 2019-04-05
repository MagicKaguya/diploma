import { Component, OnInit } from '@angular/core';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(private popupService: PopupService) { }

  ngOnInit() {}

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
