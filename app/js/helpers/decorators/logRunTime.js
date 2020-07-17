System.register([], function (exports_1, context_1) {
    "use strict";
    var logRunTime;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("logRunTime", logRunTime = (timeStamp = false) => {
                return function (target, propKey, descriptor) {
                    const timeStampString = timeStamp == false ? 'ms' : 's';
                    const timeDivisor = timeStamp == false ? 1 : 1000;
                    const method = descriptor.value;
                    descriptor.value = function (...args) {
                        const t1 = performance.now();
                        const methodReturn = method.apply(this, args);
                        const t2 = performance.now();
                        const runTimeProps = {
                            methodName: propKey,
                            params: args,
                            methodReturn: methodReturn,
                            runTime: `${((t2 - t1) / timeDivisor)}${timeStampString}`
                        };
                        console.log(runTimeProps);
                        return methodReturn;
                    };
                    return descriptor;
                };
            });
        }
    };
});
