import {NegociacaoAPI, Negociacao} from '../models/index'

export class NegociacaoService{

    obterNegociacao(handler: HandlerServiceResponse): Promise<Negociacao[]>{
        return fetch('http://localhost:8080/dados')
                .then(res => handler(res))
                .then(res => res.json())
                .then((dados: NegociacaoAPI[]) => dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante)))
    }
}

//Declarando um interface para o tipode função do handler
export interface HandlerServiceResponse{
    (res: Response): Response 
}