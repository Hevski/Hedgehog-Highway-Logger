// import { ModalComponent } from './modal/modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapToolsComponent } from './map-tools/map-tools.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapToolsComponent,
    // ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    // ModalComponent,
  ],
})
export class AppModule { }
