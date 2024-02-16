import { SingleDog } from './index';
test('single instance', () => {
  const a = SingleDog.getInstance('name1');
  const b = SingleDog.getInstance('name2');
  expect(b.name).toBe('name1');
  expect(a === b).toBe(true);
});
