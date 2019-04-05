import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import {AccordionModule} from 'primeng/accordion'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; 

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { LoaderModule } from './loader/loader.module';
import { CoursesPageModule } from './courses-page/courses-page.module';
import { PopupService } from './courses-page/popup.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthorizationService } from './authorization/authorization.service';
import { AuthorizeGuard } from './guards/authorize.guard';
import { LoginGuard } from './guards/login.guard';
import { CoursesService } from './courses-page/courses.service';
import { AuthorsService } from './courses-page/authors.service';
import { StorageService } from './storage/storage.service';
import { InitializationService } from './initialization/initialization.service';
import { ApiService } from './api/api.service';

import { AuthorizationInterceptor } from './authorization/authorization.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, MainModule, CoursesPageModule, AuthorizationModule, HttpClientModule, LoaderModule,
    RouterModule.forRoot(ROUTES), AccordionModule, BrowserAnimationsModule
  ],
  providers: [
    PopupService,
    CoursesService,
    AuthorsService,
    StorageService,
    InitializationService,
    AuthorizeGuard,
    LoginGuard,
    AuthorizationService,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
