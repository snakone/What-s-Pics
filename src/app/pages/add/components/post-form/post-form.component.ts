import { Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { Post, PostResponse } from '@app/shared/interfaces/interfaces';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { CrafterService } from '@app/shared/crafter/crafter.service';
import { PostService, CameraService } from '@app/core/services/services.index';
import { Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { FileResponse } from '@app/shared/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})

export class PostFormComponent implements OnInit, OnChanges {

  @Input() submit: boolean;

  temp: FileResponse[] = [];
  post: Post = {};
  postForm: FormGroup;
  spinner: boolean;

  constructor(private craft: CrafterService,
              private postService: PostService,
              private router: Router,
              private geolocation: Geolocation,
              private camera: CameraService,
              private http: HttpClient) {
                this.post.images = [];
            }

  ngOnInit() {
    this.createSignUpForm();
  }

  createSignUpForm(): void {
    this.postForm = new FormGroup({
       message: new FormControl(null,
                                  [Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(500)]),
    coords: new FormControl(false, [Validators.nullValidator])});
  }

  ngOnChanges(): void {
    if (this.postForm) {
      if (this.postForm.invalid || this.spinner) {
        this.craft.toast('post.invalid');
      } else {
        this.post.message = this.postForm.value.message;
        setTimeout(() => {
          this.postService.createPost(this.post)
          .subscribe((res: PostResponse) => {
            if (res.ok) { this.handleEvent(res.post); }
          }, (err => {
              this.craft.toast('post.error');
              console.log(err);
          }));
        }, 1000);
      }
    }
  }

  private handleEvent(post: Post): void {
    this.postService.streamPost(post);
    this.craft.toast('post.success');
    this.postForm.reset();
    this.router.navigateByUrl('tabs/home');
    this.temp = [];
    this.post.images = [];
  }

  public toogleCoords(event: CustomEvent) {
    if (!event.detail.checked) {
      this.post.coords = '';
      return;
    }
    this.spinner = true;
    this.getCoords();
  }

  private getCoords() {
    this.geolocation.getCurrentPosition()
     .then((res: Geoposition) => {
        setTimeout(() => {
          this.spinner = false;
        }, 5000);
        const coords = `${res.coords.latitude},${res.coords.longitude}`;
        this.post.coords = coords;
     }).catch((error) => {
       console.log('Error getting location', error);
       this.spinner = false;
     });
  }

  public openCamera() {
    if (this.temp.length >= 5) {
      this.craft.toast('max.pictures');
      return;
    }
    this.camera.openCamera()
      .then((res: FileResponse) => {
        if (res.size / 1024 >= 3) {
          this.craft.toast('max.file.error');
          return;
        }
        this.getS3Image(res.image)
          .subscribe(image => {
            this.post.images.unshift(res.image);
            res.image = image;
            this.temp.unshift(res);
          });
      }).catch(err => {
        this.craft.toast('camera.error');
        console.log(err);
      });
  }

  public openSource() {
    if (this.temp.length >= 5) {
      this.craft.toast('max.pictures');
      return;
    }
    this.camera.openSource()
      .then((res: FileResponse) => {
        if (res.size / 1024 >= 3) {
          this.craft.toast('max.file.error');
          return;
        }
        this.getS3Image(res.image)
        .subscribe(image => {
          this.post.images.unshift(res.image);
          res.image = image;
          this.temp.unshift(res);
        });
      }).catch(err => {
        this.craft.toast('picker.error');
        console.log(err);
      });
  }

  getS3Image(image: string) {
    return this.http.get(image, { responseType: 'text' });
  }

}
