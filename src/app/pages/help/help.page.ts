import { Component, OnInit } from '@angular/core';
import { StorageService } from '@app/core/services/services.index';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})

export class HelpPage implements OnInit {

  constructor(private storage: StorageService) { }

  ngOnInit() {
  }

  remove() {
    this.storage.clear();
  }

}
