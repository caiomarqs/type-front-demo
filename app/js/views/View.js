System.register([], function (exports_1, context_1) {
    "use strict";
    var View;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            View = class View {
                constructor(selector, scape) {
                    this._element = $(selector);
                    this._scape = scape;
                }
                update(model) {
                    const upTemplate = this.template(model);
                    if (this._scape)
                        upTemplate.replace(/<script>[\s\S]*?<\/script>/g, '');
                    this._element.html(this.template(model));
                }
            };
            exports_1("default", View);
        }
    };
});
