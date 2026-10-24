import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { VehiclesModule } from './vehicles/vehicles.module'
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http'

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        VehiclesModule], providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())] })
export class AppModule {}
