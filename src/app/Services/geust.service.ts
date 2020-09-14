import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class GeustService {
  constructor(private myHttpClient: HttpClient, private MyCookieService: CookieService) { }
  backendURL = 'http://localhost:8080/guest/'

  signUp(Data) {
    return this.myHttpClient.post(this.backendURL + 'signUp', Data)
  }
  login(Data) {
    return this.myHttpClient.post(this.backendURL + 'login', Data)
  }
  CheckLogin() {
    let token = this.MyCookieService.get('token')
    if (token) {
      return token
    }
    else {
      return false
    }
  }
  addMessage(Data) {
    return this.myHttpClient.post(this.backendURL + 'AddMessage', Data)
  }
  getMyMessages() {
    return this.myHttpClient.get(this.backendURL + 'MyMessages')
  }
  deleteMessage(id) {
    return this.myHttpClient.delete(this.backendURL + 'deleteMessage/' + id)
  }
  gelAllMessages() {
    return this.myHttpClient.get(this.backendURL + 'AllMessages')
  }
  logout() {
    this.MyCookieService.delete('token')
  }
  getMessage(id) {
    return this.myHttpClient.get(this.backendURL + 'getMessage/' + id)
  }
  editeMessage(Data) {
    return this.myHttpClient.post(this.backendURL + 'editeMessage', Data)
  }
  AddReply(Data){
    return this.myHttpClient.post(this.backendURL + 'AddReply', Data)
  }
}
