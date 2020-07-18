import { Negociacao } from './Negociacao'
import { NegociacaoGeneric } from './NegociacaoGeneric'

export class Negociacoes implements NegociacaoGeneric<Negociacoes> {
    private _negociacoes: Array<Negociacao> = []

    adiocina(negociacao: Negociacao){
        this._negociacoes.push(negociacao)
    }

    get negociacoes(): Negociacao[] {
        return ([] as Negociacao[] ).concat(this._negociacoes)
    }

    objStrigfy(): void {
        console.log(JSON.stringify(this._negociacoes))
    }

    isEquals(negociacoes: Negociacoes): boolean{
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.negociacoes)
    }
}