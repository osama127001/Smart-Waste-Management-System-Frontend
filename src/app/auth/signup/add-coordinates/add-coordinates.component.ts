import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { Waypoints } from 'src/app/dustbins/waypoints.model';

@Component({
  selector: 'app-add-coordinates',
  templateUrl: './add-coordinates.component.html',
  styleUrls: ['./add-coordinates.component.css']
})
export class AddCoordinatesComponent implements OnInit {

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  // properties
  regionNamesAndLocations: {regionName: String, regionCode: String, regionLocation: Waypoints}[];
  buttonStartText: String = 'Select Region';

  // subscriptions
  private regionNamesAndLocationSub: Subscription;

  onCloseDialog() {
    this.dialog.closeAll();
  }

  ngOnInit() {
    console.log('1');
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

  onSelectRegion(regionName: String) {
    this.buttonStartText = regionName;
  }


}
