System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function printObj(...objs) {
        objs.forEach(obj => obj.objStrigfy());
    }
    exports_1("printObj", printObj);
    return {
        setters: [],
        execute: function () {
        }
    };
});
