import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-coordinates',
  templateUrl: './add-coordinates.component.html',
  styleUrls: ['./add-coordinates.component.css']
})
export class AddCoordinatesComponent implements OnInit {

  constructor(private dialog: MatDialog, private http: HttpClient) { }

  onCloseDialog() {
    this.dialog.closeAll();
  }

  ngOnInit() {
  }

  getAllRegionNamesAndLocations() {
    
  }

}
