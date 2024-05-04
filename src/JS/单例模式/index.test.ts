import { SingleDog } from './index';
import { singleton } from './singleton';

test('single instance', () => {
  const a = SingleDog.getInstance('name1');
  const b = SingleDog.getInstance('name2');
  expect(b.name).toBe('name1');
  expect(a === b).toBe(true);
});

test('singleton', () => {
  class Test {
    constructor() {}
  }
  const SingletonTest = singleton(Test);
  const a = new SingletonTest();
  const Test2 = Object.getPrototypeOf(a).constructor;
  const b = new Test2();
  expect(a === b).toBe(true);
});
