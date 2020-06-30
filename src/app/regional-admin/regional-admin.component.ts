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
import { Driver } from '../driver/driver.model';
import { Waypoints } from '../dustbins/waypoints.model';
import { RenderOptions } from './render-options.model';

@Component({
  selector: 'app-regional-admin',
  templateUrl: './regional-admin.component.html',
  styleUrls: ['./regional-admin.component.css']
})
export class RegionalAdminComponent implements OnInit, OnDestroy {


  adminDetails: Admin;
  private adminDetailsSub: Subscription;
  private routeAssignedSub: Subscription;
  private dustbinSub: Subscription;
  private driverSub: Subscription;
  private dustbinsForRouteCalculationSub: Subscription;
  dustbinsLocation: Dustbin[] = [];
  private dustbinLocationForRouteCalculation: Dustbin[] = [];
  driverDetailsForChips: any[] = [];
  private dustbinsLocationForCollection: { location: LatLngLiteral, stopover: boolean }[] = [];
  origin: LatLngLiteral = { lat: 0, lng: 0 };
  destination: LatLngLiteral = { lat: 0, lng: 0 };
  driversByRegion: Driver[] = [];
  private driversForRouteAssigned: Driver[] = [];
  isAssignindLoading = false;
  private atLeastOneDriverAssigned = false;
  routeAssignedList: { driverName: string, driverEmail: string, customRenderOptions: RenderOptions, dustbinsAssigned: Waypoints[], origin: Waypoints, destination: Waypoints }[] = [];
  routeColors: string [] = [
    '#00f', // blue
    '#950', // red
    '#e7f', //light blue
    '#0f0', // green
    '#ff0', //yellow
    '#000', // black
  ];

  constructor(private regionalAdminService: RegionalAdminService, private authService: AuthService, private dialog: MatDialog) { }


  ngOnInit() {
    this.getRegionDetails(localStorage.getItem('regionCode'));
    this.getDustbinsForLocation(localStorage.getItem('regionCode'));
    this.getDriversByRegion(localStorage.getItem('regionCode'));
  }

  getRegionDetails(regionCode: string) {
    this.regionalAdminService.getRegionAdminDetails(regionCode);
    this.adminDetailsSub = this.regionalAdminService.getRegionalAdminDetailsListener()
      .subscribe((adminDetailsResponse) => {
        this.adminDetails = adminDetailsResponse;
        console.log(this.adminDetails);
      });
  }

  getDustbinsForLocation(region: string) {
    this.regionalAdminService.getAllDustbinsByRegion(region);
    this.dustbinSub = this.regionalAdminService.getAllDustbinsByRegionDataListener()
      .subscribe((dustbinData) => {
        this.dustbinsLocation = dustbinData;
      });
  }

  getDriversByRegion(regionCode: string) {
    this.regionalAdminService.getDriversByRegion(regionCode);
    this.driverSub = this.regionalAdminService.getAllDriversByRegionUpdated()
      .subscribe(driversData => {
        this.driversByRegion = driversData;
        const temp: { driverName: string, driverEmail: string, driverCapacity: number }[] = [];
        this.driversByRegion.forEach(element => {
          if (element.isRouteAssigned) {
            temp.push({ driverName: element.name, driverEmail: element.emailId, driverCapacity: element.capacity });
          }
        });
        this.driverDetailsForChips = temp;
        this.calculateRouteForDrivers(temp);
      });
  }

  calculateRouteForDrivers(driverDetails: any) {
    console.log(driverDetails);
    // tslint:disable-next-line: prefer-const
    let driverDetailsForRouteCalculation: { driverName: string, driverEmail: string, driverCapacity: number }[] = driverDetails;
    this.regionalAdminService.getAllDustbinsByRegion(localStorage.getItem('regionCode'));
    this.dustbinsForRouteCalculationSub = this.regionalAdminService.getAllDustbinsByRegionDataListener()
      .subscribe(dustbinLocations => {
        this.dustbinLocationForRouteCalculation = dustbinLocations;
        // tslint:disable-next-line: prefer-const
        let tempDustbinsToCollect: Dustbin[] = [];
        this.dustbinLocationForRouteCalculation.forEach(element => {
          if (element.status > 50) {
            tempDustbinsToCollect.push(element);
          }
        });
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < driverDetailsForRouteCalculation.length; i++) {
          // tslint:disable-next-line: prefer-const
          let temp: Waypoints[] = [];
          let temp2: any;
          if (tempDustbinsToCollect.length < driverDetailsForRouteCalculation[i].driverCapacity) {
            temp2 = tempDustbinsToCollect.length;
          } else {
            temp2 = driverDetailsForRouteCalculation[i].driverCapacity;
          }
          for (let j = 0; j < temp2; j++) {
            temp.push({ location: tempDustbinsToCollect[j].location, stopover: true });
          }
          // check not add if already available!
          const a = temp.indexOf(temp[0]);
          const b = temp.indexOf(temp[temp.length - 1]);
          this.routeAssignedList.push({ 
            driverName: driverDetailsForRouteCalculation[i].driverName, 
            driverEmail: driverDetailsForRouteCalculation[i].driverEmail,
            customRenderOptions: { suppressMarkers: true, polylineOptions: { strokeColor: this.routeColors[i], strokeOpacity: 0.5, strokeWeight: 6 } },
            dustbinsAssigned: temp,
            origin: temp[0],
            destination: temp[temp.length - 1],
          });
          tempDustbinsToCollect.splice(a, b - a + 1);
        }
        console.log(this.routeAssignedList);
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

  onToggleRouteAssigned(email: string) {
    this.driverSub.unsubscribe();
    this.isAssignindLoading = true;
    this.regionalAdminService.toggleDriverRouteAssigned({ emailId: email });
    this.routeAssignedSub = this.regionalAdminService.getRouteAssignedListener()
      .subscribe(data => {
        this.getDriversByRegion(localStorage.getItem('regionCode'));
        this.isAssignindLoading = false;
      });
    window.location.reload();
  }

  onDeleteDriver(email: string) {
    console.log(email);
    this.regionalAdminService.deleteDriver(email);
  }

  ngOnDestroy() {
    this.adminDetailsSub.unsubscribe();
    if (this.atLeastOneDriverAssigned) {
      this.routeAssignedSub.unsubscribe();
    }
    this.dustbinSub.unsubscribe();
    this.driverSub.unsubscribe();
    this.dustbinsForRouteCalculationSub.unsubscribe();
  }


}
