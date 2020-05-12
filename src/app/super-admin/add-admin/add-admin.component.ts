import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SuperAdminService } from '../super-admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  constructor(private superAdminService: SuperAdminService, private router: Router) { }

  onAddAdmin(form: NgForm) {
    if (form.invalid) {
      console.log('Add Admin Form is invalid');
      return;
    }
    this.superAdminService.addAdmin({
      regionName: form.value.regionName,
      regionCode: form.value.regionCode,
      regionAdminName: form.value.regionAdminName,
      regionAdminEmail: form.value.regionAdminEmail,
      regionAdminPassword: form.value.regionAdminPassword,
      regionAdminPhone: form.value.regionAdminPhone,
      regionAdminCnic: form.value.regionAdminCnic,
      regionLatitude: form.value.latitude,
      regionLongitude: form.value.longitude
    });
  }

  refreshSuperAdminPage() {
    this.router.navigate(['/superadmin']);
  }

  ngOnInit() {
  }

}
