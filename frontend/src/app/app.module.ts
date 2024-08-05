import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ToolAreaComponent } from './components/tool-area/tool-area.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemeToggleButtonComponent } from './components/navbar/theme-toggle-button/theme-toggle-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ToolAreaComponent,
    NavbarComponent,
    ThemeToggleButtonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
