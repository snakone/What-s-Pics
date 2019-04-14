import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})

export class AddPage implements OnInit {

  submit = false;
  loadCoords: boolean;

  constructor() { }

  ngOnInit() {
  }

  createPost() {
    this.submit = !this.submit;
  }

}
