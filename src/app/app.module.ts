import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './api-intercepter';

import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './MaterialComponents/material.module';
import { EditorModule } from "@tinymce/tinymce-angular";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeLayoutComponent } from './main-layout/home-layout/home-layout.component';
import { AuthenticationLayoutComponent } from './main-layout/authentication-layout/authentication-layout.component';
import { LoginComponent } from './main-layout/authentication-layout/login/login.component';
import { SignupComponent } from './main-layout/authentication-layout/signup/signup.component';
import { ProfileComponent } from './main-layout/home-layout/profile/profile.component';
import { EditComponent } from './main-layout/home-layout/profile/edit/edit.component';
import { PostsComponent } from './main-layout/home-layout/posts/posts.component';
import { DetailComponent } from './main-layout/home-layout/posts/detail/detail.component';
import { CreateComponent } from './main-layout/home-layout/posts/create/create.component';
import { HeaderComponent } from './main-layout/home-layout/common/header/header.component';
import { SidebarComponent } from './main-layout/home-layout/common/sidebar/sidebar.component';
import { NotFoundComponent } from './main-layout/not-found/not-found.component';
import { SettingsComponent } from './main-layout/home-layout/settings/settings.component';
import { EmailVerificationComponent } from './main-layout/authentication-layout/email-verification/email-verification.component';
import { UserComponent } from './main-layout/home-layout/profile/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomeLayoutComponent,
    AuthenticationLayoutComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    EditComponent,
    PostsComponent,
    DetailComponent,
    CreateComponent,
    HeaderComponent,
    SidebarComponent,
    NotFoundComponent,
    SettingsComponent,
    EmailVerificationComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    EditorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
