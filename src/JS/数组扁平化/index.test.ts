import { flat1, flat2, flat3 } from './index';
test('flat1', () => {
  const list = [1, [2, 3, [4]]];
  expect(flat1(list)).toEqual(list.flat(3));
});

test('flat2', () => {
  const list = [1, [2, 3, [4]]];
  expect(flat2(list)).toEqual(list.flat(3));
});

test('flat3', () => {
  const list = [1, [2, 3, [4]]];
  expect(flat3(list)).toEqual(list.flat(3));
});
