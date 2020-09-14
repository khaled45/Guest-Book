import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeustService } from "../../Services/geust.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isOpen: boolean = false

  constructor(private myGeustService: GeustService, private MyRouter:Router) { }

  ngOnInit() {
  }

  toggell() {
    if (this.isOpen) {
      return this.isOpen = false
    }
    else {
      this.isOpen = true
    }
  }

  LogedIn() {
    return this.myGeustService.CheckLogin()
  }

  logout():void {
     this.myGeustService.logout()
     this.MyRouter.navigate(['/'])
  }
  
}
