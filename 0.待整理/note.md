1. SPA页面缓存
按需缓存，某些场景下缓存，某些场景下不缓存

2. 页面重新进入自身
需要给组件加上key， 让组件不使用缓存，强制更新


```html
<RouterView v-slot="{ Component }">
  <Suspense>
    <keep-alive :include="cachedRoute">
      <!-- 加上key 允许重新进入本页面根据参数重新加载 -->
      <component :is="Component" :key="viewKey" />
    </keep-alive>
    <template #fallback>
      <div class="center">
        <van-loading />
      </div>
    </template>
  </Suspense>
</RouterView>


<script>
const route = useRoute();

const viewKey = computed(() => {
  if (route.name === '/specialRouteName') {
    // full Path 包括query参数
    return route.fullPath;
  }
  return route.name;
});

</script>

```

keep-alive 缓存组件，通过动态设置includes
在合适的时机缓存组件、清除缓存


特殊场景下，一个页面点击某个按钮，需要重新进入一次，
并且根据url重新加载页面、并且要求两次进入都有历史记录

使用router.push() 在此进入
但是默认情况下，vue会缓存组件，这样第二次push进入行为仅会更新url，但是页面内容不变
需要给组件加一个key强制刷新，就可以使用


3. vue-router 

hash模式，是在原生url的锚点hash这一段上做文章

```js
const url = `https://example.com/path/index.html?foo=123&bar=true#/route/?id=xxx`
```

浏览器api
 `location.search`  也就是queryString 对应的是 `?foo=123` 这一段
 `location.hash` 也就是锚点，对应的是  `#/route/?id=xxx` 这一段

 vue-router 操作的是 hash 这一部分内容
 也就是 vue-router 传的参数都是作为锚点的一部分，被vue-router解析使用
 这一部分本身并不会被浏览器处理

 
