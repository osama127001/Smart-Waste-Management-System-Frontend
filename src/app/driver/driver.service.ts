import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { Driver } from './driver.model';
import { Subject } from 'rxjs';
import { DriverComponent } from './driver.component';

@Injectable({ providedIn: 'root' })
export class DriverService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  // get driver details by email id
  private driverDetailsUpdated = new Subject<Driver>();

  private backendLink = 'http://localhost:3000';

  getDriverDetailsUpdatedListener() {
    return this.driverDetailsUpdated.asObservable();
  }

  getDriverDetailsByEmail(email: string) {
    this.http.get<{ message: string, driverDetails: Driver }>(this.backendLink + '/api/driver/get-driver-details-by-email/' + email)
      .subscribe((response) => {
        this.driverDetailsUpdated.next(response.driverDetails);
      });
  }

}
