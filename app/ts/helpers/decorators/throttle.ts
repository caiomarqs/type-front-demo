//Decorator de função
export const throttle = (time = 500) => {
    return function (target: any, propKey: string, descriptor: PropertyDescriptor){
        
        const method: Function = descriptor.value         
        let timer: number

        descriptor.value = function(...args: any[]) {
            
            if(event) event.preventDefault()
            
            clearInterval(timer)
            timer = setTimeout(()=> method.apply(this, args), time)
        }
        
        return descriptor;
    }
}
