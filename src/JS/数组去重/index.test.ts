import { isPrimitive, isSame, unique } from './index';

test('isPrimitive', () => {
  expect(isPrimitive(null)).toBe(true);
  expect(isPrimitive({})).toBe(false);
  expect(isPrimitive(42)).toBe(true);
  expect(isPrimitive('hello')).toBe(true);
  expect(isPrimitive(function () {})).toBe(false);
});

test('isSame', () => {
  expect(isSame(null, null)).toBe(true);
  expect(isSame(NaN, NaN)).toBe(true);
  expect(isSame(+0, -0)).toBe(true);
  expect(isSame({ key: 'value' }, { key: 'value' })).toBe(true);
  expect(isSame({ key: 'value' }, { key: 'otherValue' })).toBe(false);
  expect(isSame({ key: { nestedKey: 'value' } }, { key: { nestedKey: 'value' } })).toBe(true);
  expect(isSame({ key: { nestedKey: 'value' } }, { key: { nestedKey: 'otherValue' } })).toBe(false);
});

test('unique', () => {
  expect(unique([1, 2, 3, 4, 4, 3, 2, 1])).toEqual([1, 2, 3, 4]);
  expect(unique(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c']);
  expect(unique([{ id: 1 }, { id: 2 }, { id: 1 }])).toEqual([{ id: 1 }, { id: 2 }]);
  expect(
    unique([
      { id: 1, name: 'Jane', address: { city: 'New York', zip: '10001' } },
      { id: 1, name: 'John', address: { city: 'New York', zip: '10001' } },
      { id: 1, name: 'John', address: { city: 'New York', zip: '10001' } },
    ]),
  ).toEqual([
    { id: 1, name: 'Jane', address: { city: 'New York', zip: '10001' } },
    { id: 1, name: 'John', address: { city: 'New York', zip: '10001' } },
  ]);
});
