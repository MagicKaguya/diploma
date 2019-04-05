import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  public isVisible: boolean;
  public onAcceptHandler: ()=>{}; 

  constructor() { }

  public showPopup(onAcceptHandler): void {
    this.onAcceptHandler = onAcceptHandler;
    this.isVisible = true;
  }

  public hidePopup(): void {
    this.onAcceptHandler = null;
    this.isVisible = false;
  }
}
