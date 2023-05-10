# JS生成随机颜色

## 颜色表达
1. 颜色字符串 red、yellow
2. 十六进制 #000000 ～ #ffffff
3. rgba颜色 rgba(0~255, 0~ 255, 0~ 255, 0~1)
4. hsla颜色 hsla(0-360色调、0%～100%饱和度、0%～100%亮度， 0～1透明度)


## js随机颜色值

rgba

```js
function color() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = +Math.random().toFixed(1);
  return rgba(r, g, b, a);
}

var getRandomColor = function(){
  return '#'+('00000'+ (Math.random()*0x1000000<<0).toString(16)).substr(-6); 
}

function randomColor(){
  const colorAngle = Math.floor(Math.random()*360);
  return 'hsla('+ this.colorAngle +',100%, 50%, 1)';
}
```