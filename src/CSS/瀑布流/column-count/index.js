import { getImages } from '../utils/getImages.js';

const container = document.getElementById('container');
async function init() {
  const images = await getImages(30);
  images.forEach((img) => container.appendChild(img));
}
init();
