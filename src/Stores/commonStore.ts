import { action, observable } from "mobx";

export default class commonStore{
    @observable loader : any 
    constructor(){
        this.init()
    }

    @action init(){
        this.loader = false
    }

    setLoaderState(state : any){
        this.loader = state
    }

}