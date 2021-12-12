console.log('>>>> 依赖 b 模块的执行');
import { bar } from './c'
import { d } from './d'
(async() => {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('>>> 依赖 b 模块的执行 333');
        }, 2000);
    })
})()
export var foo = 'bar'
console.log('>>>> 依赖 b 模块的执行 222');

// setTimeout(() => foo = 'baz', 500)

// import { foo } from './a'
// export function bar() {
//     if (Math.random() > 0.5) {
//         foo();
//     }
// }
