/*
  随机图片 api，参考：https://lin-blog.vercel.app/blog/other%20%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87%E7%94%9F%E6%88%90API
*/
export async function getImages(limit) {
  const url = `https://picsum.photos/v2/list?page=1&limit=${limit}`;
  const res = await fetch(url);
  const images = await res.json();
  return images.map((image) => {
    const { download_url: url, width, height } = image;
    const img = document.createElement('img');
    img.src = url;
    return img;
  });
}
