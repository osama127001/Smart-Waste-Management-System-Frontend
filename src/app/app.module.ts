import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MapsComponent } from './maps/maps.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { RegionalAdminComponent } from './regional-admin/regional-admin.component';
import { AddAdminComponent } from './super-admin/add-admin/add-admin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthIntercerptor } from './auth/auth-interceptor';
import { AgmDirectionModule } from 'agm-direction';
import { AddDustbinComponent } from './regional-admin/add-dustbin/add-dustbin.component';
import { AddDriverComponent } from './regional-admin/add-driver/add-driver.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { DriverComponent } from './driver/driver.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    SuperAdminComponent,
    HomepageComponent,
    MapsComponent,
    AdminComponent,
    CustomerComponent,
    RegionalAdminComponent,
    AddAdminComponent,
    AddDustbinComponent,
    AddDriverComponent,
    DriverComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,
    AgmDirectionModule,
    MatInputModule,
    MatExpansionModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDhzLpQzGJkZWVMY0EeojVFwgyoZpHgTH0'
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthIntercerptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [AddAdminComponent, AddDustbinComponent, AddDriverComponent]
})
export class AppModule { }
