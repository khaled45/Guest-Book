import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { GeustService } from './geust.service';


@Injectable({
  providedIn: 'root'
})
export class TokenEnterceptorService implements HttpInterceptor {

  constructor(private MyInjector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let _GeustService = this.MyInjector.get(GeustService)
    let token = _GeustService.CheckLogin()
    if (token) {
      let tokenized = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      return next.handle(tokenized)
    }
    else {
      let tokenized = req.clone({ setHeaders: { Authorization: `SignUp&Login` } })
      return next.handle(tokenized)
    }
  }
}
