import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeustService } from "../../Services/geust.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Message } from '../../Interfaces/message';


@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {

  replyForm: FormGroup
  MessageDetails: Message
  constructor(private activatedroute: ActivatedRoute, private _GeustService: GeustService, private fb: FormBuilder) { }

  ngOnInit() {
    this.activatedroute.params.subscribe(data => {
      this._GeustService.getMessage(data.id).subscribe((resp: any) => {
        this.MessageDetails = resp.data
      })
    })

    this.replyForm = this.fb.group({
      reply: ['', [Validators.required]]
    })
  }


  addReply() {
    this._GeustService.AddReply({ 'reply': this.replyForm.value.reply, 'messageID': this.MessageDetails._id }).subscribe((resp: any) => {
      if (resp.message === 'success') {
        this.MessageDetails.replies.push(resp.data)
        this.replyForm.value.reply = ''
      }
      else{
        console.log("ERROR")
      }

    })

  }
}
