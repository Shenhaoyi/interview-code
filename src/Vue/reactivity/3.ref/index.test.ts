import ref from '.';
import reactive, { effect } from '../2.activeEffect';

test('track, trigger and reactive', () => {
  const productProxy = reactive({
    unitPrice: 23,
    weight: 10,
  });
  const discountPercent = 0.9; // 打折力度
  let discountUnitPrice = ref(0); // 打折单价
  let discountPrice = 0; // 打折总价
  let discountPriceHistory: number[] = []; // 记录历史变化

  effect(() => {
    discountUnitPrice.value = productProxy.unitPrice * discountPercent;
  });
  effect(() => {
    discountPrice = discountUnitPrice.value * productProxy.weight;
    discountPriceHistory.push(discountPrice);
  });

  // 变更后通知
  productProxy.unitPrice = 59;
  productProxy.weight = 11;

  expect(discountPriceHistory).toEqual([23 * 10 * 0.9, 59 * 10 * 0.9, 59 * 11 * 0.9]);
});
