import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddCoordinatesComponent } from './add-coordinates/add-coordinates.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isMatching = true;
  private formLatValue: number;
  private formLngValue: number;

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid Form');
      return;
    }
    if (form.value.password !== form.value.confirmPassword) {
      console.log('Password is not matching!');
      this.isMatching = false;
      return;
    }
    const fullName = form.value.firstName + ' ' + form.value.lastName;
    this.authService.userSignUp( {name: fullName, email: form.value.email, password: form.value.password} );
  }

  openAddCoordinatesForm() {
    const dialogRef = this.dialog.open(AddCoordinatesComponent, {
      disableClose: true,
      width: '600px',
      height: '900px'
    });
    dialogRef.afterClosed().subscribe(data => {
      this.formLatValue = data.dustbinLocation.lat;
      this.formLngValue = data.dustbinLocation.lng;
    });
  }

}
