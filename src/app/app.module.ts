import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarAddComponent } from './car-add/car-add.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'add',      component: CarAddComponent },
  { path: 'login',      component: LoginComponent },
  { path: ':id',      component: CarDetailComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarDetailComponent,
    CarAddComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
