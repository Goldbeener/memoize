const STATUS = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
}

class Deferred {
    constructor(callback) {
        // 实例属性
        this.status = STATUS.PENDING;
        this.result = void 0;

        const resolve = value => {

        };

        const reject = value => {

        }

        try {
            callback(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }



}
