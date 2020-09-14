import { Message } from '../../Interfaces/message';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GeustService } from "../../Services/geust.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder, private MyGeustService: GeustService) { }

  editForm: FormGroup
  Messages: Message[]
  ngOnInit() {
    this.editForm = this.fb.group({
      message: ['', [Validators.required]]
    })
    this.MyGeustService.gelAllMessages().subscribe((resp: any) => {
      if (resp.message === 'success') {
        debugger
        this.Messages = resp.data
      }
      else {
        console.log("ERROR")
      }
    })
  }
  saveChanges() {
    console.log("Saved")
  }


}
