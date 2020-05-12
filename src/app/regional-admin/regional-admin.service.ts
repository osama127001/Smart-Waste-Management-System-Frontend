import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { Admin } from '../admin/admin.model';
import { Dustbin } from '../dustbins/dustbin.model';

@Injectable({ providedIn: 'root' })
export class RegionalAdminService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  // backend server link for sending requests
  private backendLink = 'http://localhost:3000';

  // observable for regional admin details
  private regionalAdminDetailsUpdated = new Subject<Admin>();

  // getting Dustbins Data observable
  private allDustBinsUpdated = new Subject<Dustbin[]>();

  // All dustbins of a region
  private allDustbinsByRegionData: Dustbin[] = [];

  // admin details
  private adminDetails: Admin;

  
  getRegionalAdminDetailsListener() {
      return this.regionalAdminDetailsUpdated.asObservable();
  }

  getAllDustbinsByRegionDataListener() {
    return this.allDustBinsUpdated.asObservable();
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


}