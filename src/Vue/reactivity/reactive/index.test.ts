import { track, trigger } from '.';

test('track and trigger', () => {
  const product = {
    unitPrice: 23,
    weight: 10,
  };

  let price;
  const priceHistory: (number | undefined)[] = [undefined]; // 记录历史变化

  // 作用，这里可以翻译为副作用
  const effect = () => {
    price = product.unitPrice * product.weight;
    priceHistory.push(price);
  };

  effect(); // 初次计算

  track(product, 'unitPrice', effect); // 追踪依赖

  product.unitPrice = 59;
  trigger(product, 'unitPrice');

  product.unitPrice = 1;
  trigger(product, 'unitPrice');

  expect(priceHistory).toEqual([undefined, 23 * 10, 59 * 10, 1 * 10]);
});
