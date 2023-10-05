/* 
  节流：从第一次触发之后一段时间不再触发，也就是delay时间内只能执行一次
*/
function throttle(fn: AnyFn, delay: number) {
  // @ts-ignore
  let timer: null | NodeJS.Timeout = null;
  // 这个返回的函数被绑定出去，xxx.yy调用的时候能拿到this
  return function (...args: unknown[]) {
    // @ts-ignore
    const _this = this;
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(_this, args); // 这里用箭头函数，直接写this也可以
        timer = null;
      }, delay);
    }
  };
}

const fn = function (num: number) {
  // @ts-ignore
  console.log(new Date(), this, num);
};

// 绑定
const ob = {
  fn: throttle(fn, 1000),
};

// 触发
ob.fn(1);
ob.fn(2); // 2 和 3 不会执行
ob.fn(3);
setTimeout(() => {
  ob.fn(4);
}, 1000);
