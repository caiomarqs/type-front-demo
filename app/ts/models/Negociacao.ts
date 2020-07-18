import { NegociacaoGeneric } from "./NegociacaoGeneric"

export class Negociacao implements NegociacaoGeneric<Negociacao>{

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {}

    get volume() {
        return this.quantidade * this.valor
    }

    //Implements
    objStrigfy(): void {
        console.log(
            `Data: ${this.data}
             Quantidade: ${this.quantidade}, 
             Valor: ${this.valor}, 
             Volume: ${this.volume}`
        )
    }

    //Implements
    isEquals(negociacao:  Negociacao): boolean{
        return this.data.getDate()     == negociacao.data.getDate()  &&
               this.data.getMonth()    == negociacao.data.getMonth() &&
               this.data.getFullYear() == negociacao.data.getFullYear() 
    }
}