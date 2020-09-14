import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { GeustService } from "../../Services/geust.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private _GeustService: GeustService, private MyRouter: Router) { }

  signUpForm: FormGroup
  Error: boolean = false
  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: this.fb.group({
        city: ['', [Validators.required]],
        state: ['', [Validators.required]]
      }),
      Zip: ['', [Validators.required]]
    })
  }

  signup() {
    debugger
    this._GeustService.signUp(this.signUpForm.value).subscribe((resp: any) => {
      debugger
      if (resp.message === 'success') {
        this.Error = false
        this.MyRouter.navigate(['/login'])
      }
      else {
        this.Error = true
      }
    })
  }

}
