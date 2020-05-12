import { Location } from '@angular/common';

export interface Admin {
  name: string;
  cnic: string;
  cellNo: string;
  region: string;
  regionCode: string;
  emailId: string;
  password: string;
  isSuperAdmin: boolean;
  dustbins: { lat: number, lng: number }[];
  location: { lat: number, lng: number };
}
