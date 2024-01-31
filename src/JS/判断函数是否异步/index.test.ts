import { isAsyncFunction } from './index';
test('is async function', () => {
  expect(isAsyncFunction(() => {})).toEqual(false);
  expect(isAsyncFunction(async () => {})).toEqual(true);
});
