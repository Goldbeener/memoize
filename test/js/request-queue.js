function multiRequest(urls, limit) {
    const total = urls.length;
    let sendCount = 0;
    let finished = 0;
    const result = [];

    return new Promise((resolve, reject) => {

        // 先一次性发出最多的请求
        while (sendCount < limit && finished < total) {
            next();
        }

        function next() {
            const current = sendCount++;
            const url = urls[current];

            fetch(url)
                .then(res => res.json())
                .then(res => {
                    handleResult(res,  current);
                })
                .catch(err => {
                    handleResult(res, current);
                })
        }

        // 每一个请求得到结果之后 判断是否需要发起下一次请求
        function handleResult(res, current) {
            finished++;
            result[current] = res;
            // 完成之后 判断是否还有未发送请求
            if (sendCount < total) {
                next();
            }
            // 全部完成 resolve
            if (finished >= total) {
                resolve(result);
            }
        }

    })
}

const _urls = [
    '/api/foo1',
    '/api/foo2',
    '/api/foo3',
    '/api/foo4',
    '/api/foo5',
    '/api/foo6',
    '/api/foo7',
    '/api/foo8',
    '/api/foo9',
];
multiRequest(_urls, 3)
    .then(res => {
        console.log('????', res);
    })
    .catch(err => {
        console.log(err);
    })
