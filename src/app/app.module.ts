import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared/shared-module';
import { APP_INITIALIZER } from '@angular/core';
import { Seed } from './core/services/seed';
import { AuthModule } from './features/auth/auth-module';

function initSeed(seed: Seed) {
  return () => seed.loadIfEmpty();
}

registerLocaleData(localeAr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    AuthModule
  ],
  providers: [
    { provide: APP_INITIALIZER, multi: true, useFactory: initSeed, deps: [Seed] },
    { provide: LOCALE_ID, useValue: 'ar' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
