# keyframe animation

帧动画

**常规写法**

```css
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

## **部分帧动画** partial keyframes

### 省略起始帧

```css
@keyframes fadeout {
  to {
    opacity: 0;
  }
}
```

省略了动画起始帧，这样动画会从元素当前的状态开始应用动画

常规写法的问题在于，默认所有元素透明度都是1； 
否则的话会在动画开始，先将元素透明度置为1才开始应用动画，
这样会导致元素闪烁


省略起始帧，动画从元素当前状态开始应用， 更加自然、丝滑


### 省略结束帧

```css
@keyframes fadeFromTransparent {
  from {
    opacity: 0
  }
}
```
这种设置，应用于元素具有静态的属性设置，比如常规透明度为0.8

这样，可以使元素透明度从0开始渐变到0.8常规效果

省略结束帧，动画会默认以元素的静态值作为结束帧效果。


### 帧动画叠加

默认情况下，两个帧动画修改同一个属性，**后来的帧动画会覆盖前面的帧动画**

但是，**使用部分帧动画，可以对同一个属性，叠加动画效果**

```css
@keyframes twinkle {
  from {
    opacity: 0.25;
  }
  to {
    opacity: 0.75;
  }
}

@keyframes fadeFromTransparent {
  from {
    opacity: 0;
  }
}


.ball {
  animation: 
    twinkle 400ms alternate infinite, 
    fadeFromTransparent 2000ms;
}
```

元素应用两个动画，正常的twinkle使元素在直接在透明度0.25-0.75之间闪烁；
元素是从0.25开始闪烁动画；
但是叠加动画之后，元素先从0开始，叠加twinkle的透明度，渐变到0.25-0.75之后稳定
有一个渐进的效果



### 帧动画内使用css变量

适用于多个元素使用相同的帧动画，但是动画偏移值不同

```css
@keyframes osillate {
  from {
    transform: translateX(calc(var(--amount) * -1));
  }
  to {
    transform: translateX(calc(var(--amount)));
  }
}
```



