import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileResponse } from '@app/shared/interfaces/interfaces';
import { CameraService } from '@app/core/services/camera/camera.service';

@Component({
  selector: 'app-post-images',
  templateUrl: './post-images.component.html',
  styleUrls: ['./post-images.component.scss'],
})

export class PostImagesComponent implements OnInit {

  @Input() temp: FileResponse[] = [];
  @Output() delete = new EventEmitter<FileResponse[]>();

  constructor(public camera: CameraService) { }

  ngOnInit() {}

  remove(i: number): void {
    this.temp.splice(i, 1);
    this.delete.emit(this.temp);
  }

}
