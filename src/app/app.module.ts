import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SeeingHomeMaterialModule} from './seeing-home-material/seeing-home-material.module';
import {AuthModule} from './auth/auth.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {TaskModule} from './task/task.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    SeeingHomeMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    TaskModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
