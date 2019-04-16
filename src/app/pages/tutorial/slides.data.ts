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

 export interface Slide {
   title: string;
   description: string;
   image: string;
   url: string;
 }


