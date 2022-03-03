console.log('>>>>>1')

setTimeout(() => {
    console.log('>>>>> 2')
}, 0)

setTimeout(() => {
    console.log('>>>>> 3.2')
}, 0)

// 这个是在下次loop的宏任务之后执行的  下次  宏任务之后
setImmediate(() => {
    console.log('>>>>> 3')
})

setTimeout(() => {
    console.log('>>>>> 2')
}, 0)