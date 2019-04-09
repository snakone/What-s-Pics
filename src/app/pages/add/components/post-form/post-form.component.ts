import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Post, PostResponse } from '@app/shared/interfaces/interfaces';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { PostService } from '@app/core/services/services.index';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})

export class PostFormComponent implements OnInit, OnChanges {

  @Input() submit: boolean;
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();

  temp: any[] = [];
  post: Post = <Post>{};
  postForm: FormGroup;
  spinner = false;

  constructor(private craft: CrafterService,
              private postService: PostService,
              private router: Router,
              private geolocation: Geolocation) { }

  ngOnInit() {
    this.createSignUpForm();
  }

  createSignUpForm(): void {
    this.postForm = new FormGroup({
      message: new FormControl(null,
                              [Validators.required,
                               Validators.minLength(5),
                               Validators.maxLength(500)]),
      coords: new FormControl(false, [Validators.nullValidator])});
  }

  toogleCoords(event: CustomEvent) {
    if (!event.detail.checked) { return; }
    this.spinner = true;
    this.loading.emit(true);
    this.getCoords();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.postForm) {
      if (this.postForm.invalid) {
        this.craft.toast('post.invalid');
      } else {
        this.post.message = this.postForm.value.message;
        this.postService.createPost(this.post)
          .subscribe((res: PostResponse) => {
            if (res.ok) { this.handleEvent(res.post); }
          }, (err => {
              this.craft.toast('post.error');
              console.log(err);
          }));
      }
    }
  }

  private getCoords() {
    this.geolocation.getCurrentPosition().then((resp) => {
      setTimeout(() => {
        this.spinner = false;
        this.loading.emit(false);
      }, 4000);
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;
     }).catch((error) => {
       console.log('Error getting location', error);
       this.spinner = false;
     });
  }

  private handleEvent(post: Post): void {
    this.postService.streamPost(post);
    this.craft.toast('post.success');
    this.postForm.reset();
    this.router.navigateByUrl('tabs/home');
  }

}
