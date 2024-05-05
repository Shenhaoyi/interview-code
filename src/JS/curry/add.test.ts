import { add } from './add';

test('add', () => {
  // @ts-ignore
  expect(add(1)(2)(3)(4, 5, 6) == 21).toEqual(true); // 双等于会进行隐式转换
  expect(add(1)(2)(3)(4, 5, 6).toString()).toEqual(21);
});
