/**
 * Created by Ellery1 on 15/9/10.
 */
module.exports = function (origHandler, context, gap, endGap) {

    var window = global;
    var lastTriggerTime,
    //这个变量用来保存当前的实参
        args,
    //这个变量用于判断是否是首次触发
    //如果orgHandler尚未被触发过，则直接触发
        hasTriggered = false;

    context = context || window;

    if (gap && gap < 50) {

        window.console && console.warn('safeEvent: 设置的间隔值过小!自动调整为50ms');
        gap = 50;
    }

    if (endGap && endGap < gap) {

        window.console && console.warn('safeEvent: 设置的endGap过小!自动调整为一倍gap');
        endGap = gap;
    }

    //工具函数，在context上触发orgHandler并且重置lastTriggerTime
    var trigger = function (now, trigger) {

        lastTriggerTime = now;
        trigger && origHandler.apply(context, args);
    };

    return function () {

        var now = new Date().valueOf(),
        //用于监控结束时刻的定时器
            endWatcher;

        args = Array.prototype.slice.apply(arguments);

        if (hasTriggered) {

            if (now - lastTriggerTime > gap) {

                trigger(now, gap);
            }
        }
        else {

            hasTriggered = true;
            trigger(now, gap);

            if (endGap) {

                endWatcher = setInterval(function () {

                    var now = new Date().valueOf();

                    if (now - lastTriggerTime >= endGap) {

                        trigger(now, endGap);
                        clearInterval(endWatcher);
                        hasTriggered = false;
                    }
                }, 50);
            }
        }
    };
};