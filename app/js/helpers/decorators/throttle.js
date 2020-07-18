System.register([], function (exports_1, context_1) {
    "use strict";
    var throttle;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("throttle", throttle = (time = 500) => {
                return function (target, propKey, descriptor) {
                    const method = descriptor.value;
                    let timer;
                    descriptor.value = function (...args) {
                        if (event)
                            event.preventDefault();
                        clearInterval(timer);
                        timer = setTimeout(() => method.apply(this, args), time);
                    };
                    return descriptor;
                };
            });
        }
    };
});
