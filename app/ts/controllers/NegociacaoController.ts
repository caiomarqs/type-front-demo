import { NegociacoesView, MensagemView } from '../views/index'
import { Negociacoes, Negociacao, NegociacaoAPI, NegocicaoType } from '../models/index'
import { domInject} from '../helpers/decorators/index'

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

    constructor() {

        this._negociacoesView.update(this._negociacoes)
    }

    adiciona(event: Event) {
        event.preventDefault()

        const data = new Date((this._inputData.val() as string).replace(/-/g, ","))
        const quantidade = parseInt(this._inputQuantidade.val() as string)
        const valor = parseFloat(this._inputValor.val() as string)

        if (!this._isDiaUtil(data)) {
            this._mensagemView.update('Só é possivel cadastrar em dias utéis!');
            return
        }

        const negociacao = new Negociacao(data, quantidade, valor)
        this._negociacoes.adiocina(negociacao)
        this._negociacoesView.update(this._negociacoes)
        this._mensagemView.update('Negociação adicionada com sucesso!');
        
        
    }

    private _isDiaUtil(data: Date) {
        return data.getDay() == DiaSemana.Domingo || data.getDay() == DiaSemana.Sabado ? false : true
    }

    importarDados(){
        function isOk (res: Response) { 
            if(res.ok){
                return res 
            }
            else{
                throw new Error(res.statusText)
            }
        } 
        
        fetch('http://localhost:8080/dados')
            .then(res => isOk(res))
            .then(res => res.json())
            .then((dados: NegociacaoAPI[]) => {
                dados
                    .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
                    .forEach(negociacao => this._negociacoes.adiocina(negociacao))
                this._negociacoesView.update(this._negociacoes)
            })
    
    }

}


enum DiaSemana { Domingo, Segunda, Terca, Quarta, Quinta, Sexta, Sabado = 6 }