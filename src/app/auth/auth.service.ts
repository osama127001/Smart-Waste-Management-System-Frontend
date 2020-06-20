import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Admin } from '../admin/admin.model';


@Injectable({ providedIn: 'root' })
export class AuthService {

  // backend server link for sending requests
  private backendLink = 'http://localhost:3000';

  // token sent from the backend
  private token: string;

  // token observable, keeps the frontend updated with the token
  private authStatusListener = new Subject<boolean>();

  // send the region code of regional admin when login
  private adminRegionCodeListener = new Subject<string>();

  // check if user is signed inn or not
  private isAuthenticated = false;

  // timer for the expiration of token
  private tokenTimer: any;

  // checks if user is in the Homepage
  isHomepage = false;

  // contructor with dependency injections
  constructor(private http: HttpClient, private router: Router) {}

  // returns the token
  getToken() {
    return this.token;
  }

  // returns the isAuthenticated boolean
  getIsAuth() {
    return this.isAuthenticated;
  }

  // observable listener for the authentication boolean
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // observable listener for the regional-admin's regionCode
  getAdminRegionCodeListener() {
    return this.adminRegionCodeListener.asObservable();
  }

  // User Sign Up Request
  userSignUp(data: any) {
    this.http.post(this.backendLink + '/api/customer/signup', data)
      .subscribe((result) => {
        console.log(result);
      });
  }

  // User Login Request
  userLogin(data: { email: string, password: string }) {
    // check the domain of the email to send the request respectively.
    if (data.email.split('@')[1] === 'superadmin.com' || data.email.split('@')[1] === 'admin.com') {
      this.http.post<{ message: string, user: string, token: string, expiresIn: number, regionCode: string }>
        (this.backendLink + '/api/admin/adminlogin', data)
        .subscribe((response) => {
          console.log(response);
          const token = response.token;
          this.token = token;
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          console.log(expirationDate);
          this.isAuthenticated = true;
          if (response.user === 'superadmin') {
            this.router.navigate(['/superadmin']);
          } else {
            // this.adminRegionCodeListener.next(response.regionCode);
            localStorage.setItem('regionCode', response.regionCode);
            localStorage.setItem('region', response.regionCode);
            this.router.navigate(['/regionaladmin']);
          }
        });
    } else if (data.email.split('@')[1] === 'driver.com') {
      this.http.post<{ message: string, user: string, token: string, expiresIn: number }>(this.backendLink + '/api/driver/driverLogin', data)
        .subscribe((response) => {
          console.log(response);
          const token = response.token;
          this.token = token;
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          console.log(expirationDate);
          this.isAuthenticated = true;
          // localStorage.setItem('regionCode', response.regionCode);
          // localStorage.setItem('region', response.regionCode);
          this.router.navigate(['/driver']);
        });
    } else if (data.email.split('@')[1] !== 'superadmin.com' || data.email.split('@')[1] !== 'admin.com' || data.email.split('@')[1] !== 'driver.com') {
      this.http.post<{ message: string, user: string, token: string, expiresIn: number }>
        (this.backendLink + '/api/customer/customerlogin', data)
        .subscribe((response) => {
          console.log(response);
          const token = response.token;
          this.token = token;
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          console.log(expirationDate);
          this.isAuthenticated = true;
          this.router.navigate(['/customer'])
        });
    } else {
      console.log('Please Enter Valid Email!');
    }
  }

  // Tries to automatically authenticate user when page is refreshed.
  autoAuthUser() {
    const authInformation = this.getAuthDataFromLocalStorage();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // logout any user that is signed in
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }

  // Saving Authentication Data in Browser's Memory
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }

  // clear the browser memory
  private clearAuthData() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    localStorage.clear();
  }

  // getting the Authentication Data from the local Storage
  private getAuthDataFromLocalStorage() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if (!token || !expirationDate) {
      return;
    }
    return { token: token, expirationDate: new Date(expirationDate) };
  }

  // setting timer for the expiration of the token.
  private setAuthTimer(duration: number) {
     console.log('Setting Timer: ' + duration);
     this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


}
