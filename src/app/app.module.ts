import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { TokenInterceptor } from './token.interceptor';
import { AddEditClientComponent } from './modules/client/add-edit/add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    AddEditClientComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false })
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    provideHttpClient(withInterceptors([TokenInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
