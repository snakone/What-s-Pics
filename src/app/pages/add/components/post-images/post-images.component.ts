import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileResponse } from '@app/shared/interfaces/interfaces';


@Component({
  selector: 'app-post-images',
  templateUrl: './post-images.component.html',
  styleUrls: ['./post-images.component.scss'],
})

export class PostImagesComponent implements OnInit {

  @Input() temp: FileResponse[] = [];
  @Output() delete: EventEmitter<FileResponse[]> = new EventEmitter<FileResponse[]>();
  constructor() { }

  ngOnInit() {}

  remove(i: number) {
    this.temp.splice(i, 1);
    this.delete.emit(this.temp);
  }

}
