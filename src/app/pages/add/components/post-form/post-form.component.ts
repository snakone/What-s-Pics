import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Post, PostResponse } from '@app/shared/interfaces/interfaces';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { PostService, CameraService } from '@app/core/services/services.index';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SliderAvatarOpts } from '@app/shared/components/pick-avatar/avatar.data';
import { IonSlides } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { CameraResponse } from '@app/core/services/camera/camera.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})

export class PostFormComponent implements OnInit, OnChanges {

  @Input() submit: boolean;
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();

  temp: CameraResponse[] = [];
  post: Post = <Post>{};
  postForm: FormGroup;
  spinner = false;
  portrait = 'assets/img/sample.jpg';
  landscape = 'assets/img/sample2.jpg';

  slidesOpts  = {
    effect: 'flip',
    zoom: false,
    noSwiping: false,
    breakpoints: {
      800: {
        slidesPerView: 2.4,
        spaceBetween: 10
      },
      1920: {
        slidesPerView: 3.4,
        spaceBetween: 10
      }
    }
  };

  constructor(private craft: CrafterService,
              private postService: PostService,
              private router: Router,
              private geolocation: Geolocation,
              private camera: CameraService) { }

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

  ngOnChanges(): void {
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

  private handleEvent(post: Post): void {
    this.postService.streamPost(post);
    this.craft.toast('post.success');
    this.postForm.reset();
    this.router.navigateByUrl('tabs/home');
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

  openCamera() {
    if (this.temp.length >= 5) {
      this.craft.toast('max.pictures');
      return;
    }
    // this.temp.push(this.portrait);
    this.camera.openCamera()
      .then((res: CameraResponse) => {
        console.log(res);
        this.temp.push(res);
      }).catch(err => {
        this.craft.toast('camera.error');
        console.log(err);
      });
  }

}
