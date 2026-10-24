import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { AppReducer } from './app-state/app-reducers/app.reducers'
import { EffectsModule } from '@ngrx/effects'
import { MatDialogModule } from '@angular/material/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslocoHttpLoader, TranslocoRootModule } from './transloco-root.module'
import { provideNgxWebstorage } from 'ngx-webstorage'
import { AngularFireModule } from '@angular/fire/compat'
import { ErrorInterceptor, LoaderInterceptor, LorentzDialogModule } from '../../../lorentz-dialog'
import { provideRouter, RouterOutlet } from '@angular/router'
import { appRoutes } from './app-routing.module'


@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        StoreModule.forRoot(AppReducer, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, connectInZone: true }),
        EffectsModule.forRoot([]),
        MatDialogModule,
        TranslocoRootModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        LorentzDialogModule,
        RouterOutlet], providers: [
        provideRouter(appRoutes),
        provideHttpClient(withXhr(), withInterceptors([LoaderInterceptor, ErrorInterceptor])),
        TranslocoHttpLoader,
        provideNgxWebstorage()
    ] })
export class AppModule {}
