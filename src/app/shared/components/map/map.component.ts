import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit {

  @Input() coords: string;
  lat: number;
  lng: number;

  @ViewChild(AgmMap) public agmMap: AgmMap;

  constructor() { }

  ngOnInit() {
    this.loadMapBox(this.coords);
  }

  private loadMapBox(c: string) {
    if (!this.agmMap) { return; }
    this.agmMap.triggerResize();
    this.lat = Number(c.split(',')[0]);
    this.lng = Number(c.split(',')[1]);
  }

}
