import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GeustService } from "../../Services/geust.service";
import { Message } from "../../Interfaces/message";
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private fb: FormBuilder, private _GeustService: GeustService) { }
  messageForm: FormGroup

   Messages: Message[]

  ngOnInit() {
    this.messageForm = this.fb.group({
      message: ['', [Validators.required]]
    })

    this._GeustService.getMyMessages().subscribe((resp: any) => {
      debugger
      if (resp.message === 'success') {
        this.Messages = resp.messages
      }
      else {
        console.log("ERROR")
      }
    })
  }

  addMessage() {
    this._GeustService.addMessage(this.messageForm.value).subscribe((resp: any) => {
      if (resp.message === 'success') {
        console.log("Added Successfully")
        this.messageForm.setValue({'message' : ""})
      }
      else {
      }
    })
  }

}
