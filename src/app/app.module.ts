import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { DataServiceService } from './data-service.service';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeroSelectionComponent } from './hero-selection/hero-selection.component';
import { BoardComponent } from './board/board.component';
import { CardShopComponent } from './card-shop/card-shop.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'welcome', component: LandingPageComponent },
  { path: 'selection', component: HeroSelectionComponent },
  { path: 'board', component: BoardComponent },
  { path: 'shop', component: CardShopComponent },
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeroSelectionComponent,
    BoardComponent,
    CardShopComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent],
  exports: [ RouterModule ]
})
export class AppModule { }
