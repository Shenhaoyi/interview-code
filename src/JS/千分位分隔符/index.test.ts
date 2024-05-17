import { addThousandsSeparator } from './index';
test('addThousandsSeparator', () => {
  const num = -12313215.2131231;
  expect(addThousandsSeparator(num)).toBe('-12,313,215.2131231');
});

test('addThousandsSeparator 2', () => {
  const num = 1234;
  expect(addThousandsSeparator(num)).toBe('1,234');
});

test('addThousandsSeparator 3', () => {
  const num = 123456;
  expect(addThousandsSeparator(num)).toBe('123,456');
});
