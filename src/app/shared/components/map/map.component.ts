import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';
import { ModalController } from '@ionic/angular';
import { timer } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit {

  show = false;
  @Input() lat: number;
  @Input() lng: number;
  @ViewChild(AgmMap) public agmMap: AgmMap;

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    timer(1000).subscribe(() => {
      this.show = true;
    });
  }

  closeModal(): void {
    this.modal.dismiss();
  }

}
