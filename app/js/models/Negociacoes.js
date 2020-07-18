System.register([], function (exports_1, context_1) {
    "use strict";
    var Negociacoes;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Negociacoes = class Negociacoes {
                constructor() {
                    this._negociacoes = [];
                }
                adiocina(negociacao) {
                    this._negociacoes.push(negociacao);
                }
                get negociacoes() {
                    return [].concat(this._negociacoes);
                }
                objStrigfy() {
                    console.log(JSON.stringify(this._negociacoes));
                }
                isEquals(negociacoes) {
                    return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.negociacoes);
                }
            };
            exports_1("Negociacoes", Negociacoes);
        }
    };
});
