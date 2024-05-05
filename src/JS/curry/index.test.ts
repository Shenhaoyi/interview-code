import { curry } from './index';
test('curry', () => {
  function add(a: number, b: number, c: number, d: number) {
    return a + b + c + d;
  }
  console.log(curry(add)(1, 2)(3, 4));

  expect(curry(add)(1, 2, 3, 4)).toBe(10);
  expect(curry(add)(1, 2)(3, 4)).toBe(10);
  expect(curry(add)(1)(2)(3, 4)).toBe(10);
  // 测试参数多余的情况
  expect(curry(add)(1, 2)(3, 4, 5)).toBe(10);
});
