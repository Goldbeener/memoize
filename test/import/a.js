import { foo } from './b'

/**
 * import 语句会得到一个引用
 * 在每次使用时候再去获取值
 * 每次使用都会重新去对应模块获取值，没有模块值的缓存
 * */ 

console.log('a 模块自己的执行');
// console.log('>>> a执行', foo); // bar


setTimeout(() => {
    console.log('>>>a模块的异步行为', foo) // baz
}, 500);

// export function foo() {
//     bar();
//     console.log('>>> 执行完毕')
// }

// foo();

