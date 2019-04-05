import { Component, OnInit, OnDestroy } from '@angular/core';
import { InitializationService } from './initialization/initialization.service';
import { LoaderService } from './loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  public title = 'app';
  public isInitialized: boolean = false;
  public isLoaderShown: boolean = true;

  private initialSubscription: Subscription;
  private loaderSubscription: Subscription;

  constructor(public initializationService: InitializationService, private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.initialSubscription = this.initializationService.isInitialized$()
      .subscribe((initialized) => {
        this.isInitialized = initialized;
      });

    this.loaderSubscription = this.loaderService.isLoaderShown$()
      .subscribe((isShown) => {
        // убирает ошибку когда isShown меняется в момент выполнения change detection
        setTimeout(() => {
          this.isLoaderShown = isShown;
        }, 0);
      });

    this.initializationService.init();
  }

  ngOnDestroy () {
    this.initialSubscription.unsubscribe();
    this.loaderSubscription.unsubscribe();
  }
}
