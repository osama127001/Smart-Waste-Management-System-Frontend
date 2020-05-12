import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

/* this interceptor will run a funnction(intercept()) that will execute on every outgoing 
   request from the angular app. */
@Injectable()
export class AuthIntercerptor implements HttpInterceptor{

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', "Bearer +" + authToken)
        });
        return next.handle(authRequest);
    }
}