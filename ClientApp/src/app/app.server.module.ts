import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
//This package has been deprecated
//https://www.npmjs.com/package/@nguniversal/module-map-ngfactory-loader
//import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    imports: [AppModule, ServerModule],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
