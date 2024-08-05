import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ToolAreaComponent } from './components/tool-area/tool-area.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemeToggleButtonComponent } from './components/navbar/theme-toggle-button/theme-toggle-button.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LangToggleButtonComponent } from './components/navbar/lang-toggle-button/lang-toggle-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ToolAreaComponent,
    NavbarComponent,
    ThemeToggleButtonComponent,
    LangToggleButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app.routing.module';
// import { AppComponent } from './app.component';
// import { CanvasComponent } from './components/canvas/canvas.component';
// import { ToolAreaComponent } from './components/tool-area/tool-area.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { NavbarComponent } from './components/navbar/navbar.component';
// import { ThemeToggleButtonComponent } from './components/navbar/theme-toggle-button/theme-toggle-button.component';
// import { HttpClient } from '@angular/common/http';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { LangToggleButtonComponent } from './components/navbar/lang-toggle-button/lang-toggle-button.component';
// import {
//   provideHttpClient,
//   withInterceptorsFromDi,
// } from '@angular/common/http';

// @NgModule({
//   declarations: [
//     AppComponent,
//     CanvasComponent,
//     ToolAreaComponent,
//     NavbarComponent,
//     ThemeToggleButtonComponent,
//     LangToggleButtonComponent,
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     FontAwesomeModule,
//     TranslateModule.forRoot({
//       loader: {
//         provide: TranslateLoader,
//         useFactory: HttpLoaderFactory,
//         deps: [HttpClient],
//       },
//       defaultLanguage: 'en',
//     }),
//   ],
//   providers: [provideHttpClient(withInterceptorsFromDi())],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
