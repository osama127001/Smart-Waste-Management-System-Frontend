import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RegionalAdminService } from './regional-admin.service';
import { Admin } from '../admin/admin.model';
import { Subscription } from 'rxjs';
import { Dustbin } from '../dustbins/dustbin.model';
import { LatLngLiteral } from '@agm/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDustbinComponent } from './add-dustbin/add-dustbin.component';
import { AddDriverComponent } from './add-driver/add-driver.component';

@Component({
  selector: 'app-regional-admin',
  templateUrl: './regional-admin.component.html',
  styleUrls: ['./regional-admin.component.css']
})
export class RegionalAdminComponent implements OnInit , OnDestroy{


  private adminDetails: Admin;
  private adminDetailsSub: Subscription;
  private dustbinsLocation: Dustbin[] = [];
  private dustbinsLocationForCollection: { location: LatLngLiteral, stopover: boolean }[] = [];
  origin: LatLngLiteral = { lat: 0, lng: 0 };
  destination: LatLngLiteral = { lat: 0, lng: 0 };


  constructor(private regionalAdminService: RegionalAdminService, private authService: AuthService, private dialog: MatDialog) {}


  ngOnInit() {
    this.getRegionDetails(localStorage.getItem('regionCode'));  
    this.getDustbins(localStorage.getItem('regionCode')); 
    this.getDriverByRegion(localStorage.getItem('regionCode')); 
  }

  getRegionDetails(regionCode: string) {
    this.regionalAdminService.getRegionAdminDetails(regionCode);
    this.adminDetailsSub = this.regionalAdminService.getRegionalAdminDetailsListener()
      .subscribe((adminDetailsResponse) => {
        this.adminDetails = adminDetailsResponse;
        console.log(this.adminDetails);
      });
  }

  getDustbins(region: string) {
    this.regionalAdminService.getAllDustbinsByRegion(region);
    this.regionalAdminService.getAllDustbinsByRegionDataListener()
      .subscribe((dustbinData) => {
        this.dustbinsLocation = dustbinData;
        var temp: { location: LatLngLiteral, stopover: boolean } [] = [];
        for (let i = 0; i < dustbinData.length; i++) {
          if (dustbinData[i].status > 50) {
            temp.push({ location: dustbinData[i].location, stopover: dustbinData[i].stopover });
          }
        }
        this.dustbinsLocationForCollection = temp;
        // this.origin = this.dustbinsLocationForCollection[0].location;
        // this.destination = this.dustbinsLocationForCollection[this.dustbinsLocationForCollection.length - 1].location;
      });
  }

  getDriverByRegion(regionCode: string) {
    this.regionalAdminService.getDriversByRegion(regionCode);
    this.regionalAdminService.getAllDriversByRegionUpdated()
      .subscribe(driversData => {
        console.log(driversData);
      });
  }

  openAddDustbinForm() {
    this.dialog.open(AddDustbinComponent, {
      disableClose: true,
      width: '1000px',
      height: '600px'
    });
  }

  openAddDriverForm() {
    this.dialog.open(AddDriverComponent, {
      disableClose: true,
      width: '500px'
    });
  }

  ngOnDestroy() {
    this.adminDetailsSub.unsubscribe();
  }

}
