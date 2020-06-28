import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriverService } from './driver.service';
import { RegionalAdminService } from '../regional-admin/regional-admin.service';
import { Driver } from './driver.model';
import { Dustbin } from '../dustbins/dustbin.model';
import { Waypoints } from '../dustbins/waypoints.model';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit, OnDestroy {

  constructor(private driverService: DriverService, private regionalAdminService: RegionalAdminService) { }

  // subscription for getting driver details by email id.
  private driverDetailsSub: Subscription;
  private driverSub: Subscription;
  driversByRegion: Driver[] = [];
  driverDetails: any;
  private dustbinLocationForRouteCalculation: Dustbin[] = [];
  routeAssignedList: { driverName: string, driverEmail: string, customRenderOptions: { suppressMarkers: boolean }, dustbinsAssigned: Waypoints[], origin: Waypoints, destination: Waypoints }[] = [];
  routeAssignedListForDriver: { driverName: string, driverEmail: string, customRenderOptions: { suppressMarkers: boolean }, dustbinsAssigned: Waypoints[], origin: Waypoints, destination: Waypoints }[] = [];
  dustbinsLocation: Dustbin[] = [];
  private dustbinSub: Subscription;




  ngOnInit() {
    this.getDriverDetailsByEmailId(localStorage.getItem('driver-email'));
    this.getDustbinsForLocation(localStorage.getItem('driver-region-code'));
    this.getDriversByRegion(localStorage.getItem('driver-region-code'));
  }

  getDustbinsForLocation(region: string) {
    this.regionalAdminService.getAllDustbinsByRegion(region);
    this.dustbinSub = this.regionalAdminService.getAllDustbinsByRegionDataListener()
      .subscribe((dustbinData) => {
        this.dustbinsLocation = dustbinData;
        console.log(this.dustbinsLocation);
      });
  }

  getDriverDetailsByEmailId(email: string) {
    this.driverService.getDriverDetailsByEmail(email);
    this.driverDetailsSub = this.driverService.getDriverDetailsUpdatedListener()
      .subscribe((driverDetailsFromBackend) => {
        console.log(driverDetailsFromBackend);
        this.driverDetails = driverDetailsFromBackend;
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
        this.calculateRouteForDrivers(temp);
      });
  }

  calculateRouteForDrivers(driverDetails: any) {
    // tslint:disable-next-line: prefer-const
    console.log(driverDetails);
    let driverDetailsForRouteCalculation: { driverName: string, driverEmail: string, driverCapacity: number }[] = driverDetails;
    this.regionalAdminService.getAllDustbinsByRegion(localStorage.getItem('driver-region-code'));
    this.regionalAdminService.getAllDustbinsByRegionDataListener()
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
            dustbinsAssigned: temp,
            origin: temp[0],
            customRenderOptions: { suppressMarkers: true },
            destination: temp[temp.length - 1]
          });
          tempDustbinsToCollect.splice(a, b - a + 1);
        }        
        this.routeAssignedList.forEach(element => {
          if (element.driverEmail === localStorage.getItem('driver-email')) {
            this.routeAssignedListForDriver.push(element);
          }
        });
        console.log(this.routeAssignedListForDriver);
      });
  }


  ngOnDestroy() {
    this.driverDetailsSub.unsubscribe();
    this.driverSub.unsubscribe();
    this.dustbinSub.unsubscribe();
  }

}
