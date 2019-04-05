export const AVATARS: Avatar[] = [
  { img: 'av-1.png', selected: true },
  { img: 'av-2.png', selected: false },
  { img: 'av-3.png', selected: false },
  { img: 'av-4.png', selected: false },
  { img: 'av-5.png', selected: false },
  { img: 'av-6.png', selected: false },
  { img: 'av-7.png', selected: false },
  { img: 'av-8.png', selected: false },
];

export interface Avatar {
  img: string;
  selected: boolean;
}
