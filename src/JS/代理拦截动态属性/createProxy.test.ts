import { createProxy } from './createProxy';
test('createProxy', () => {
  const add = createProxy();

  expect(add[1][2][3] + 4).toEqual(10);
  expect(add[10][20] + 70).toEqual(100);
});
