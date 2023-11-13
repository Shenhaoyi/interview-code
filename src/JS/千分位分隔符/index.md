# 千分位分隔符
现成的 api 可以使用：
```js
const num = 123456
num.toLocaleString()
// '123,456'
```
缺点：有小数的时候不精确。
```js
const num = -12313215.2131231
num.toLocaleString()
// '-12,313,215.213'
```
