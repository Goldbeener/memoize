const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

function sleep(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, seconds);
    })
}

app.use(async ctx => {
    console.log('>>>>', ctx.request.url);
    if (ctx.request.url === '/') {
        const path = '../test.html';
        const src = fs.createReadStream(path);
        ctx.response.set("content-type", 'text/html; charset=utf-8');
        ctx.body = src;
    } else if (ctx.request.url.startsWith('/api')) {
        await sleep(2000 * Math.random());
        ctx.body = {
            message: 'ss',
        }
    }
});

app.listen(3000);
console.log('app listening on port 3000');
