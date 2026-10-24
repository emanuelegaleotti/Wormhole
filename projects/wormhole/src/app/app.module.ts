import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http'
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
import { NgxWebstorageModule } from 'ngx-webstorage'
import { AngularFireModule } from '@angular/fire/compat'
import { ErrorInterceptor, LoaderInterceptor, LorentzDialogModule } from '../../../lorentz-dialog'
import { provideRouter, RouterOutlet } from '@angular/router'
import { appRoutes } from './app-routing.module'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(AppReducer, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production , connectInZone: true}),
    EffectsModule.forRoot([]),
    MatDialogModule,
    TranslocoRootModule,
    NgxWebstorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    LorentzDialogModule,
    RouterOutlet
  ],
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([LoaderInterceptor, ErrorInterceptor])),
    TranslocoHttpLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
