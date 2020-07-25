import { Component, OnInit, OnDestroy } from '@angular/core';
import { SuperAdminService } from './super-admin.service';
import { Subscription } from 'rxjs';
import { Admin } from '../admin/admin.model';
import { Dustbin } from '../dustbins/dustbin.model';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminComponent } from './add-admin/add-admin.component';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit, OnDestroy {

  constructor(private superAdminService: SuperAdminService,
              private dialog: MatDialog) {}

  private adminSub: Subscription;
  private dustbinsSub: Subscription;
  allAdminsData: Admin[] = [];
  dustbinsByRegion: Dustbin[] = [];
  binLocations: {lat: number, lng: number}[] = [];
  subscriptionUsed: boolean = false; // property created so that the dustbinsSub is not null.
  waypoints: { location: { lat: number, lng: number }, stopover: boolean }[] = [];
  origin: { lat: number, lng: number };
  destination: { lat: number, lng: number };

  ngOnInit() {
    this.getAllAdmins();
  }


  getAllAdmins() {
    this.superAdminService.getAllAdmins();
    this.adminSub = this.superAdminService.getAdminsUpdateListener()
      .subscribe((AdminsData) => {
        console.log(AdminsData);
        this.allAdminsData = AdminsData;
      });
  }

  getAllDustbinsByRegion(regionCode: string) {
    this.waypoints = [];
    this.superAdminService.getAllDustbinsByRegion(regionCode);
    this.dustbinsSub = this.superAdminService.getDustbinsUpdateListener()
      .subscribe((dustbins) => {
        this.dustbinsByRegion = dustbins;

        // setting the waypoints array, Threshold = 50%
        for (let i = 0; i < this.dustbinsByRegion.length; i++) {
          if (this.dustbinsByRegion[i].status >= 50) {
            this.waypoints.push({ 
              location: { lat: this.dustbinsByRegion[i].location.lat, lng: this.dustbinsByRegion[i].location.lng }, 
              stopover: this.dustbinsByRegion[i].stopover 
            })
          }
        }
        this.origin = this.waypoints[0].location;
        this.destination = this.waypoints[0].location;
      });
  }

  deleteRegion(regionToDelete: string) {
    console.log(regionToDelete);
    this.superAdminService.deleteRegionBySuperAdmin(regionToDelete);
    window.location.reload();
  }


  panelOpened(regionCode: string) {
    this.getAllDustbinsByRegion(regionCode);
    this.subscriptionUsed = true;
  }

  openAddAdminForm() {
    this.dialog.open(AddAdminComponent, { width: '700px' });
  }


  panelClosed() {
    this.dustbinsByRegion = [];
    this.waypoints = [];
    this.dustbinsSub.unsubscribe();
  }

  ngOnDestroy() {
    this.adminSub.unsubscribe();
    if(this.subscriptionUsed) {
      this.dustbinsSub.unsubscribe();
    }
  }

}
