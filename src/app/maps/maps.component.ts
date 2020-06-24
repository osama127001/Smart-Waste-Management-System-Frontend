import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { google } from 'google-maps';
import { Dustbin } from '../dustbins/dustbin.model';
import { LatLngLiteral } from '@agm/core';
import { Waypoints } from '../dustbins/waypoints.model';

declare var google: google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('areaLatitude') latitude: number;

  // tslint:disable-next-line: no-input-rename
  @Input('areaLongitude') longitude: number;

  // tslint:disable-next-line: no-input-rename
  @Input('dustbinsData') dustbinsData: Dustbin[] = [];

  // origin of the path generated
  @Input('origin') origin: LatLngLiteral = { lat: 0, lng: 0 };

  // destination of the path generated
  @Input('destination') destination: LatLngLiteral = { lat: 0, lng: 0 };

  // waypoints of the path generated
  @Input('routeAssignedList') routeAssignedList: { driverName: string, dustbinsAssigned: Waypoints[] }[] = [];

  // Custom Render Options
  customRenderOptions = {
    suppressMarkers: true,
    height: 100,
    width: 100
  };

  // Custom Marker
  customIconUrl = {
    url: '../assets/img/dbin2.png',
    scaledSize: {
      width: 20,
      height: 30
    }
  };

  zoom = 15;
  // originTest: { lat: number, lng: number } = {
  //   lat: 33.692386,
  //   lng: 73.005635
  // };

  // destinationTest: { lat: number, lng: number } = {
  //   lat: 33.722854,
  //   lng: 73.080363
  // }

  constructor() { }

  ngOnInit() {

  }

  onMapReady(mapInstance) {
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(mapInstance);
  }

  onMouseOver(infoWindow, gm) {
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

  onMouseOut(infoWindow, gm) {
    gm.lastOpen = infoWindow;
    infoWindow.close();
  }




}
