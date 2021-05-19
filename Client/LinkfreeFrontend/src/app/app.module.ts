import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LinksViewComponent } from './links-view/links-view.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { LinkService } from './link.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { DesktopContainerComponent } from './desktop-container/desktop-container.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { CreateLinkComponent } from './create-link/create-link.component';
import { EditLinkComponent } from './edit-link/edit-link.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    LinksViewComponent,
    RegisterComponent,
    LoginComponent,
    ImageUploadComponent,
    DesktopContainerComponent,
    FormFieldComponent,
    CreateLinkComponent,
    EditLinkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [AuthService, AuthGuard, LinkService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
