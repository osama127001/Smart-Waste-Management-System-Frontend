import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DriverService {

  constructor(private http: HttpClient, private authService: AuthService) {}

}
