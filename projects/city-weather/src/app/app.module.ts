import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module'
import { CityWeatherComponent } from './feature/city-weather/city-weather.component'
import { ReactiveFormsModule } from '@angular/forms'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

@NgModule({ declarations: [
        AppComponent,
        CityWeatherComponent
    ],
    exports: [CityWeatherComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        SharedModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
