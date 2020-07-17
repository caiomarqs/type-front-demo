export default abstract class View<T>{
    
    private _element : JQuery
    private _scape: boolean;

    constructor(selector: string, scape: boolean = false){
        this._element = $(selector)
        this._scape = scape
    }

    update(model: T): void{
        const upTemplate = this.template(model)
        if(this._scape) upTemplate.replace(/<script>[\s\S]*?<\/script>/g, '')
        this._element.html(this.template(model))
    }

    abstract template(model: T): string
}
