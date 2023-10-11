import computed from '.';
import reactive from '../2.activeEffect';

test('computed', () => {
  const productProxy = reactive({
    unitPrice: 23,
    weight: 10,
  });
  const discountPercent = 0.9; // 打折力度
  let discountPriceHistory: number[] = []; // 记录历史变化

  // 打折单价
  const discountUnitPrice = computed(() => {
    return productProxy.unitPrice * discountPercent;
  });
  // 打折总价
  const discountPrice = computed(() => {
    const result = discountUnitPrice.value * productProxy.weight;
    discountPriceHistory.push(result);
    return result;
  });

  // 变更后通知
  productProxy.unitPrice = 59;
  productProxy.weight = 11;

  expect([discountUnitPrice.value, discountPrice.value]).toEqual([59 * 0.9, 59 * 11 * 0.9]);
  expect(discountPriceHistory).toEqual([23 * 10 * 0.9, 59 * 10 * 0.9, 59 * 11 * 0.9]);
});
