/**
 * Created by Ellery1 on 15/7/19.
 * 符合Promise/A标准的Promise实现
 * 不支持progress方法
 * 支持链式调用的then方法,即多个异步过程串行执行
 * 不依赖Deferred来resolve/reject
 *
 * P.S.:出于对大多数人使用习惯的尊重,作者很不情愿地使用了传统的JavaScript模拟类实现
 */
(function (global) {

    function Promise() {

        this.queue = [];
        this.status = "pending";
        this.isPromise = true;
        this.parentPromise = null;
    }

    var fn = Promise.prototype;

    fn._setFinalStatus = function (status) {

        var rootPromise = this;

        while (rootPromise.parentPromise) {

            rootPromise = rootPromise.parentPromise;
        }

        this.status = status;
        rootPromise.status = status;

        return rootPromise;
    };

    fn.then = function (done, fail) {

        switch (this.status) {
            case 'pending':
                this.queue.push({
                    done: done,
                    fail: fail
                });
                break;
            case 'resolved':
                done && done.apply(global);
                break;
            case 'rejected':
                fail && fail.apply(global);
                break;
            default :
                break;
        }

        return this;
    };

    fn.resolve = function () {

        var next,
            nextDone,
            args,
            returned;

        next = this.queue.shift();

        if (next && this.status === 'pending') {

            nextDone = next.done;
            args = Array.prototype.slice.call(arguments).concat(this);
            returned = nextDone.apply(global, args);

            if (returned && returned.isPromise) {

                returned.queue = this.queue;
                returned.parentPromise = this;
            }
            else {

                this.resolve(returned);
            }
        }
        else if (!next) {

            this._setFinalStatus("resolved");
        }
        else if (this.status !== 'pending') {

            console.log('this promise has been resolved/rejected!');
        }
    };

    fn.reject = function () {

        var next, nextFail, args, rootPromise;

        next = this.queue.shift();

        if (next) {

            nextFail = next.fail;

            if (nextFail) {

                args = Array.prototype.slice.call(arguments).concat(this);
                nextFail.apply(global, args);
            }
        }

        this.queue = [];
        rootPromise = this._setFinalStatus("rejected");
        rootPromise && (rootPromise.queue = []);
    };

    global.Promise = Promise;

    global.when = function () {

        var whenPromise = new Promise();

        var taskArr = Array.prototype.slice.call(arguments),
            results = [],
            count = taskArr.length;

        var i, task;

        for (i = 0; i < taskArr.length; i++) {

            task = taskArr[i];

            if (task.isPromise) {

                task.then(function (result) {

                    results.push(result);

                    if (!--count) {

                        whenPromise.resolve(results);
                    }
                }, function (err) {

                    whenPromise.reject(err);
                });
            }
        }

        return whenPromise;
    };
})(window);