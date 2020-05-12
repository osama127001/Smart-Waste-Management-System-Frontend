import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { RegionalAdminService } from '../regional-admin.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog, private regionalAdminService: RegionalAdminService) { }

  ngOnInit() {
  }

  onCloseDialog() {
    this.dialog.closeAll();
  }

  onAddDriver(form: NgForm) {
    if (form.invalid) {
      console.log("Invalid Form");
      return;
    }
    this.regionalAdminService.addDriver({
      name: form.value.driverName,
      cellNo: form.value.driverCellNo,
      cnic: form.value.driverCnic,
      region: localStorage.getItem('region'),
      regionCode: localStorage.getItem('regionCode'),
      capacity: form.value.capacity,
      emailId: form.value.driverEmail,
      password: form.value.driverPassword
    });
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    window.location.reload();
  }

}
