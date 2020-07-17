import NegociacaoController from './controllers/NegociacaoController';

const controller = new NegociacaoController()
$('.form').submit(controller.adiciona.bind(controller))//-> bind especifica o escopo da função
$('#botao-importa').click(controller.importarDados.bind(controller));