import { Route } from '@angular/router'
import { CoursesPageContainerComponent } from './courses-page/courses-page-container/courses-page-container.component';
import { NotFoundPageComponent } from './courses-page/not-found-page/not-found-page.component';
import { EditAddPageContainerComponent } from './courses-page/edit-add-page-container/edit-add-page-container.component';
import { AuthorizationComponent } from './authorization/authorization/authorization.component';
import { AuthorizeGuard } from './guards/authorize.guard';
import { LoginGuard } from './guards/login.guard';
import { RegistrationComponent } from './authorization/registration/registration.component';

export const ROUTES: Route[] = [
    { path: '', redirectTo: 'courses', pathMatch: 'full' },
    { path: 'courses', component: CoursesPageContainerComponent, canActivate: [AuthorizeGuard] },
    { path: 'courses/:id', component: EditAddPageContainerComponent, canActivate: [AuthorizeGuard] },
    { path: 'login', component: AuthorizationComponent, canActivate: [LoginGuard] },
    { path: 'registration', component: RegistrationComponent },
    { path: '**', component: NotFoundPageComponent }
];

