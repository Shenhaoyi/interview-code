// 我的博客：https://juejin.cn/post/6866068412637020167

type NestedArray<T = number> = Array<T | NestedArray<T>>;

// 1、ES 新增的 API: Array.prototype.flat(depth), depth是展开的深度，默认 1

// 2、递归
export function flat1(nestedArray: NestedArray) {
  const result: unknown[] = [];
  const help = (nestedArray: NestedArray) => {
    for (let i = 0; i < nestedArray.length; i++) {
      const current = nestedArray[i];
      if (Array.isArray(current)) {
        // 优于 instanceOf Array，好像是因为iframe
        help(current);
      } else {
        result.push(current);
      }
    }
  };
  help(nestedArray);
  return result;
}

//  3、利用 toString 的遍历转化成字符串的特点来实现，然后对生成的字符串进行分割。
// 缺点：仅能对纯字符或者纯数字数组进行扁平化。
export function flat2(nestedArray: NestedArray) {
  const str = nestedArray.toString(); // 1,2,3,4
  return str.split(',').map((i) => parseInt(i)); // 如果有小数就用 parseFloat()
}

// 4、利用JSON.stringify，比 toString 多了中括号处理
export function flat3(nestedArray: NestedArray) {
  const str = JSON.stringify(nestedArray); // '[1,[2,3,[4]]]'; 只需要将多余的中括号去除即可
  return str
    .replace(/(\[|\])/g, '') // 匹配并去除左右中括号
    .split(',')
    .map((i) => parseInt(i));
}
