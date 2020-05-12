import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { RegionalAdminService } from '../regional-admin.service';
import { Subscription } from 'rxjs';
import { Dustbin } from 'src/app/dustbins/dustbin.model';


@Component({
  selector: 'app-add-dustbin',
  templateUrl: './add-dustbin.component.html',
  styleUrls: ['./add-dustbin.component.css']
})
export class AddDustbinComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog, private regionalAdminService: RegionalAdminService) { }

  private addAddAdminMapLatitude: number = 0;
  private addAddAdminMapLongitude: number = 0;
  private getAddAdminFormCoordsSub: Subscription;
  private getDustbinLocationsSub: Subscription;
  dustbinLocations: Dustbin[] = [];
  private formLatValue: number = 0;
  private formLngValue: number = 0;

  ngOnInit() {
    this.setAddAdminMapCoords();
    this.setDustbinLocations();
  }

  onCloseDialog() {
    this.dialog.closeAll();
  }

  setAddAdminMapCoords() {
    this.regionalAdminService.getRegionAdminDetails(localStorage.getItem('regionCode'));
    this.getAddAdminFormCoordsSub = this.regionalAdminService.getRegionalAdminDetailsListener()
      .subscribe((adminDetails) => {
        this.addAddAdminMapLatitude = adminDetails.location.lat;
        this.addAddAdminMapLongitude = adminDetails.location.lng;
      });
  }

  setDustbinLocations() {
    this.regionalAdminService.getAllDustbinsByRegion(localStorage.getItem('regionCode'));
    this.getDustbinLocationsSub = this.regionalAdminService.getAllDustbinsByRegionDataListener()
      .subscribe((dustbins) => {
        this.dustbinLocations = dustbins;
      });
  }

  onMapClick($event) {
    this.formLatValue = $event.coords.lat;
    this.formLngValue = $event.coords.lng;    
  }

  onAddDustbin(form: NgForm) {
    if (form.invalid) {
      console.log("Add Dustbin form is invalid!");
      return;
    }
    this.regionalAdminService.addDustbin(localStorage.getItem('regionCode'), { 
      dustbinId: form.value.dustbinId,
      dustbinAddress: form.value.dustbinAddress,
      location: { lat: form.value.latitude, lng: form.value.longitude }
    });
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    this.getAddAdminFormCoordsSub.unsubscribe();
    this.getDustbinLocationsSub.unsubscribe();
    window.location.reload();
  }


}
