import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { Waypoints } from 'src/app/dustbins/waypoints.model';

@Component({
  selector: 'app-add-coordinates',
  templateUrl: './add-coordinates.component.html',
  styleUrls: ['./add-coordinates.component.css']
})
export class AddCoordinatesComponent implements OnInit {

  constructor(private dialog: MatDialog, private authService: AuthService, private dialogRef: MatDialogRef<AddCoordinatesComponent>) { }

  // properties
  regionNamesAndLocations: {regionName: String, regionCode: String, regionLocation: Waypoints}[];
  buttonStartText: String = 'Select Region';
  addCoordsLat: number;
  addCoordsLng: number;
  private formLatValue: number = 29.978474;
  private formLngValue: number = 69.295871;
  private selectedRegionCode: string;


  // subscriptions
  private regionNamesAndLocationSub: Subscription;

  onCloseDialog() {
    this.dialog.closeAll();
  }

  onAddCoords() {
    this.dialogRef.close({regionCode: this.selectedRegionCode, dustbinLocation: { lat: this.formLatValue, lng: this.formLngValue }});
  }
 
  onMapClick($event) {
    this.formLatValue = $event.coords.lat;
    this.formLngValue = $event.coords.lng;
  }

  ngOnInit() {
    this.getAllRegionNamesAndLocations();
  }

  getAllRegionNamesAndLocations() {
    this.authService.getRegionCoordsAndNamesForSignup();
    this.regionNamesAndLocationSub = this.authService.getRegionCoordsAndNamesForSignupListener()
      .subscribe((data) => {
        console.log(data);
        this.regionNamesAndLocations = data.regionDetails;
      });
  }

  onSelectRegion(selectedRegionName: string, selectedRegionCode: string, selectedRegionLocation: any) {
    this.buttonStartText = selectedRegionName;
    this.addCoordsLat = selectedRegionLocation.lat;
    this.addCoordsLng = selectedRegionLocation.lng;
    this.selectedRegionCode = selectedRegionCode;
  }


}
