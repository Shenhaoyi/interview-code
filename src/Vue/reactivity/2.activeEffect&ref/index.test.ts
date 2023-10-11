import reactive, { effect } from '.';

test('track, trigger and reactive', () => {
  let price;
  const priceHistory: (number | undefined)[] = [undefined]; // 记录历史变化

  const reactiveProduct = reactive({
    unitPrice: 23,
    weight: 10,
  });

  effect(() => {
    price = reactiveProduct.unitPrice * reactiveProduct.weight;
    priceHistory.push(price);
  });

  // 变更后通知
  reactiveProduct.unitPrice = 59;
  reactiveProduct.unitPrice = 1;

  expect(priceHistory).toEqual([undefined, 23 * 10, 59 * 10, 1 * 10]);
});
