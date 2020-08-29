import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { VisualizationModule } from "./visualization/module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, VisualizationModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
