import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-post-grid',
  templateUrl: './post-grid.component.html',
  styleUrls: ['./post-grid.component.scss'],
})

export class PostGridComponent implements OnInit {

  @Input() posts: Post[];

  constructor() { }

  ngOnInit() {}

}
