/* 
  防抖：最后一次触发之后一段时间后执行，类似移动时间窗口
  参考：[文心一言](https://yiyan.baidu.com/share/qzd4CtMFE7)
*/
export function debounce(fn: AnyFn, delay: number) {
  let timer: null | ReturnType<typeof setTimeout> = null;
  return function (...args: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, args);
      timer = null; // 记得置为null
    }, delay);
  };
}

const fn = function (num: number) {
  // @ts-ignore
  console.log(new Date(), this, num);
};

// 绑定
const ob = {
  fn: debounce(fn, 1000),
};

// 触发
ob.fn(1);
ob.fn(2); // 2 和 3 不会执行
ob.fn(3);
setTimeout(() => {
  ob.fn(4);
}, 500);
setTimeout(() => {
  ob.fn(5);
}, 1000);

// expect: 5
