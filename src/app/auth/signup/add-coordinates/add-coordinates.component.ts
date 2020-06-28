import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-coordinates',
  templateUrl: './add-coordinates.component.html',
  styleUrls: ['./add-coordinates.component.css']
})
export class AddCoordinatesComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  onCloseDialog() {
    this.dialog.closeAll();
  }

  ngOnInit() {
  }

}
