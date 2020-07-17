//Decorator de função
export const logRunTime = (timeStamp: boolean = false) => {
    return function (target: any, propKey: string, descriptor: PropertyDescriptor){

        const timeStampString = timeStamp == false ? 'ms' : 's'
        const timeDivisor = timeStamp == false ? 1 : 1000

        const method: Function = descriptor.value //-> PropertyDescriptor pega as informações da assinatura do metodo

        descriptor.value = function(...args: any[]) {
            const t1 = performance.now() //--> Tempo de excução no momento

            const methodReturn = method.apply(this, args) //apply -> Chama o metodo novamente passando o contexto de execução e os parametros
            const t2 = performance.now()


            const runTimeProps = {
                methodName: propKey,
                params: args,
                methodReturn: methodReturn,
                runTime: `${((t2 - t1) / timeDivisor)}${timeStampString}`
            }

            console.log(runTimeProps)
            return methodReturn
        }

        return descriptor;
    }
}
