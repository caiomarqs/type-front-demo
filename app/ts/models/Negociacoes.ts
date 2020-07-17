import { Negociacao } from './Negociacao'

export class Negociacoes{
    private _negociacoes: Array<Negociacao> = [];

    adiocina(negociacao: Negociacao){
        this._negociacoes.push(negociacao)
    }

    get negociacoes(): Negociacao[] {
        return ([] as Negociacao[] ).concat(this._negociacoes)
    }
}