import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './main-layout/main-layout.component';

import { NotFoundComponent } from './main-layout/not-found/not-found.component';

import { AuthenticationLayoutComponent } from './main-layout/authentication-layout/authentication-layout.component';
import { HomeLayoutComponent } from './main-layout/home-layout/home-layout.component';

import { LoginComponent } from './main-layout/authentication-layout/login/login.component';
import { SignupComponent } from './main-layout/authentication-layout/signup/signup.component';
import { EmailVerificationComponent } from './main-layout/authentication-layout/email-verification/email-verification.component';

import { PostsComponent } from './main-layout/home-layout/posts/posts.component';
import { DetailComponent } from './main-layout/home-layout/posts/detail/detail.component';
import { CreateComponent } from './main-layout/home-layout/posts/create/create.component';

import { ProfileComponent } from './main-layout/home-layout/profile/profile.component';
import { EditComponent } from './main-layout/home-layout/profile/edit/edit.component';
import { UserComponent } from './main-layout/home-layout/profile/user/user.component';

import { SettingsComponent } from './main-layout/home-layout/settings/settings.component';

import { AuthGuardGuard } from './auth-guard.guard';
import { AuthenticatedGuardGuard } from './authenticated-guard.guard';

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
    { path: 'auth', component: AuthenticationLayoutComponent, children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate:[AuthenticatedGuardGuard] },
      { path: 'signup', component: SignupComponent, pathMatch: 'full', canActivate:[AuthenticatedGuardGuard] },
      { path: 'email/:id', component: EmailVerificationComponent, pathMatch: 'full' }
    ]},
    { path: 'home', component: HomeLayoutComponent, children: [
      { path: 'posts', component: PostsComponent, pathMatch: 'full', canActivate:[AuthGuardGuard] },
      { path: 'posts/detail/:id', component: DetailComponent, pathMatch: 'full', canActivate:[AuthGuardGuard] },
      { path: 'posts/create', component: CreateComponent, pathMatch: 'full', canActivate:[AuthGuardGuard] },
      { path: 'profile', component: ProfileComponent, pathMatch: 'full', canActivate:[AuthGuardGuard]},
      { path: 'user-profile/:id', component: UserComponent, pathMatch: 'full', canActivate:[AuthGuardGuard]},
      { path: 'profile-edit', component: EditComponent, pathMatch: 'full', canActivate:[AuthGuardGuard] },
      { path: 'settings', component: SettingsComponent, pathMatch: 'full', canActivate:[AuthGuardGuard] }
    ]}
  ]},
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
