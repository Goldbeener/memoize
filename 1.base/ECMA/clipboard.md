# JS实现复制到剪贴板

## execCommand

```js
// 复制选中的文案到剪切板
document.execCommand("copy", true); // 复制
document.execCommand("cut", true); // 剪切
document.execCommand("paste", true); // 粘贴
```

限制：

1. 选中的文案？ --- input/textarea  select
2. 性能问题？ --- execCommand 同步执行，返回执行结果，复制大数据会有性能问题
3. 无法修改复制内容

优点

1. 兼容性好

### 实现

```js
const textarea = document.createElement("textarea");
document.body.appendChild(textarea);
textarea.style.position = 'absolute'
textarea.style.clip = 'rect(0,0,0,0)'  // 隐藏
textarea.style.top = '10px' // 保证textarea在可视区，否则select方法会触发浏览器默认的跳转行为（滚动以将目标元素显示在可视区）
textarea.value = '要复制的文案'
textarea.select()
const res = document.execCommand('copy', true) // 同步执行
document.body.removeChild(textarea)
return res
```

## Clipboard API

`navigator.permissions` 权限判断
`navigator.clipboard` 剪切板api

```js
async function copyText(text) {
  const permissionState = await navigator.permissions.query({ name: 'clipboard-write'})

  if (permissionState.state === 'granted' || permissionState.state === 'prompt') {
    // 支持
    try {
      await navigator.clipboard.writeText(text)
      // await navigator.clipboard.readText();  // 读取剪切板内容
      Toast('复制成功')
    } catch(e) {
      console.log('复制失败', e)
    }
  }
}
```

除了支持剪切文字之外，还支持剪切其他类型的数据

+ `navigator.clipboard.write()` 写权限自动授予脚本
+ `naviagtor.clipboard.read()` 读取剪切板时，会有一个对话框，询问用户是否同意读取剪切板

复制图片到剪切板

### 使用fetch

```js
async function copyMedia() {
  const imgUrl =
    "https://pluspng.com/img-png/car-png-car-front-png-image-32725-1700.png";
  const data = await fetch(imgUrl);
  const blob = await data.blob();

  await navigator.clipboard.write([
    new ClipboardItem({
      'image/png': blob,
    }),
  ]);
  console.log("已经将图片复制到剪切板");
}
```

使用fetch获取图片资源，会存在跨域问题

默认情况下，会使用{ mode: 'cors' } 模式，这时候浏览器会拦截请求提示错误
如果设置 { mode: 'no-cors' }, 浏览器不会有跨域拦截，但是获取到的`不透明的数据`opaque resource，js不能处理，blob size是 0

### 使用canvas

```js
function copyImage(imgUrl) {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')

  function saveImage(path, cb) {
    img.onload = function() {
      console.log('图片加载完成')
      c.width = this.naturalWidth
      c.height = this.naturalHeight
      ctx.drawImage(this, 0, 0)
      c.toBlob(blob => {
        cb && cb(blob);
      }, 'image/png')
    }
    img.src = path
  }

  saveImage(imgUrl, (blob) => {
    navigator.clipboard.write([
      new ClipboardItem({'image/png': blob})
    ])
    .then(() => {
      console.log('copy image success')
    })
  })

}
```

## Clipboard 对象

+ `Clipboard.readText()` 读取剪切板里面的文本，**需要用户授权**
+ `Clipboard.read()` 读取剪切板内的数据，可以是文本，也可以是二进制数据(图片、文件), **需要用户授权**
+ `Clipboard.writeText()` 向剪切板内写入文本数据，**不需要用户授权**
  + `ClipboardItem`
+ `Clipboard.write()` 向剪切板内写入任意数据，**不需要用户授权**

## copy&cut&paste 事件

当用户向剪切板放入数据时，触发`copy`事件
或者选中元素，ctrl+c时触发

```js
const source = document.querySelector('.source');
source.addEventListener(
  'copy',
  (event) => {
    const selection = document.getSelection();
    event.clipboardData.setData(
      'text/plain',
      selection.toString().toUpperCase()
    );
    event.preventDefault();
  },
  false
);
```

当用户使用剪切板数据，进行粘贴操作时，触发`paste`事件

```js
document.addEventListener('paste', async (e) => {
  e.preventDefault();
  const text = await navigator.clipboard.readText();
  console.log('Pasted text: ', text);
});
```
