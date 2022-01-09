/**
 * LazyMan 实现一个LazyMan函数
 * LazyMan(“Hank”) => Hi! This is Hank!
 * LazyMan(“Hank”).sleep(10).eat(“dinner”)
 *       Hi! This is Hank
 *       // sleep 10s
 *       eat dinner
 * LazyMan(“Hank”).eat(“dinner”).eat(“supper”)
 *       Hi! This is Hank
 *       eat dinner
 *       eat supper
 * LazyMan(“Hank”).sleepFirst(5).eat(“supper”)
 *      // sleep 5
 *      eat supper
*/


// 主要是异步问题怎么解决？

class LazyManClass {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.sayHi();
    }

    // 每调一次行为都先将其推入队列
    // 然后尝试执行
    // 借助js单线程 setTimout 机制  直到最后一次行为塞进去
    // 同步的行为直接作为一个同步函数
    // 异步的行为包装一个Promise
    next() {
        clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
            for (let i = 0; i < this.tasks.length; i++) {
                await this.tasks[i]();
            }
        }, 0);
        return this;
    }

    sayHi(){
        this.tasks.push(() => {
            console.log(`Hi! This is ${this.name}`);
        });
        return this.next();
    }

    eat(food) {
        this.tasks.push(() => {
            console.log(`eat ${food}`);
        });
        return this.next();
    }

    sleep(ms) {
        this.tasks.push(() => this.sleepPromise(ms))
        return this.next();
    }

    sleepFirst(ms) {
        this.tasks.unshift(() => this.sleepPromise(ms))
        return this.next();
    }

    sleepPromise(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`wake up after ${ms}`)
                resolve();
            }, ms)
        })
    }
}

function LazyMan(name) {
    return new LazyManClass(name);
}

LazyMan('Hank').eat('dinner').sleep(2000).eat('supper').sleepFirst(3000);
