System.register(["../views/index", "../models/index", "../helpers/decorators/index", "../services/index", "../helpers/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var index_1, index_2, index_3, index_4, index_5, NegociacaoController, DiaSemana;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (index_5_1) {
                index_5 = index_5_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacoesView = new index_1.NegociacoesView('#negociacoesView');
                    this._mensagemView = new index_1.MensagemView('#mensagemView');
                    this._service = new index_4.NegociacaoService();
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona() {
                    const data = new Date(this._inputData.val().replace(/-/g, ","));
                    const quantidade = parseInt(this._inputQuantidade.val());
                    const valor = parseFloat(this._inputValor.val());
                    if (!this._isDiaUtil(data)) {
                        this._mensagemView.update('Só é possivel cadastrar em dias utéis!');
                        return;
                    }
                    const negociacao = new index_2.Negociacao(data, quantidade, valor);
                    this._negociacoes.adiocina(negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update('Negociação adicionada com sucesso!');
                    index_5.printObj(negociacao, this._negociacoes);
                }
                _isDiaUtil(data) {
                    return data.getDay() == DiaSemana.Domingo || data.getDay() == DiaSemana.Sabado ? false : true;
                }
                importarDados() {
                    const isOk = (res) => {
                        if (res.ok) {
                            return res;
                        }
                        else {
                            throw new Error(res.statusText);
                        }
                    };
                    this._service
                        .obterNegociacao(isOk)
                        .then(negociacoes => {
                        const negociacoesImportadas = this._negociacoes.negociacoes;
                        negociacoes.filter(negociacao => !negociacoesImportadas.some(negociacaoImportada => negociacao.isEquals(negociacaoImportada)))
                            .forEach(negociacao => this._negociacoes.adiocina(negociacao));
                        this._negociacoesView.update(this._negociacoes);
                    })
                        .catch(err => console.log(err));
                }
                importarDadosAsync() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const isOk = (res) => {
                            if (res.ok) {
                                return res;
                            }
                            else {
                                throw new Error(res.statusText);
                            }
                        };
                        try {
                            const nogociacoes = yield this._service.obterNegociacao(isOk);
                            const negociacoesImportadas = this._negociacoes.negociacoes;
                            nogociacoes
                                .filter(negociacao => !negociacoesImportadas.some(negociacaoImportada => negociacao.isEquals(negociacaoImportada)))
                                .forEach(negociacao => this._negociacoes.adiocina(negociacao));
                            this._negociacoesView.update(this._negociacoes);
                        }
                        catch (err) {
                            console.log(err);
                            this._mensagemView.update(err);
                        }
                    });
                }
            };
            __decorate([
                index_3.domInject('#data')
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInject('#quantidade')
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.domInject('#valor')
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_3.throttle(1000)
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_3.throttle(1000)
            ], NegociacaoController.prototype, "importarDados", null);
            __decorate([
                index_3.throttle(1000)
            ], NegociacaoController.prototype, "importarDadosAsync", null);
            exports_1("default", NegociacaoController);
            (function (DiaSemana) {
                DiaSemana[DiaSemana["Domingo"] = 0] = "Domingo";
                DiaSemana[DiaSemana["Segunda"] = 1] = "Segunda";
                DiaSemana[DiaSemana["Terca"] = 2] = "Terca";
                DiaSemana[DiaSemana["Quarta"] = 3] = "Quarta";
                DiaSemana[DiaSemana["Quinta"] = 4] = "Quinta";
                DiaSemana[DiaSemana["Sexta"] = 5] = "Sexta";
                DiaSemana[DiaSemana["Sabado"] = 6] = "Sabado";
            })(DiaSemana || (DiaSemana = {}));
        }
    };
});
