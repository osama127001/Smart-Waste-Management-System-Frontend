import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-coordinates',
  templateUrl: './add-coordinates.component.html',
  styleUrls: ['./add-coordinates.component.css']
})
export class AddCoordinatesComponent implements OnInit {

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  // subscriptions
  private regionNamesAndLocationSub: Subscription;

  onCloseDialog() {
    this.dialog.closeAll();
  }

  ngOnInit() {
    this.getAllRegionNamesAndLocations();
  }

  getAllRegionNamesAndLocations() {
    this.authService.getRegionCoordsAndNamesForSignup();
    this.regionNamesAndLocationSub = this.authService.getRegionCoordsAndNamesForSignupListener()
      .subscribe((data) => {
        console.log(data);
      });
  }

}
