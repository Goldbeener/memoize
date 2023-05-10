# String

按照指定长度切分字符串

```js
str.split(/[\s\S]{1, n}/g)
```

替换字符串内的指定内容

```js
'今天干了什么呢，@写组件； 还干了什么@雨哦是好事；'.replaceAll(/@[\u4e00-\u9fa5\w]+/g, match => `<b>${match}</b>`)
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
