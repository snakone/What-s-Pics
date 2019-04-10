export const AVATARS: Avatar[] = [
  { img: 'av-1.png', selected: true, index: 1},
  { img: 'av-2.png', selected: false, index: 2},
  { img: 'av-3.png', selected: false, index: 3},
  { img: 'av-4.png', selected: false, index: 4},
  { img: 'av-5.png', selected: false, index: 5},
  { img: 'av-6.png', selected: false, index: 6},
  { img: 'av-7.png', selected: false, index: 7},
  { img: 'av-8.png', selected: false, index: 8},
];

export const SliderAvatarOpts = {
  effect: 'flip',
  zoom: false,
  noSwiping: false,
  breakpoints: {
    800: {
      slidesPerView: 3.8,
      spaceBetween: 10
    },
    1920: {
      slidesPerView: 5.8,
      spaceBetween: 10
    }
  }
};

export interface Avatar {
  img: string;
  selected: boolean;
  index: number;
}


