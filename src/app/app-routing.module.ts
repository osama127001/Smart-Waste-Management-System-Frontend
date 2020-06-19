import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { MapsComponent } from './maps/maps.component';
import { RegionalAdminComponent } from './regional-admin/regional-admin.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthGuard } from './auth/auth.guard';
import { DriverComponent } from './driver/driver.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: '', component: HomepageComponent},
  { path: 'homepage', component: HomepageComponent},
  { path: 'superadmin', component: SuperAdminComponent, canActivate: [AuthGuard]},
  { path: 'maps', component: MapsComponent},
  { path: 'regionaladmin', component: RegionalAdminComponent, canActivate: [AuthGuard]},
  { path: 'customer', component: CustomerComponent},
  { path: 'driver', component: DriverComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
