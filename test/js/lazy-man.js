class LazyManClass {
    constructor(name) {
        this.name = name;
        this.timer = null;
        this.tasks = [];
        this.sayHi();
    }

    next() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(async () => {
            for(let i = 0; i < this.tasks.length; i++) {
                await this.tasks[i]();
            }
        }, 0);
        return this;
    }

    sayHi() {
        this.tasks.push(() => {
            console.log(`hi this is ${this.name}`)
        })
        return this.next();
    }

    eat(food){
        this.tasks.push(() => {
            console.log(`eat ${food}`)
        })
        return this.next();
    }

    sleep(seconds) {
        this.tasks.push(() => this.sleepPromise(seconds))
        return this.next()
    }

    sleepFirst(seconds) {
        this.tasks.unshift(() => this.sleepPromise(seconds))
        return this.next()
    }

    sleepPromise(s) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, s * 1000);
        })
    }
}


function LazyMan(name) {
    return new LazyManClass(name);
}

LazyMan('Hank').eat('apple').sleep(2).eat('banana').sleepFirst(3)
