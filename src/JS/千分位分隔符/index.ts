function addThousandsSeparator2Integer(integer: string) {
  // 1、整数部分 reverse 再放，因为要判断 %3 ，如果是正序的话，不知道要除以几！
  // const intArray = integer.split('');
  // intArray.reverse();
  // const intRes = [];
  // for (let i = 0; i < intArray.length; i++) {
  //   if (i % 3 === 0 && i !== 0) { // 每 3 位放分隔符
  //     //注意排除0的情况
  //     intRes.push(',');
  //   }
  //   intRes.push(intArray[i]);
  // }
  // intRes.reverse();
  // return intRes.join('');
  /*
    2、正则实现：从末尾开始，每 3 个数字为一组进行匹配（把$包含在括号内，记不住）
      这里的 g 的作用就是让+多次取值，这样，只要是 3 的倍数位都能被匹配到
  */
  const result = integer.replace(/(?=(\d{3})+$)/g, ','); // 参考https://v.douyin.com/iRAdpkeF/
  return result[0] === ',' ? result.slice(1) : result; // 去除可能出现的第一个逗号
}

export function addThousandsSeparator(num: number) {
  let result = '';
  // 负号处理
  if (num < 0) {
    result += '-';
    num = -num;
  }
  const [integerPart, decimalPart] = num.toString().split('.');
  result += addThousandsSeparator2Integer(integerPart);
  if (decimalPart) {
    result += '.' + decimalPart;
  }
  return result;
}
