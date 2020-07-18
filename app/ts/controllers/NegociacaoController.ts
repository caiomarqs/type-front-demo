import { NegociacoesView, MensagemView } from '../views/index'
import { Negociacoes, Negociacao, NegociacaoAPI, NegocicaoType } from '../models/index'
import { domInject, throttle } from '../helpers/decorators/index'
import { NegociacaoService, HandlerServiceResponse } from '../services/index'
import { printObj } from '../helpers/index'

export default class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery
    @domInject('#quantidade')
    private _inputQuantidade: JQuery
    @domInject('#valor')
    private _inputValor: JQuery

    private _negociacoes = new Negociacoes() //-> Pode ser instanciado no construtor tb
    private _negociacoesView = new NegociacoesView('#negociacoesView')
    private _mensagemView = new MensagemView('#mensagemView')

    private _service = new NegociacaoService()

    constructor() {

        this._negociacoesView.update(this._negociacoes)
    }

    @throttle(1000)
    adiciona() {
        const data = new Date((this._inputData.val() as string).replace(/-/g, ","))
        const quantidade = parseInt(this._inputQuantidade.val() as string)
        const valor = parseFloat(this._inputValor.val() as string)

        if (!this._isDiaUtil(data)) {
            this._mensagemView.update('Só é possivel cadastrar em dias utéis!')
            return
        }

        const negociacao = new Negociacao(data, quantidade, valor)
        this._negociacoes.adiocina(negociacao)
        this._negociacoesView.update(this._negociacoes)
        this._mensagemView.update('Negociação adicionada com sucesso!')

        printObj(negociacao, this._negociacoes)
    }

    private _isDiaUtil(data: Date) {
        return data.getDay() == DiaSemana.Domingo || data.getDay() == DiaSemana.Sabado ? false : true
    }

    @throttle(1000)
    importarDados() {
        const isOk: HandlerServiceResponse = (res: Response) => {
            if (res.ok) {
                return res
            }
            else {
                throw new Error(res.statusText)
            }
        }

        this._service
            .obterNegociacao(isOk)
            .then(negociacoes => {
                const negociacoesImportadas = this._negociacoes.negociacoes //-> This é classe

                negociacoes.filter(negociacao =>
                    !negociacoesImportadas.some(negociacaoImportada =>
                        negociacao.isEquals(negociacaoImportada) //-> Filtro feito em alguma negocição ja importada nas que irão importar
                    )
                )
                    .forEach(negociacao =>
                        this._negociacoes.adiocina(negociacao)
                    )

                this._negociacoesView.update(this._negociacoes)
            })
            .catch(err => console.log(err))
    }

    @throttle(1000)
    async importarDadosAsync() {
        const isOk: HandlerServiceResponse = (res: Response) => {
            if (res.ok) {
                return res
            }
            else {
                throw new Error(res.statusText)
            }
        }

        try {
            const nogociacoes = await this._service.obterNegociacao(isOk)

            const negociacoesImportadas = this._negociacoes.negociacoes //-> This é classe

            nogociacoes
                .filter(negociacao =>
                    !negociacoesImportadas.some(negociacaoImportada =>
                        negociacao.isEquals(negociacaoImportada) //-> Filtro feito em alguma negocição ja importada nas que irão importar
                    )
                )
                .forEach(negociacao =>
                    this._negociacoes.adiocina(negociacao)
                )

            this._negociacoesView.update(this._negociacoes)
        }
        catch (err) {
            console.log(err)
            this._mensagemView.update(err)
        }
    }

}


enum DiaSemana { Domingo, Segunda, Terca, Quarta, Quinta, Sexta, Sabado = 6 }