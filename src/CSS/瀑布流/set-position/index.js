import { getImages } from '../utils/getImages.js';
import { debounce } from '../../../../dist/JS/debounce/index.js';

const container = document.getElementById('container');
container.style.position = 'relative';
const width = '300px'; // 图片定宽

// 根据 container 的宽度计算出每列的宽度和列之间的间隔
let columnSize = 0;
let gap = 0;
let page = 1;
function cal() {
  const containerWidth = parseInt(getComputedStyle(container).width);
  const columnWidth = parseInt(width);
  columnSize = Math.floor(containerWidth / columnWidth);
  gap = (containerWidth - columnSize * columnWidth) / (columnSize - 1);
  // 设置父元素的负 margin
  container.style.marginBottom = `-${gap}px`;
}

async function loadImages(size = 30) {
  const images = await getImages(size, page++);
  images.forEach((img) => {
    img.onload = setPosition; // 每加载一张都重新做布局
    img.style.width = width;
    img.style.marginBottom = `${gap}px`;
    img.style.marginRight = `${gap}px`;
    container.appendChild(img);
  });
}

// 监听窗口大小变化
window.addEventListener(
  'resize',
  // 必须加防抖，否则太抖动了！
  debounce(() => {
    cal();
    setPosition();
  }, 500),
);
/*
  所有图片的绝对定位位置计算
  计算策略
    1. 找出所有列中最小的列
    2. 将图片放在该列中
    3. 更新该列的高度
    4. 重复1-3直到所有图片被放置
*/
function setPosition(...a) {
  const columnInfos = new Array(columnSize).fill(0);
  const children = Array.from(container.children);
  children.forEach((child) => {
    const minHeight = Math.min(...columnInfos);
    const minIndex = columnInfos.indexOf(minHeight);
    child.style.position = 'absolute';
    child.style.left = `${minIndex * parseInt(width) + minIndex * gap}px`;
    child.style.top = `${minHeight}px`;
    columnInfos[minIndex] += child.height + gap;
    container.style.height = `${Math.max(...columnInfos)}px`;
  });
}

function init() {
  cal();
  loadImages();
}
init();

// 检测是否滚动到底部，如果是则继续加载图片
window.addEventListener(
  'scroll',
  debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      loadImages(10, page++);
    }
  }, 200),
);
