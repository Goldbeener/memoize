# String

按照指定长度切分字符串

```js
str.split(/[\s\S]{1, n}/g)
```

## URL

URL 校验

### URL 构造函数

```js
function checkUrl(url) {
  let givenURL;
  try {
    givenURL = new URL()
  } catch (e) {
    console.log('invalid url', e);
    return false
  }
  return true
}

```

### 正则表达式

```js
function isValidURL(string) {
  var res = string.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
  return (res !== null);
};

```
