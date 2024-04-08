const ClassMap = {
  CAROUSEL_INNER: 'carousel-inner', // 图片容器
  INTERACT: 'interact', // 底部交互区
  INDICATOR: 'indicator', // 底部交互区的按钮
  GO_LEFT: 'go-left',
  GO_RIGHT: 'go-right',
};
export class Carousel {
  container;
  imgList;
  currentIndex = 0;
  interval = 0;
  constructor(
    id, // 容器id
    imgList, // 图片列表
    options,
  ) {
    const { interval = 5000 } = options || {};
    this.interval = interval;
    this.container = document.getElementById(id);
    this.imgList = imgList;
  }
  init() {
    // 传入的父元素样式处理
    this.container.style.overflow = 'hidden';
    this.container.style.position = 'relative';

    const inner = document.createElement('div');
    inner.classList.add(ClassMap.CAROUSEL_INNER);
    this.container.appendChild(inner);

    // 底部交互
    const interact = document.createElement('div');
    interact.classList.add(ClassMap.INTERACT);
    this.container.appendChild(interact);
    // 插入图片和底部交互按钮
    this.imgList.forEach(({ src }, i) => {
      const img = document.createElement('img');
      img.src = src;
      inner.appendChild(img);

      const indicator = document.createElement('div');
      indicator.classList.add(ClassMap.INDICATOR);
      indicator.onclick = () => this.setIndex.call(this, i); // 绑定事件
      interact.appendChild(indicator);
    });
    // 前进
    const goLeft = document.createElement('div');
    goLeft.classList.add(ClassMap.GO_LEFT);
    goLeft.innerHTML = '<';
    goLeft.onclick = this.handleGoLeft.bind(this); // 绑定事件
    this.container.appendChild(goLeft);
    // 后退
    const goRight = document.createElement('div');
    goRight.classList.add(ClassMap.GO_RIGHT);
    goRight.innerHTML = '>';
    goRight.onclick = this.handleGoRight.bind(this); // 绑定事件
    this.container.appendChild(goRight);

    // 开始轮播
    setInterval(this.handleGoRight.bind(this), this.interval);
  }
  refresh() {
    const width = this.container.clientWidth;
    const left = -1 * width * this.currentIndex;
    const inner = this.container.querySelector(`.${ClassMap.CAROUSEL_INNER}`);
    inner.style.left = left + 'px';
  }

  handleGoLeft() {
    this.currentIndex -= 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.imgList.length - 1;
    }
    this.refresh();
  }

  handleGoRight() {
    this.currentIndex += 1;
    if (this.currentIndex >= this.imgList.length) {
      this.currentIndex = 0;
    }
    this.refresh();
  }

  setIndex(index) {
    this.currentIndex = index;
    this.refresh();
  }
}
