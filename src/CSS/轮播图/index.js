import { Carousel } from './carousel.js';

const imgList = [
  {
    src: '../轮播图/assets/火影.jpg',
  },
  {
    src: '../轮播图/assets/诸葛亮.jpg',
  },
  {
    src: '../轮播图/assets/进击.jpg',
  },
];

const myCarousel = new Carousel('my-carousel', imgList);
myCarousel.init();
