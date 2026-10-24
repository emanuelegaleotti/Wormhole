import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherComponent } from './feature/weather/weather.component';
import { SharedModule } from './shared/shared.module';

@NgModule({ declarations: [
        AppComponent,
        WeatherComponent,
    ],
    exports: [WeatherComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        SharedModule], providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())] })
export class AppModule { }
