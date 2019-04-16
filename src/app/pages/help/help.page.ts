import { Component, OnInit } from '@angular/core';
import { StorageService } from '@app/core/storage/storage.service';
import { UserService } from '@app/core/services/services.index';
import { PostService } from '@core/services/post/post.service';
import { NavController } from '@ionic/angular';
import { FAQ } from '@app/shared/interfaces/interfaces';
import { QUESTIONS } from './faq.data';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})

export class HelpPage implements OnInit {

  questions: FAQ[] = QUESTIONS;
  arrow = 'ios-arrow-forward';

  constructor(private storage: StorageService,
              private nav: NavController) { }

  ngOnInit() {
    this.questions[0].arrow = 'ios-arrow-down';
  }

  expand(question: FAQ): void {
    this.questions.map(q => {
      q.collapsed = true;
      q.arrow = 'ios-arrow-forward';
    });
    question.collapsed = !question.collapsed;
    if (!question.collapsed) {
      question.arrow = 'ios-arrow-down';
    }
  }

}
