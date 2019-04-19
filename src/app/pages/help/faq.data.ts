import { FAQ } from '@app/shared/interfaces/interfaces';

export const QUESTIONS: FAQ[] = [
  {
    question: 'help.what',
    answer: `help.what.text`,
    collapsed: false,
    arrow: 'ios-arrow-forward'
  },
  {
    question: 'help.can',
    answer: `help.can.text`,
    collapsed: true,
    arrow: 'ios-arrow-forward'
  },
  {
    question: 'help.who',
    answer: `help.who.text`,
    collapsed: true,
    arrow: 'ios-arrow-forward'
  },
  {
    question: 'help.create',
    answer: `help.create.text`,
    collapsed: true,
    arrow: 'ios-arrow-forward'
  },
  {
    question: 'help.right',
    answer: `help.right.text`,
    collapsed: true,
    arrow: 'ios-arrow-forward'
  }
];
