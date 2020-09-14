import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { GeustService } from "../../Services/geust.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private _GeustService: GeustService, private MyRouter: Router, private MyCookieService: CookieService) { }
  Error: boolean = false
  LoginForm: FormGroup
  ngOnInit() {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    this._GeustService.login({
      email: this.LoginForm.value.email,
      password: this.LoginForm.value.password
    }).subscribe((resp: any) => {
      if (resp.message === 'success') {
        this.Error = false
        console.log(resp.token)
        this.MyCookieService.set('token', resp.token)
        this.MyRouter.navigate(['/'])
      }
      else {
        this.Error = true
      }
    })
  }
}
