import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Admin } from '../admin/admin.model';
import { Dustbin } from '../dustbins/dustbin.model';
import { MatDialog } from '@angular/material/dialog';


@Injectable({providedIn: 'root'})
export class SuperAdminService {

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  private backendLink = 'http://localhost:3000';
  private allAdminsData: Admin[];
  private allDustbinsByRegionData: Dustbin[];
  private allAdminsUpdated = new Subject<Admin[]>();
  private allDustBinsUpdated = new Subject<Dustbin[]>();


  getAdminsUpdateListener() {
    return this.allAdminsUpdated.asObservable();
  }

  getDustbinsUpdateListener() {
    return this.allDustBinsUpdated.asObservable();
  }

  getAllAdmins() {
    this.http.get<{ message: string, dataOfAdmins: Admin[] }>(this.backendLink + '/api/admin/getAdmins')
      .subscribe((responseData) => {
        this.allAdminsData = responseData.dataOfAdmins;
        this.allAdminsUpdated.next([...this.allAdminsData]);
      });
  }

  getAllDustbinsByRegion(regionCode: string) {
    this.http.get<{ message: string, dustbins: Dustbin[] }>(this.backendLink + '/api/dustbin/' + regionCode)
      .subscribe((responseData) => {
        this.allDustbinsByRegionData = responseData.dustbins;
        this.allDustBinsUpdated.next([...this.allDustbinsByRegionData]);
      });
  }

  addAdmin(data: any) {
    this.http.post(this.backendLink + '/api/admin/addadmin', data)
      .subscribe((res) => {
        console.log(res);
      });
  }

  deleteRegionBySuperAdmin(regionalAdminCnic: string) {
    this.http.delete(this.backendLink + '/api/admin/delete-region/' + regionalAdminCnic)
      .subscribe(data => {
        console.log(data);
      })
  }

}
