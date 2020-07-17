//Decorator para atibutos
export function domInject(selector: string) {
    return function (target: any, key: string) {

        let element: JQuery;

        const getter = function () {
            
            //Test
            // if(!element){
            //     console.log(`buscando o elemento ${selector} para injetar em ${key}`)
            // }

            element = !element ? $(selector) : element
            return element
        }

        Object.defineProperty(target, key, {
            get: getter
        })
    }
}