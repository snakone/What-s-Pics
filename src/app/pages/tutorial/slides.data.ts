export const INTRO_SLIDES: Slide[] = [
  {
    title: 'first.slide.title',
    description: 'first.slide.description',
    image: 'assets/img/slides/slide1.png',
    url: ''
  },
  {
    title: 'second.slide.title',
    description: 'second.slide.description',
    image: 'assets/img/slides/slide2.png',
    url: ''
  },
  {
    title: 'third.slide.title',
    description: 'third.slide.description',
    image: 'assets/img/slides/slide3.png',
    url: ''
  },
  {
    title: 'fourth.slide.title',
    description: 'fourth.slide.description',
    image: 'assets/img/slides/slide4.png',
    url: ''
  }
];

export const SLIDER_OPTIONS = {
  effect: 'flip',
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  zoom: false
 };

 export interface Slide {
   title: string;
   description: string;
   image: string;
   url: string;
 }


