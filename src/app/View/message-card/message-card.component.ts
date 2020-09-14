import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GeustService } from "../../Services/geust.service";
import { Message } from "../../Interfaces/message";
@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})
export class MessageCardComponent implements OnInit {

  @Input() data: Message[];
  @Input() Flage: boolean;
  @Input() detailes: boolean;


  editForm: FormGroup
  constructor(private fb: FormBuilder, private _GeustService: GeustService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      message: ['', [Validators.required]]
    })
  }

  saveChanges(messageID) {
    this._GeustService.editeMessage({ "message": this.editForm.value.message, "messageID": messageID }).subscribe((resp: any) => {
      if (resp.message === 'success') {
        for (var i in this.data) {
          if (this.data[i]._id == messageID) {
            this.data[i].message = this.editForm.value.message;
            break; //Stop this loop, we found it!
          }
        }
      }
    })
  }

  deleteMessage(id) {
    this._GeustService.deleteMessage(id).subscribe((resp: any) => {
      if (resp.message === 'success') {
        this.data = this.data.filter(item => item._id != id);
      }

      else {
        console.log("ERROR")
      }
    })

  }

}
