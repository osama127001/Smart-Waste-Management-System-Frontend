import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Waste Management | 101';
  private backendLink = 'http://localhost:3000';
  apiKey: string;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.getAPIKey();
  }

  getAPIKey() {
    this.http.get<{ api_Key: string }>(this.backendLink + '/get/api_key')
      .subscribe((apiKeyObject) => {
        this.apiKey = apiKeyObject.api_Key;
        console.log(this.apiKey);
      });
  }
}
