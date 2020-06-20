import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriverService } from './driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit, OnDestroy {

  constructor(private driverService: DriverService) { }

  // subscription for getting driver details by email id.
  private driverDetailsSub: Subscription;

  ngOnInit() {
    this.getDriverDetailsByEmailId(localStorage.getItem('driver-email'));
  }

  getDriverDetailsByEmailId(email: string) {
    this.driverService.getDriverDetailsByEmail(email);
    this.driverDetailsSub = this.driverService.getDriverDetailsUpdatedListener()
      .subscribe((driverDetailsFromBackend) => {
        console.log(driverDetailsFromBackend);
      });
  }

  ngOnDestroy() {
    this.driverDetailsSub.unsubscribe();
  }

}
