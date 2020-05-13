import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { Admin } from '../admin/admin.model';
import { Dustbin } from '../dustbins/dustbin.model';
import { Driver } from '../driver/driver.model';

@Injectable({ providedIn: 'root' })
export class RegionalAdminService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  // backend server link for sending requests
  private backendLink = 'http://localhost:3000';

  // observable for regional admin details
  private regionalAdminDetailsUpdated = new Subject<Admin>();

  // getting Dustbins Data observable
  private allDustBinsUpdated = new Subject<Dustbin[]>();

  // getting region Code
  private routeAssignedUpdated = new Subject<any>();

  // All dustbins of a region
  private allDustbinsByRegionData: Dustbin[] = [];

  // Drivers of a region
  private allDriversByRegion: Driver[] = [];

  // Getting drivers data observable
  private allDriversByRegionUpdated = new Subject<Driver[]>();

  // admin details
  private adminDetails: Admin;

  
  getRouteAssignedListener() {
    return this.routeAssignedUpdated.asObservable();
  }

  getRegionalAdminDetailsListener() {
      return this.regionalAdminDetailsUpdated.asObservable();
  }

  getAllDustbinsByRegionDataListener() {
    return this.allDustBinsUpdated.asObservable();
  }

  getAllDriversByRegionUpdated() {
    return this.allDriversByRegionUpdated.asObservable();
  }

  getRegionAdminDetails(regionCode: string) {
    this.http.get<{ message: string, adminDetails: Admin }>(this.backendLink + '/api/admin/getAdminDetails/' + regionCode)
        .subscribe((response) => {
            this.adminDetails = response.adminDetails;
            this.regionalAdminDetailsUpdated.next(this.adminDetails);
        });
  }

  getAllDustbinsByRegion(regionCode: string) {
    this.http.get<{ message: string, dustbins: Dustbin[] }>(this.backendLink + '/api/dustbin/' + regionCode)
      .subscribe((responseData) => {
        this.allDustbinsByRegionData = responseData.dustbins;
        this.allDustBinsUpdated.next([...this.allDustbinsByRegionData]);
      });
  }

  getDriversByRegion(region: string) {
    this.http.get<{ message: string, driversData: Driver[] }>(this.backendLink + '/api/driver/get-driver-by-region/' + region)
      .subscribe((response) => {
        this.allDriversByRegion = response.driversData;
        this.allDriversByRegionUpdated.next([...this.allDriversByRegion]);
      });
  }

  addDustbin(region: string, data: any) {
    this.http.post(this.backendLink + '/api/dustbin/add/' + region, data)
      .subscribe((response) => {
        console.log(response);
      });
  }

  addDriver(data: any) {
    this.http.post(this.backendLink + '/api/driver/addDriver', data)
      .subscribe((response) => {
        console.log(response);
      });
  }

  toggleDriverRouteAssigned(email: {emailId: string}) {
    this.http.put<{message: string}>(this.backendLink + '/api/driver/toggle-route-assigned', email)
      .subscribe(response => {
        this.routeAssignedUpdated.next(response);
      });
  }


}